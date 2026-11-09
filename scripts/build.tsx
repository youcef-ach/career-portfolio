import { copyFile, lstat, mkdir, readFile, readdir, realpath, rm, unlink, writeFile } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { createHash } from 'node:crypto';
import { renderToStaticMarkup } from 'react-dom/server';
import { awards, community, projects } from '../src/data';
import { identity, profiles } from '../src/profiles';
import { Site } from '../src/site';
import type { Page } from '../src/site';

const dist = resolve('dist');
const base = process.env.SITE_BASE ?? '/';
if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(base)) throw new Error('SITE_BASE must start and end with a slash');
const origin = process.env.SITE_ORIGIN?.replace(/\/$/, '');
if (origin && new URL(origin).origin !== origin) throw new Error('SITE_ORIGIN must be an origin without a path');
const privateReview = process.env.SITE_PUBLIC !== 'true';

async function writeOutput(path: string, content: string) {
  const destination = join(dist, path);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, content);
}

async function copyOutput(source: string, path: string) {
  const destination = join(dist, path);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(source, destination);
}

async function copyDemoOutput(path: string) {
  if (!/^demos\/[a-z0-9-]+\/$/.test(path)) throw new Error(`Invalid demo path ${path}`);
  const source = resolve('public', path);
  const manifest = JSON.parse(await readFile(join(source, 'demo-files.json'), 'utf8')) as { files?: unknown } | null;
  const files = manifest?.files;
  const asset = /^(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-][a-zA-Z0-9_.-]*\.(?:css|env|glb|jpe?g|js|json|ktx2|png|svg|wasm|webp|woff2)$/;
  if (!Array.isArray(files) || !files.includes('index.html') ||
      !files.every(file => typeof file === 'string' && (file === 'index.html' || asset.test(file))) ||
      new Set(files.map(file => file.toLowerCase())).size !== files.length || files.includes('demo-files.json')) {
    throw new Error(`Invalid file list in ${path}demo-files.json`);
  }

  await Promise.all(files.map(async file => {
    const location = join(source, file);
    if (!(await lstat(location)).isFile() || await realpath(location) !== location) {
      throw new Error(`Expected a regular demo file at ${path}${file}`);
    }
  }));

  const destination = resolve(dist, path);
  await mkdir(dirname(destination), { recursive: true });
  const destinationParent = await realpath(dirname(destination));
  const existingDestination = await realpath(destination).catch(error => {
    if (error.code !== 'ENOENT') throw error;
    return destination;
  });
  if (destinationParent !== join(dist, 'demos') || existingDestination !== destination) {
    throw new Error(`Refusing to replace a nonlocal demo directory at ${destination}`);
  }
  await rm(destination, { recursive: true, force: true });
  await Promise.all(files.map(file => copyOutput(join(source, file), `${path}${file}`)));
}

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]!));

type Route = { path: string; page: Page; title: string; description: string };

const routes: Route[] = [
  ...profiles.map(profile => ({ path: profile.slug ? `focus/${profile.slug}/` : '', page: { kind: 'home', profile } as const, title: profile.title, description: profile.description })),
  ...projects.map(project => ({ path: `work/${project.slug}/`, page: { kind: 'case', project } as const, title: project.title, description: project.summary })),
  { path: 'resume/', page: { kind: 'resume' }, title: 'Curriculum vitae', description: 'General and role-specific CVs for Achouri Youcef Islem.' },
  { path: '404.html', page: { kind: 'missing' }, title: 'Page not found', description: 'Return to the engineering portfolio.' },
];

async function build() {
  const css = await readFile('src/styles.css', 'utf8');
  const cssName = `assets/site-${createHash('sha256').update(css).digest('hex').slice(0, 10)}.css`;
  await writeOutput(cssName, css);
  const publicAssets = new Set([
    'mark.svg', 'media/virtual-staging/viewer.webp', 'media/evidence/welcome_day_stage.webp',
    'media/azurid-capture-isolation.svg', 'media/azurid-capture-isolation-mobile.svg',
    ...community.map(story => story.image),
    ...awards.map(award => award.image),
    ...projects.flatMap(project => project.evidenceImages?.map(evidence => evidence.path) ?? []),
    ...projects.flatMap(project => project.walkthroughMedia ? [project.walkthroughMedia.path, project.walkthroughMedia.poster] : []),
    ...profiles.map(profile => `resumes/${profile.pdf}`),
  ]);
  await Promise.all([
    copyOutput('node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2', 'fonts/manrope.woff2'),
    copyOutput('node_modules/@fontsource-variable/newsreader/files/newsreader-latin-wght-italic.woff2', 'fonts/newsreader-italic.woff2'),
    copyOutput('node_modules/@fontsource-variable/manrope/LICENSE', 'fonts/LICENSE-Manrope.txt'),
    copyOutput('node_modules/@fontsource-variable/newsreader/LICENSE', 'fonts/LICENSE-Newsreader.txt'),
    ...Array.from(publicAssets, path => copyOutput(`public/${path}`, path)),
  ]);
  for (const project of projects) {
    if (project.demo) await copyDemoOutput(project.demo.path);
  }

  await Promise.all(routes.map(async route => {
    const title = escapeHtml(`${identity.name} · ${route.title}`);
    const description = escapeHtml(route.description);
    const canonical = origin ? `${origin}${base}${route.path}` : '';
    const indexable = !privateReview && route.page.kind !== 'missing';
    const html = renderToStaticMarkup(<Site page={route.page} base={base} />);
    const document = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f6f5ee">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="${indexable ? 'index,follow' : 'noindex,nofollow'}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  ${canonical ? `<link rel="canonical" href="${escapeHtml(canonical)}">\n  <meta property="og:url" content="${escapeHtml(canonical)}">` : ''}
  <link rel="icon" href="${base}mark.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${base}${cssName}">
</head>
<body>${html}</body>
</html>\n`;
    await writeOutput(route.path.endsWith('.html') ? route.path : `${route.path}index.html`, document);
  }));

  await writeOutput('robots.txt', `User-agent: *\n${privateReview ? 'Disallow: /' : 'Allow: /'}\n`);
  await writeOutput('.nojekyll', '');
  for (const asset of await readdir(join(dist, 'assets'), { withFileTypes: true })) {
    if (asset.isFile() && /^site-[0-9a-f]{10}\.css$/.test(asset.name) && `assets/${asset.name}` !== cssName) {
      await unlink(join(dist, 'assets', asset.name));
    }
  }
  console.log(`Built ${routes.length} routes and ${profiles.length} CV downloads.`);
}

build().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

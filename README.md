# Achouri Youcef Islem · Engineering portfolio

Static engineering and research portfolio for Achouri Youcef Islem (ESI-SBA, AI & Data Science), linking public English and French one-page CVs, 15 project case studies, and a complete 26-entry project archive (`2023–2026`).

```sh
npm ci
npm run typecheck
npm run build
npm run preview
```

## Architecture & content

The static generator (`scripts/build.tsx`) uses React server rendering to emit static HTML under `dist/` (`src/data.ts` for case studies and community records, `src/profiles.ts` for focus views and the chronological archive, and `public/resumes/` for English and French PDF CVs).

- `SITE_BASE` defaults to `/` (`SITE_BASE=/cv/` for subpath hosting).
- `SITE_ORIGIN` sets canonical and sitemap URLs (defaults to `https://youcef-achouri.vercel.app`).
- `SITE_PUBLIC` defaults to `true` (`index,follow`, `Allow: /`, and `sitemap.xml`). Set `SITE_PUBLIC=false` for private review builds (`noindex,nofollow`).

## Deployment and evidence boundaries

- Live deployment: [youcef-achouri.vercel.app](https://youcef-achouri.vercel.app/) via `vercel.json` (`.vercel/` and `.env*` remain local and ignored).
- Private organization code (`AzuridTwinUp`, `Majara`, `e-RCP`) and confidential institutional training data (`Qwen 2.5 7B LoRA`) remain excluded; case studies document system scope, synthetic/diagnostic previews, and limitations.
- Matterport sample imagery (`public/media/virtual-staging/real-view.webp` and `real-model-evidence/`) stays excluded from version control via `.gitignore`.
- Before publishing a release, verify `npm run typecheck && npm run build`, inspect mobile/desktop viewports, and confirm live `/resumes/*.pdf` hashes match `outputs/cv/`.

import type { ReactNode } from 'react';
import { awards, community, projects } from './data';
import type { Project } from './data';
import { Figure } from './figures';
import { additionalWork, appliedAiWork, archiveGroups, identity, profiles, spatialWork } from './profiles';
import type { Profile } from './profiles';
import { RealModelEvidence } from './real-model-evidence';

const general = profiles[0];
const profilePath = (profile: Profile) => profile.slug ? `focus/${profile.slug}/` : '';

function Arrow({ direction = 'right' }: { direction?: 'right' | 'up' | 'down' | 'left' }) {
  const paths = {
    right: 'M3 8h10m-4-4 4 4-4 4', up: 'M4 12 12 4M5 4h7v7',
    down: 'M8 3v10m-4-4 4 4 4-4', left: 'M13 8H3m4 4L3 8l4-4',
  };
  return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={paths[direction]} /></svg>;
}

function Download({ href, children }: { href: string; children: ReactNode }) {
  return <a className="button button-solid" href={href} download>{children}<Arrow direction="down" /></a>;
}

function Header({ base, profile }: { base: string; profile: Profile }) {
  const home = `${base}${profilePath(profile)}`;
  return <header className="site-header">
    <div className="container topbar">
      <a className="brand" href={base} aria-label="Youcef Achouri, home"><img className="monogram" src={`${base}mark.svg`} alt="" width="38" height="38" /><span className="brand-name">Youcef Achouri</span></a>
      <nav aria-label="Main navigation" className="nav"><a href={`${home}#work`}>Work</a><a href={`${base}archive/`}>Archive</a><a href={`${home}#community`}>Community</a><a href={`${home}#about`}>About</a><a className="nav-cv" href={`${base}resume/`}>CV <Arrow direction="up" /></a></nav>
    </div>
  </header>;
}

function Footer({ base }: { base: string }) {
  return <footer className="footer" id="contact">
    <div className="container">
      <div className="footer-content">
        <div><p className="eyebrow">Get in touch</p><h2>Let’s talk.</h2><p>Available from January 2027 for a final-year internship with flexible duration. I’m open to opportunities worldwide, including Europe, the Americas, China and Japan. I prefer working on site. For France, I’m available remotely.</p></div>
        <div className="footer-links"><a className="email-link" href={`mailto:${identity.email}`}>{identity.email} <Arrow direction="up" /></a><div className="social-links"><a href={identity.github}>GitHub <Arrow direction="up" /></a><a href={identity.linkedin}>LinkedIn <Arrow direction="up" /></a><a href={`${base}resume/`}>CV (EN / FR) <Arrow direction="right" /></a></div></div>
      </div>
      <div className="footer-end"><span>{identity.name} · Algeria</span><a href="#top">Back to top ↑</a></div>
    </div>
  </footer>;
}

function ProfileNav({ base, active }: { base: string; active: Profile }) {
  return <nav className="profile-nav" aria-label="Portfolio versions">
    <span className="profile-label">Browse by focus</span>
    <ul>{profiles.map(profile => <li key={profile.label}><a href={`${base}${profilePath(profile)}`} aria-current={profile === active ? 'page' : undefined}>{profile.label}</a></li>)}</ul>
  </nav>;
}

function Hero({ base, profile }: { base: string; profile: Profile }) {
  return <section className="hero container" aria-labelledby="intro-title">
    <div className="hero-content">
      <p className="eyebrow hero-eyebrow"><span></span> {profile.slug ? profile.title : 'State Engineer & Master\'s Candidate · AI & Data Science · ESI-SBA'}</p>
      <h1 id="intro-title">Achouri<br /><em>Youcef Islem.</em></h1>
      <p className="hero-intro">{profile.statement}</p>
      <div className="actions"><Download href={`${base}resumes/Youcef_Achouri_CV_English.pdf`}>Download CV</Download><a className="button button-outline" href="#work">View work <Arrow /></a></div>
      <p className="availability"><span aria-hidden="true" /> Seeking a final-year research or R&D internship (PFE) · January 2027</p>
    </div>
    <figure className="hero-portrait">
      <div className="portrait-image"><img src={`${base}media/evidence/welcome_day_stage.webp`} alt="Achouri Youcef Islem" width="790" height="875" fetchPriority="high" decoding="async" /></div>
    </figure>
  </section>;
}

function SectionHeading({ label, title, children, id }: { label: string; title: string; children?: ReactNode; id: string }) {
  return <div className="section-head"><div><p className="eyebrow">{label}</p><h2 id={id}>{title}</h2></div>{children && <p className="section-note">{children}</p>}</div>;
}

function ProjectRow({ project, base }: { project: Project; base: string }) {
  const url = `${base}work/${project.slug}/`;
  return <article className="project-row">
    <div className="project-copy">
      <p className="eyebrow project-kicker">{project.category}</p>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <p className="project-stack">{project.stack.join(' · ')}</p>
      <a href={url} className="text-link" aria-label={`Read case study: ${project.title}`}>Read case study <Arrow /></a>
    </div>
    <Figure project={project} base={base} />
  </article>;
}

function Work({ base, profile }: { base: string; profile: Profile }) {
  const selected = profile.projects.map(slug => projects.find(project => project.slug === slug)!);
  const supporting = (profile === general ? additionalWork : profile.slug === 'software-spatial' ? spatialWork : profile.slug === 'applied-ai' ? appliedAiWork : []).filter(item => !profile.projects.some(slug => slug === item.projectSlug));
  return <section id="work" className="container section work" aria-labelledby="work-title">
    <SectionHeading id="work-title" label="01 / Projects" title="Selected work">{profile.slug ? profile.description : 'Industrial digital twins, spatial AI, multi-agent systems, and deep learning research.'}</SectionHeading>
    {selected.map(project => <ProjectRow project={project} base={base} key={project.slug} />)}
    {supporting.length > 0 && <div className="additional-work"><h3>More work</h3><ul>{supporting.map(project => {
      const href = project.projectSlug ? `${base}work/${project.projectSlug}/` : project.href;
      return <li key={project.title}><span className="eyebrow">{project.category}</span><h4>{href ? <a href={href}>{project.title} <Arrow direction={project.href ? 'up' : 'right'} /></a> : project.title}</h4><p>{project.description}</p></li>;
    })}</ul></div>}
    <div className="archive-band" id="archive">
      <div className="archive-band-head">
        <div>
          <p className="eyebrow">Complete Progression · 2023 – 2026</p>
          <h3>Every project, from hand-coded UIs to 3D AI</h3>
        </div>
        <a className="button button-outline" href={`${base}archive/`}>Browse full archive (26 projects) <Arrow /></a>
      </div>
      <div className="archive-pillars">{archiveGroups.map(group => <article key={group.id} className="archive-pillar">
        <p className="eyebrow">{group.eyebrow}</p>
        <h4>{group.title}</h4>
        <p>{group.summary}</p>
        <a className="text-link" href={`${base}archive/#${group.id}`}>View {group.items.length} projects <Arrow /></a>
      </article>)}</div>
    </div>
  </section>;
}

function Community({ base }: { base: string }) {
  return <section id="community" className="section community" aria-labelledby="community-title">
    <div className="container">
      <SectionHeading id="community-title" label="02 / Community" title="Beyond the lab">Executive club leadership, developer workshops, civic tech in Algiers, and national hackathons.</SectionHeading>
      <div className="community-grid">{community.map((story, i) => <article key={story.title} className={`community-story community-story-${i + 1}`}>
        <figure><img src={`${base}${story.image}`} width={story.width} height={story.height} loading="lazy" decoding="async" alt={story.alt} /></figure>
        <div><p className="eyebrow">{story.eyebrow}</p><h3>{story.title}</h3><p>{story.body}</p></div>
      </article>)}</div>
      <div className="awards"><h3>Competitions</h3><div className="award-grid">{awards.map(award => <article key={award.title} className="award">
        <div className="award-meta"><span>{award.result}</span><time>{award.year}</time></div><h4>{award.projectSlug ? <a href={`${base}work/${award.projectSlug}/`}>{award.title}</a> : award.title}</h4><p>{award.detail}</p>
        <details className="photo-disclosure"><summary>Event photo <Arrow direction="down" /></summary><img src={`${base}${award.image}`} alt={`Photograph from ${award.title}`} width={award.width} height={award.height} loading="lazy" decoding="async" /></details>
      </article>)}</div></div>
    </div>
  </section>;
}

function About({ base }: { base: string }) {
  return <section id="about" className="container section about" aria-labelledby="about-title">
    <SectionHeading id="about-title" label="03 / Background" title="About me" />
    <div className="about-grid"><div className="about-copy"><h3>Engineering, from the model to the interface.</h3><p>I’m a final-year State Engineer and Master’s student at ESI-SBA, specializing in {identity.specialty}. My work connects professional field capture (terrestrial LiDAR, drone photogrammetry) with spatial software and 3D computer vision. Alongside building industrial digital twins at Azurid, I study and test neural scene representations (3D Gaussian Splatting, 2DGS, SuGaR) and feed-forward 3D foundation models (COLMAP, DUSt3R, MASt3R, VGGSfM, VGGT, MapAnything).</p><p>From February to May 2026, I led an institutional AI/GIS project team and implemented its Arabic extraction module. Earlier, during a placement at Algérie Télécom in Batna from 1 to 30 September 2025, I studied fibre-optic and 5G network principles and explored potential AI applications for telecommunications development.</p><p>My engineering background spans early hand-coded React/Tailwind interfaces, React Three Fiber 3D showcases, and full-stack Django/NestJS platforms up to Deep Learning and spatial AI. Serving as Vice President of INGENIUMS also taught me to communicate technical systems clearly and lead student engineering events.</p><div className="about-links"><a className="text-link" href={`${base}resume/`}>View CVs (English &amp; Français) <Arrow /></a><a className="text-link" href={`${base}archive/`}>Complete archive (2023–2026) <Arrow /></a></div></div>
      <dl className="about-facts"><div><dt>Education</dt><dd>{identity.school}</dd><dd>State Engineer & Master’s degree in progress</dd><dd>Expected graduation · 2027</dd></div><div><dt>Based in</dt><dd>Algeria</dd></div><div><dt>Languages</dt><dd>Arabic · Native</dd><dd>English and French · Fluent</dd></div><div><dt>Tools I use</dt><dd>Python, PyTorch, NumPy, COLMAP, 3DGS, 2DGS, SuGaR, DUSt3R, MASt3R, VGGSfM, VGGT, MapAnything, Agisoft Metashape, RealityScan, CloudCompare, MeshLab, QGIS, TypeScript, React, React Three Fiber, Three.js, Babylon.js, NestJS, FastAPI, Django, Docker and Git</dd></div></dl>
    </div>
  </section>;
}

function Home({ base, profile }: { base: string; profile: Profile }) {
  return <><Hero base={base} profile={profile} /><div className="container"><ProfileNav base={base} active={profile} /></div><Work base={base} profile={profile} /><Community base={base} /><About base={base} /></>;
}

function EvidenceLinks({ project }: { project: Project }) {
  return <nav className="case-evidence-links actions" aria-label="Project evidence">
    {project.repo && <a className="button button-solid" href={project.repo}>View source on GitHub <Arrow direction="up" /></a>}
    {project.liveUrl && <a className="button button-outline" href={project.liveUrl.url} target="_blank" rel="noreferrer">{project.liveUrl.label} <Arrow direction="up" /></a>}
    {project.walkthroughMedia && <a className="button button-solid" href="#walkthrough">Watch the walkthrough <Arrow direction="down" /></a>}
    <a className="button button-outline" href="#outcome">Results and evidence <Arrow direction="down" /></a>
    <a className="text-link" href="#limits">Scope and limitations <Arrow direction="down" /></a>
  </nav>;
}

function CaseStudy({ project, base }: { project: Project; base: string }) {
  const sharedFocus = profiles.filter(profile => (profile.projects as readonly string[]).includes(project.slug));
  const others = projects.filter(candidate => candidate !== project)
    .map(candidate => ({ project: candidate, relevance: sharedFocus.filter(profile => (profile.projects as readonly string[]).includes(candidate.slug)).length }))
    .sort((a, b) => b.relevance - a.relevance).slice(0, 3).map(candidate => candidate.project);
  return <article className="container case-page">
    <a className="text-link back-link" href={`${base}#work`}><Arrow direction="left" /> Selected work</a>
    <div className={`case-head${project.title.length > 32 ? ' case-head-long' : ''}`}><div><p className="eyebrow project-kicker">{project.category}</p><h1>{project.title}</h1><p className="case-lead">{project.lead}</p><EvidenceLinks project={project} />{project.demo && <div className="case-demo"><a className="button button-solid" href={`${base}${project.demo.path}`}>Open the interactive demo <Arrow /></a><p>{project.demo.note}</p></div>}</div><dl className="case-facts"><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Project type</dt><dd>{project.status}</dd></div><div><dt>Tools</dt><dd>{project.stack.join(' · ')}</dd></div></dl></div>
    <Figure project={project} base={base} detail />
    <div className="case-body"><aside className="case-index"><p className="eyebrow">In this case study</p><nav aria-label="Case study sections">{project.context && <a href="#context">Context</a>}<a href="#problem">Problem</a><a href="#decisions">Engineering choices</a><a href="#outcome">Result</a><a href="#limits">Limits</a></nav>{project.repo && <a className="text-link" href={project.repo}>Source on GitHub <Arrow direction="up" /></a>}{project.walkthrough && <a className="text-link" href="#walkthrough">{project.walkthroughMedia ? 'Watch the walkthrough' : 'Request a walkthrough'} <Arrow direction="down" /></a>}</aside>
      <div className="case-prose">{project.context && <section id="context"><p className="eyebrow">00</p><h2>Technical context</h2><p>{project.context}</p></section>}<section id="problem"><p className="eyebrow">01</p><h2>The problem</h2><p>{project.problem}</p></section><section id="decisions"><p className="eyebrow">02</p><h2>Engineering choices</h2>{project.decisions.map(decision => <div key={decision.title} className="decision"><h3>{decision.title}</h3><p>{decision.body}</p></div>)}</section>
      <section id="outcome">
        <p className="eyebrow">03</p>
        <h2>Result</h2>
        <p>{project.outcome}</p>
        {project.facts.length > 0 && <dl className="outcome-facts">{project.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>}
        {project.slug === 'webgpu-spatial-engine' && <>
          <RealModelEvidence base={base} />
          <figure className="case-evidence synthetic-stage-preview">
            <img src={`${base}media/virtual-staging/synthetic-viewer.webp`} alt="The interactive Babylon.js demo with a staged chair in the explicitly synthetic room." width="1440" height="900" loading="lazy" decoding="async" />
            <figcaption>Interactive furniture placement · synthetic room</figcaption>
          </figure>
        </>}
        {project.evidenceImages?.map(evidence => <figure key={evidence.path} className={`case-evidence${evidence.width < evidence.height ? ' case-evidence-portrait' : ''}`}><img src={`${base}${evidence.path}`} alt={evidence.alt} width={evidence.width} height={evidence.height} loading="lazy" decoding="async" /><figcaption>{evidence.caption}</figcaption></figure>)}
      </section>
      <section id="limits"><p className="eyebrow">04</p><h2>Limits</h2><p>{project.limits}</p></section>
      {project.walkthrough && <section id="walkthrough"><h2>AzuridTwinUp walkthrough</h2><p>Watch the earlier viewer demonstration or email me to discuss the architecture and acquisition workflow.</p><div className="actions"><a className="button button-solid" href={`mailto:${identity.email}?subject=AzuridTwinUp%20project%20discussion`}>Discuss the project <Arrow direction="up" /></a></div><p>The demonstration covers viewer behaviour. A technical discussion can also cover LiDAR and image acquisition, panorama and mesh alignment, coordinate qualification and processing choices.</p>{project.walkthroughMedia ? <>
        <h3>Recorded viewer behaviour</h3><p>This 73-second technical recording uses two synthetic inspection bays to demonstrate station navigation and recovery from an interrupted load. The recording predates the current local authentication and preparation work.</p>
        <video className="case-walkthrough" controls playsInline preload="none" poster={`${base}${project.walkthroughMedia.poster}`} aria-label="AzuridTwinUp Viewer B walkthrough with on-screen captions">
          <source src={`${base}${project.walkthroughMedia.path}`} type="video/mp4" />
        </video>
        <details className="walkthrough-transcript"><summary>Read the walkthrough transcript</summary><ol>{project.walkthroughMedia.transcript.map(line => <li key={line}>{line}</li>)}</ol></details>
      </> : <p>Get in touch to discuss the viewer and the engineering behind it.</p>}</section>}</div>
    </div>
    <div className="related"><h2>More case studies</h2><ul>{others.map(other => <li key={other.slug}><a href={`${base}work/${other.slug}/`}>{other.title}<Arrow /></a></li>)}</ul></div>
  </article>;
}

function Resume({ base }: { base: string }) {
  return <section className="container resume-page">
    <a className="text-link back-link" href={base}><Arrow direction="left" /> Portfolio</a>
    <div className="page-intro">
      <p className="eyebrow">Curriculum vitae</p>
      <h1>Curriculum vitae.</h1>
      <p>Final-year State Engineer &amp; Master’s candidate in AI &amp; Data Science at ESI-SBA. Available January 2027 for a final-year internship (PFE) in 3D Computer Vision, Spatial AI, and R&amp;D engineering.</p>
    </div>
    <div className="resume-list">
      <article>
        <div>
          <p className="eyebrow">English version · Worldwide</p>
          <h2>Engineering &amp; Research Internship CV</h2>
          <p>Complete 1-page CV covering spatial AI pipelines, neural scene representations (3DGS), multi-agent systems, deep learning research, and executive club leadership.</p>
        </div>
        <div className="actions">
          <Download href={`${base}resumes/Youcef_Achouri_CV_English.pdf`}>Download PDF (English)</Download>
        </div>
      </article>
      <article>
        <div>
          <p className="eyebrow">Version française · PFE 2027</p>
          <h2>CV Ingénierie &amp; Recherche (PFE)</h2>
          <p>CV complet en 1 page détaillant l'ingénierie des jumeaux numériques, la vision par ordinateur 3D, le deep learning, les architectures logicielles et le leadership.</p>
        </div>
        <div className="actions">
          <Download href={`${base}resumes/Youcef_Achouri_CV_Francais.pdf`}>Télécharger PDF (Français)</Download>
        </div>
      </article>
    </div>
  </section>;
}

function Archive({ base }: { base: string }) {
  return <section className="container archive-page">
    <a className="text-link back-link" href={base}><Arrow direction="left" /> Portfolio</a>
    <div className="page-intro">
      <p className="eyebrow">Complete Progression · 2023 – 2026</p>
      <h1>Engineering archive.</h1>
      <p>Every major step across my background—from early hand-coded responsive CSS/React websites and React Three Fiber 3D exercises to full-stack Django/NestJS applications, Deep Learning from scratch, and spatial AI systems.</p>
    </div>
    <nav className="profile-nav archive-nav" aria-label="Archive tracks">
      <span className="profile-label">Jump to track</span>
      <ul>{archiveGroups.map(group => <li key={group.id}><a href={`#${group.id}`}>{group.id === 'spatial-3d' ? 'Spatial & 3D Vision' : group.id === 'ai-ml-data' ? 'AI & ML Research' : 'Full-Stack & Frontend'}</a></li>)}</ul>
    </nav>
    {archiveGroups.map(group => <section key={group.id} id={group.id} className="archive-group" aria-labelledby={`title-${group.id}`}>
      <div className="section-head">
        <div><p className="eyebrow">{group.eyebrow}</p><h2 id={`title-${group.id}`}>{group.title}</h2></div>
        <p className="section-note">{group.summary}</p>
      </div>
      <div className="archive-grid">{group.items.map(item => <article key={item.title} className="archive-card">
        <div className="archive-card-meta"><span className="eyebrow">{item.scope}</span><time>{item.year}</time></div>
        <h3>{item.projectSlug ? <a href={`${base}work/${item.projectSlug}/`}>{item.title}</a> : item.title}</h3>
        <p>{item.description}</p>
        <p className="project-stack">{item.stack}</p>
        <div className="archive-card-links">
          {item.projectSlug && <a className="text-link" href={`${base}work/${item.projectSlug}/`}>Case study <Arrow /></a>}
          {item.repo && <a className="text-link" href={item.repo}>GitHub <Arrow direction="up" /></a>}
          {item.liveHref && <a className="text-link" href={item.liveHref.startsWith('http') ? item.liveHref : `${base}${item.liveHref}`}>Live preview <Arrow direction="up" /></a>}
        </div>
      </article>)}</div>
    </section>)}
  </section>;
}

export type Page = { kind: 'home'; profile: Profile } | { kind: 'case'; project: Project } | { kind: 'archive' } | { kind: 'resume' } | { kind: 'missing' };

export function Site({ page, base }: { page: Page; base: string }) {
  return <div id="top"><a className="skip-link" href="#main">Skip to content</a><Header base={base} profile={page.kind === 'home' ? page.profile : general} /><main id="main" tabIndex={-1}>
    {page.kind === 'home' && <Home base={base} profile={page.profile} />}
    {page.kind === 'case' && <CaseStudy base={base} project={page.project} />}
    {page.kind === 'archive' && <Archive base={base} />}
    {page.kind === 'resume' && <Resume base={base} />}
    {page.kind === 'missing' && <section className="container page-intro missing"><p className="eyebrow">404</p><h1>Page not found.</h1><a className="button button-solid" href={base}>Back to portfolio <Arrow /></a></section>}
  </main><Footer base={base} /></div>;
}

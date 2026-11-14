import type { ReactNode } from 'react';
import { awards, community, projects } from './data';
import type { Project } from './data';
import { Figure } from './figures';
import { additionalWork, appliedAiWork, identity, profiles, spatialWork } from './profiles';
import type { Profile } from './profiles';

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
      <nav aria-label="Main navigation" className="nav"><a href={`${home}#work`}>Work</a><a href={`${home}#community`}>Community</a><a href={`${home}#about`}>About</a><a className="nav-cv" href={`${base}resume/`}>CV <Arrow direction="up" /></a></nav>
    </div>
  </header>;
}

function Footer({ base }: { base: string }) {
  return <footer className="footer" id="contact">
    <div className="container">
      <div className="footer-content">
        <div><p className="eyebrow">Get in touch</p><h2>Let’s talk.</h2><p>Available from January 2027 for a final-year internship with flexible duration. I’m open to opportunities worldwide, including Europe, the Americas, China and Japan. I prefer working on site. For France, I’m available remotely.</p></div>
        <div className="footer-links"><a className="email-link" href={`mailto:${identity.email}`}>{identity.email} <Arrow direction="up" /></a><div className="social-links"><a href={identity.github}>GitHub <Arrow direction="up" /></a><a href={identity.linkedin}>LinkedIn <Arrow direction="up" /></a><a href={`${base}resume/`}>CVs <Arrow direction="right" /></a></div></div>
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
      <p className="eyebrow hero-eyebrow"><span></span> {profile.slug ? profile.title : 'Final-year engineering student · ESI-SBA'}</p>
      <h1 id="intro-title">Achouri<br /><em>Youcef Islem.</em></h1>
      <p className="hero-intro">{profile.statement}</p>
      <div className="actions"><Download href={`${base}resumes/${profile.pdf}`}>Download {profile.slug ? `${profile.label} CV` : 'CV'}</Download><a className="button button-outline" href="#work">View work <Arrow /></a></div>
      <p className="availability"><span aria-hidden="true" /> Seeking a final-year internship · January 2027</p>
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
  const supporting = profile === general ? additionalWork : profile.slug === 'software-spatial' ? spatialWork : profile.slug === 'applied-ai' ? appliedAiWork : [];
  return <section id="work" className="container section work" aria-labelledby="work-title">
    <SectionHeading id="work-title" label="01 / Projects" title="Selected work">{profile.slug ? profile.description : 'Agent workflows, industrial 3D software, Arabic NLP and numerical machine learning.'}</SectionHeading>
    {selected.map(project => <ProjectRow project={project} base={base} key={project.slug} />)}
    {supporting.length > 0 && <div className="additional-work"><h3>More work</h3><ul>{supporting.map(project => {
      const href = project.projectSlug ? `${base}work/${project.projectSlug}/` : project.href;
      return <li key={project.title}><span className="eyebrow">{project.category}</span><h4>{href ? <a href={href}>{project.title} <Arrow direction={project.href ? 'up' : 'right'} /></a> : project.title}</h4><p>{project.description}</p></li>;
    })}</ul></div>}
  </section>;
}

function Community({ base }: { base: string }) {
  return <section id="community" className="section community" aria-labelledby="community-title">
    <div className="container">
      <SectionHeading id="community-title" label="02 / Community" title="Beyond the lab">I’ve led a student club, organized events, and built community connections beyond the engineering curriculum.</SectionHeading>
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
    <div className="about-grid"><div className="about-copy"><h3>Engineering, from the model to the interface.</h3><p>I’m in my fifth year at ESI-SBA, specializing in {identity.specialty}. I enjoy problems that cross layers of a system, such as getting a segmentation mask to line up with a scan or turning an Arabic instruction into data a program can validate.</p><p>From February to May 2026, I led an institutional AI/GIS project team and implemented its Arabic extraction module. Earlier, during a placement at Algérie Télécom in Batna from 1 to 30 September 2025, I studied fibre-optic and 5G network principles and explored potential AI applications for telecommunications development.</p><p>My time with INGENIUMS gave me a second way to practice engineering. Presenting demos and coordinating events taught me to explain a technical idea clearly and make it easier for other people to contribute.</p><a className="text-link" href={`${base}resume/`}>View CVs <Arrow /></a></div>
      <dl className="about-facts"><div><dt>Education</dt><dd>{identity.school}</dd><dd>Computer science engineering degree in progress</dd></div><div><dt>Based in</dt><dd>Algeria</dd></div><div><dt>Languages</dt><dd>Arabic · Native</dd><dd>English and French · Fluent</dd></div><div><dt>Tools I use</dt><dd>Python, PyTorch, NumPy, TypeScript, React, React Router, Three.js, Babylon.js, NestJS, FastAPI, Django, Prisma, PostgreSQL, Docker, Agisoft Metashape and Git</dd></div></dl>
    </div>
  </section>;
}

function Home({ base, profile }: { base: string; profile: Profile }) {
  return <><Hero base={base} profile={profile} /><div className="container"><ProfileNav base={base} active={profile} /></div><Work base={base} profile={profile} /><Community base={base} /><About base={base} /></>;
}

function CaseStudy({ project, base }: { project: Project; base: string }) {
  const others = projects.filter(candidate => candidate !== project);
  return <article className="container case-page">
    <a className="text-link back-link" href={`${base}#work`}><Arrow direction="left" /> Selected work</a>
    <div className={`case-head${project.title.length > 32 ? ' case-head-long' : ''}`}><div><p className="eyebrow project-kicker">{project.category}</p><h1>{project.title}</h1><p className="case-lead">{project.lead}</p>{project.demo && <div className="case-demo"><a className="button button-solid" href={`${base}${project.demo.path}`}>Open the interactive demo <Arrow /></a><p>{project.demo.note}</p></div>}</div><dl className="case-facts"><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Project type</dt><dd>{project.status}</dd></div><div><dt>Tools</dt><dd>{project.stack.join(' · ')}</dd></div></dl></div>
    <Figure project={project} base={base} detail />
    <div className="case-body"><aside className="case-index"><p className="eyebrow">In this case study</p><nav aria-label="Case study sections">{project.context && <a href="#context">Context</a>}<a href="#problem">Problem</a><a href="#decisions">Engineering choices</a><a href="#outcome">Result</a><a href="#limits">Limits</a></nav>{project.repo && <a className="text-link" href={project.repo}>Source on GitHub <Arrow direction="up" /></a>}{project.walkthrough && <a className="text-link" href="#walkthrough">{project.walkthroughMedia ? 'Watch the walkthrough' : 'Request a walkthrough'} <Arrow direction="down" /></a>}</aside>
      <div className="case-prose">{project.context && <section id="context"><p className="eyebrow">00</p><h2>Technical context</h2><p>{project.context}</p></section>}<section id="problem"><p className="eyebrow">01</p><h2>The problem</h2><p>{project.problem}</p></section><section id="decisions"><p className="eyebrow">02</p><h2>Engineering choices</h2>{project.decisions.map(decision => <div key={decision.title} className="decision"><h3>{decision.title}</h3><p>{decision.body}</p></div>)}</section>
      <section id="outcome">
        <p className="eyebrow">03</p>
        <h2>Result</h2>
        <p>{project.outcome}</p>
        {project.facts.length > 0 && <dl className="outcome-facts">{project.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>}
        {project.slug === 'webgpu-spatial-engine' && <figure className="case-evidence synthetic-stage-preview">
          <img src={`${base}media/virtual-staging/synthetic-viewer.webp`} alt="The interactive Babylon.js demo with a staged chair in the explicitly synthetic room." width="1440" height="900" loading="lazy" decoding="async" />
          <figcaption>Interactive furniture placement · synthetic room</figcaption>
        </figure>}
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
    <div className="page-intro"><p className="eyebrow">Curriculum vitae</p><h1>CVs for each focus.</h1><p>The general CV covers my engineering work, education and leadership. The other versions highlight projects relevant to specific internship roles.</p></div>
    <div className="resume-list">{profiles.map(profile => <article key={profile.label}><div><p className="eyebrow">{profile.label}</p><h2>{profile.slug ? profile.title : 'General engineering CV'}</h2><p>{profile.description}</p></div><div className="actions"><Download href={`${base}resumes/${profile.pdf}`}>Download PDF</Download><a className="text-link" href={`${base}${profilePath(profile)}`}>View portfolio <Arrow /></a></div></article>)}</div>
  </section>;
}

export type Page = { kind: 'home'; profile: Profile } | { kind: 'case'; project: Project } | { kind: 'resume' } | { kind: 'missing' };

export function Site({ page, base }: { page: Page; base: string }) {
  return <div id="top"><a className="skip-link" href="#main">Skip to content</a><Header base={base} profile={page.kind === 'home' ? page.profile : general} /><main id="main" tabIndex={-1}>
    {page.kind === 'home' && <Home base={base} profile={page.profile} />}
    {page.kind === 'case' && <CaseStudy base={base} project={page.project} />}
    {page.kind === 'resume' && <Resume base={base} />}
    {page.kind === 'missing' && <section className="container page-intro missing"><p className="eyebrow">404</p><h1>Page not found.</h1><a className="button button-solid" href={base}>Back to portfolio <Arrow /></a></section>}
  </main><Footer base={base} /></div>;
}

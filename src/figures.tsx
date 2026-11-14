import type { Project } from './data';

function Network() {
  const layers = [[55, [48, 82, 116, 150, 184]], [160, [32, 66, 100, 134, 168, 202]], [265, [64, 116, 168]] ] as const;
  return <svg viewBox="0 0 320 232" aria-hidden="true" className="network">
    {layers.slice(0, -1).flatMap(([x, ys], i) => ys.flatMap(y => layers[i + 1][1].map(end =>
      <line key={`${x}-${y}-${end}`} x1={x} y1={y} x2={layers[i + 1][0]} y2={end} />)))}
    {layers.flatMap(([x, ys], i) => ys.map(y => <circle key={`${x}-${y}`} cx={x} cy={y} r={i === 2 ? 7 : 5} className={i === 2 ? 'node-output' : ''} />))}
  </svg>;
}

function Signal() {
  const points = Array.from({ length: 131 }, (_, i) => {
    const amplitude = Math.sin(i / 13) ** 2 * 40 + 4;
    return `${i * 3},${62 + Math.sin(i * 1.81) * Math.cos(i * .37) * amplitude}`;
  }).join(' ');
  return <svg viewBox="0 0 390 124" aria-hidden="true" className="signal">
    {[23, 42, 62, 82, 101].map(y => <line key={y} x1="0" x2="390" y1={y} y2={y} />)}
    <polyline points={points} fill="none" />
  </svg>;
}

export function Figure({ project, base, detail = false }: { project: Project; base: string; detail?: boolean }) {
  if (project.slug === 'azuridtwinup') {
    return <figure className={`project-figure visual-azurid${detail ? ' figure-detail' : ''}`}>
      <div className="operations-diagram">
        <div><small>01 / Acquire</small><strong>Site capture</strong><span>Pro3 LiDAR · drone imagery</span></div>
        <div><small>02 / Process</small><strong>Spatial pipeline</strong><span>Alignment · E57 · GLB / KTX2</span></div>
        <div><small>03 / Inspect</small><strong>Web platform</strong><span>Panoramas · geometry · station navigation</span></div>
      </div>
      <figcaption><span>From site acquisition to browser inspection</span><span>Pipeline schematic</span></figcaption>
    </figure>;
  }

  if (project.slug === 'operations-intelligence-hub') {
    return <figure className={`project-figure visual-operations${detail ? ' figure-detail' : ''}`}>
      <div className="operations-diagram">
        <div><small>01 / Intake</small><strong>Incident</strong><span>Route by department</span></div>
        <div><small>02 / Review</small><strong>Specialist agents</strong><span>Run modules and collect proposals</span></div>
        <div><small>03 / Decide</small><strong>Executive brief</strong><span>Reconcile conflicting actions</span></div>
      </div>
      <figcaption><span>Incident response workflow</span><span>Architecture diagram</span></figcaption>
    </figure>;
  }

  if (project.slug === 'webgpu-spatial-engine') {
    return <figure className={`project-figure visual-spatial${detail ? ' figure-detail' : ''}`}>
      <img src={`${base}media/virtual-staging/synthetic-viewer.webp`} width="1920" height="1021" loading={detail ? 'eager' : 'lazy'} decoding="async" alt="Interactive furniture placement in a synthetic room" />
      <figcaption><span>Furniture placement</span><span>Synthetic room</span></figcaption>
    </figure>;
  }

  if (project.slug === 'arabic-structured-ie') {
    return <figure className={`project-figure visual-arabic${detail ? ' figure-detail' : ''}`}>
      <div className="extract-visual">
        <div className="extract-input"><small>01 · Arabic input</small><p lang="ar" dir="rtl">حدّد منطقة العمليات</p></div>
        <span className="extract-arrow" aria-hidden="true">↓</span>
        <div className="extract-output"><small>02 · Schema validation</small><code><span>{'{'}</span><br />{'  '}"areas_of_operation": […],<br />{'  '}"tactical_lines": […],<br />{'  '}"forces": […]<br /><span>{'}'}</span></code></div>
      </div>
      <figcaption><span>Input → structured data</span><span>Illustration</span></figcaption>
    </figure>;
  }

  if (project.slug === 'numpy-mlp-from-scratch') {
    return <figure className={`project-figure visual-network${detail ? ' figure-detail' : ''}`}>
      <div className="network-area"><Network /><div className="network-key"><span>Pixels</span><span>Hidden layer</span><span>Class scores</span></div></div>
      <figcaption><span>Dense neural network</span><span>Schematic</span></figcaption>
    </figure>;
  }

  if (project.slug === 'stethospeech-silent-speech') return <figure className={`project-figure visual-signal${detail ? ' figure-detail' : ''}`}>
    <div className="signal-area"><span className="signal-label">Non-audible murmur</span><Signal /><div className="signal-key"><span>Contact microphone</span><span>→</span><span>Speech representation</span></div></div>
    <figcaption><span>Silent speech pipeline</span><span>Illustration</span></figcaption>
  </figure>;

  if (project.slug === 'deep-q-learning') return <figure className={`project-figure visual-research${detail ? ' figure-detail' : ''}`}>
    <img src={`${base}media/dqn-results.png`} width="1400" height="780" loading="lazy" decoding="async" alt="Three-seed mean evaluation returns for DQN, Double DQN and dueling networks across six environments. Pong remains near minus 21; TreasureGrid returns remain low." />
    <figcaption><span>Original runs · seed mean ± sample SD</span><a href={`${base}media/dqn-results.png`}>Open full-size chart</a></figcaption>
  </figure>;

  const workflows: Record<string, [string, string][]> = {
    'majara-frontend': [['Contracts', 'TypeBox schemas and canonical routes'], ['Application', 'Session state and domain transports'], ['Interface', 'React features and shared shell']],
    'clinical-consultation-workflow': [['Case', 'Review context and documents'], ['Consultation', 'Complete configurable forms'], ['Team API', 'Persist through the shared backend']],
    'english-french-translation': [['Corpus', 'Prepare paired English and French text'], ['Architectures', 'Recurrent and Transformer models'], ['Evaluation', 'Compare under a stated protocol']],
    'word2vec-from-scratch': [['Context', 'Build training windows'], ['Objective', 'CBOW and Skip-gram'], ['Representation', 'Learn word embeddings']],
    'voice-tutoring-prototype': [['Tutor UI', 'Choose a learning session'], ['Voice session', 'Connect through Vapi'], ['Session record', 'Transcript and metadata']],
    'panoriha-advanced': [['Manage tours', 'Capture and station metadata'], ['API', 'NestJS and Prisma'], ['Storage', 'Assets in MinIO']],
  };
  const steps = workflows[project.slug] ?? [['Problem', project.category], ['Implementation', project.stack.slice(0, 2).join(' · ')], ['Evidence', project.status]];
  return <figure className={`project-figure visual-system${detail ? ' figure-detail' : ''}`}>
    <div className="operations-diagram">{steps.map(([title, body], i) => <div key={title}><small>0{i + 1}</small><strong>{title}</strong><span>{body}</span></div>)}</div>
    <figcaption><span>{project.title}</span><span>Architecture schematic</span></figcaption>
  </figure>;
}

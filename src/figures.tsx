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
  if (project.slug === 'webgpu-spatial-engine') {
    return <figure className={`project-figure visual-spatial${detail ? ' figure-detail' : ''}`}>
      <img src={`${base}media/spatial-prototype.webp`} width="1920" height="869" loading="lazy" decoding="async" alt="WebGPU prototype showing a scanned interior and a list of panorama viewpoints" />
      <figcaption><span>Spatial viewer</span><span>Prototype capture</span></figcaption>
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

  return <figure className={`project-figure visual-signal${detail ? ' figure-detail' : ''}`}>
    <div className="signal-area"><span className="signal-label">Non-audible murmur</span><Signal /><div className="signal-key"><span>Contact microphone</span><span>→</span><span>Speech representation</span></div></div>
    <figcaption><span>Silent speech pipeline</span><span>Illustration</span></figcaption>
  </figure>;
}

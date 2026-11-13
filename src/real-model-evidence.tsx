import { Fragment } from 'react';

const directory = 'media/virtual-staging/real-model-evidence/';

export const realModelEvidenceAssets = [
  `${directory}input.webp`,
  `${directory}mask2former.webp`,
  `${directory}sam.webp`,
  `${directory}difference.webp`,
  `${directory}run-record.json`,
];

const outputs = [
  {
    id: 'input',
    label: 'Input capture',
    heading: 'Original scan face',
    path: 'input.webp',
    alt: 'The unmodified, upright living-room image used as input for the two segmentation stages.',
    caption: 'The 640 by 640 upright image passed to Mask2Former.',
  },
  {
    id: 'mask2former',
    label: 'Mask2Former',
    heading: 'Seven semantic classes',
    path: 'mask2former.webp',
    alt: 'The same scan face with Mask2Former scene classes overlaid in color.',
    caption: 'Mask2Former Swin-T labels floor, wall, ceiling, windows, doors, furniture and other regions.',
  },
  {
    id: 'sam',
    label: 'SAM ViT-B',
    heading: 'Gate-passing proposals',
    path: 'sam.webp',
    alt: 'The same scan face after accepted Segment Anything mask proposals were applied to the semantic labels.',
    caption: 'Eight of nine SAM proposals passed the configured overlap gate and were applied to the semantic labels.',
  },
  {
    id: 'difference',
    label: 'Changed pixels',
    heading: 'Where the labels changed',
    path: 'difference.webp',
    alt: 'A darkened scan image highlights in yellow the pixels whose class changed after the SAM refinement stage.',
    caption: 'Yellow marks 2,907 changed pixels out of 409,600. This compares model outputs; it is not an accuracy score.',
  },
] as const;

const classes = [
  ['other', 'rgb(128 128 128)'],
  ['floor', 'rgb(80 200 80)'],
  ['wall', 'rgb(70 110 230)'],
  ['ceiling', 'rgb(90 220 220)'],
  ['window', 'rgb(250 220 60)'],
  ['door', 'rgb(245 140 40)'],
  ['furniture', 'rgb(220 80 200)'],
] as const;

export function RealModelEvidence({ base }: { base: string }) {
  return <div className="real-model-evidence">
    <div className="real-evidence-heading">
      <p className="eyebrow">Real scan · viewpoint 048 · ny face</p>
      <h3>Follow the image through the pipeline</h3>
      <p>These aligned outputs come from the same captured apartment view. Choose a stage to inspect it.</p>
    </div>

    <fieldset className="real-evidence-selector">
      <legend>Pipeline output</legend>
      {outputs.map((output, index) => <Fragment key={output.id}>
        <input
          id={`real-output-${output.id}`}
          className="real-evidence-radio"
          type="radio"
          name="real-apartment-output"
          defaultChecked={index === 0}
        />
        <label htmlFor={`real-output-${output.id}`}>{output.label}</label>
      </Fragment>)}
      <div className="real-evidence-panels">
        {outputs.map(output => <figure className={`real-evidence-panel panel-${output.id}`} key={output.id}>
          <img
            src={`${base}${directory}${output.path}`}
            alt={output.alt}
            width="640"
            height="640"
            loading="lazy"
            decoding="async"
          />
          <figcaption><strong>{output.heading}</strong><span>{output.caption}</span></figcaption>
        </figure>)}
      </div>
    </fieldset>

    <ul className="real-evidence-legend" aria-label="Semantic class colors">
      {classes.map(([name, color]) => <li key={name}><span style={{ backgroundColor: color }} />{name}</li>)}
    </ul>

    <details className="real-evidence-provenance">
      <summary>Run provenance</summary>
      <dl>
        <div><dt>Mask2Former</dt><dd>facebook/mask2former-swin-tiny-ade-semantic · cached output from the repository pipeline</dd></div>
        <div><dt>SAM</dt><dd>ViT-B · 8 of 9 proposals accepted at an overlap threshold of 0.30</dd></div>
        <div><dt>Changed pixels</dt><dd>2,907 / 409,600 (0.71%)</dd></div>
        <div><dt>Evaluation</dt><dd>No ground-truth accuracy or latency benchmark was run.</dd></div>
      </dl>
      <a className="text-link" href={`${base}${directory}run-record.json`}>Open the capture-level run record</a>
    </details>

    <p className="real-evidence-source">Sample source: Matterport Pro3, “Two-story home including facade.” <a href="https://support.matterport.com/s/article/Overview-of-Matterport-E57-File?language=en_US" target="_blank" rel="noreferrer">Matterport sample files</a>.</p>
  </div>;
}

export interface Project {
  slug: string;
  number: string;
  category: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  status: string;
  repo?: string;
  walkthrough?: boolean;
  walkthroughMedia?: { path: string; poster: string; transcript: string[] };
  evidenceImages?: { path: string; alt: string; caption: string; width: number; height: number }[];
  lead: string;
  problem: string;
  decisions: { title: string; body: string }[];
  outcome: string;
  limits: string;
  facts: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    slug: 'operations-intelligence-hub', number: '05', category: 'Agent orchestration', title: 'Enterprise Operations Intelligence Hub',
    summary: 'Team Spooka’s third-place hackathon prototype routes operational incidents to specialist agents and turns their responses into a single executive brief.',
    role: 'AI agents and orchestration', stack: ['Python', 'LangGraph', 'FastAPI', 'Claude'], status: 'NCS Hack 3.0 · June 2026',
    repo: 'https://github.com/youcef-ach/ncs-hack-operations-intelligence-hub',
    lead: 'At NCS Hack 3.0, I worked on the AI agents and orchestration for Team Spooka. We built a prototype for internal enterprise workflows and placed third. The team built the application together.',
    problem: 'An operational incident can involve several departments at once. Each team needs enough context to respond, and a decision maker needs one brief that explains the proposed actions and where they conflict.',
    decisions: [
      { title: 'Route by incident', body: 'The LangGraph workflow takes an incident, selects the relevant department modules, and sends each module the context it needs. The modules can run in parallel while agents within a module pass structured results to one another.' },
      { title: 'Reconcile proposals before briefing', body: 'The orchestration gathers the department outputs, resolves conflicting proposals, and produces an executive brief with the decision and supporting rationale.' },
      { title: 'Make the workflow inspectable without a model key', body: 'The prototype supports Claude for structured responses and a deterministic mock mode. The mock makes it possible to follow the graph and inspect the output without calling a live model.' },
    ],
    outcome: 'Team Spooka placed third at NCS Hack 3.0. The GitHub fork preserves the team’s original June 26–27 commits. The portfolio edition adds local setup instructions and tests for the mock workflows.',
    limits: 'This was a hackathon prototype. The action layer simulates enterprise side effects and does not connect to real HR, finance or security systems.',
    facts: [{ label: 'Team result', value: '3rd place' }, { label: 'Event', value: 'NCS Hack 3.0' }],
    evidenceImages: [
      { path: 'media/ncs-conflict-report.png', alt: 'The mock dashboard recommends blocking a vendor action until a binding objection is cleared, with next steps for each department.', caption: 'Executive brief from the synthetic vendor conflict scenario · Local mock run', width: 1092, height: 268 },
      { path: 'media/evidence/ncs_hack_award.webp', alt: 'Team Spooka with their third-place award at NCS Hack', caption: 'Team Spooka · NCS Hack 3.0, June 2026', width: 960, height: 1200 },
    ],
  },
  {
    slug: 'azuridtwinup', number: '06', category: 'Industrial spatial software', title: 'AzuridTwinUp',
    summary: 'A browser viewer for moving between 360° inspection stations and examining their 3D geometry. Viewer B improves how the application handles shared station identifiers, interrupted navigation, and measurement frames.',
    role: 'Product and viewer engineering', stack: ['React', 'Three.js', 'TypeScript', 'KTX2'], status: 'Private product · Protected Viewer B preview',
    walkthrough: true,
    walkthroughMedia: {
      path: 'media/azurid-walkthrough.mp4',
      poster: 'media/azurid-walkthrough.webp',
      transcript: [
        '0:00–0:07 · Industrial 360° inspection in the browser. The walkthrough uses Viewer B with an original synthetic scene.',
        '0:07–0:22 · Choose a station and drag to inspect the scene. Viewer B moves between the original synthetic panoramas.',
        '0:22–0:33 · Two bays reuse scan_0. The panorama lookup is scoped to the capture. Separate shared-cache tests exercise both request orders.',
        '0:33–0:42 · Switch from Synthetic Bay A to Synthetic Bay B and open Station 1. The selected capture determines which panorama loads.',
        '0:42–0:52 · A deliberate missing panorama interrupts a station request. A working station can still open afterward.',
        '0:52–1:02 · Measurement is unavailable for an unqualified frame. A metric coordinate frame and supported up axis are required.',
        '1:02–1:13 · The sealed R5 candidate recorded 104 passing behavioral tests. Read the case study or request a walkthrough.',
      ],
    },
    lead: 'I work on AzuridTwinUp, a browser-based viewer for navigating industrial inspection stations. Viewer B pairs each station’s camera pose and panorama with the corresponding 3D model. The hardening work began in a separate workspace. The verified build now runs as a protected preview on the product’s server.',
    problem: 'When two captures use the same station identifier, a texture lookup needs to know which capture owns it. Separately, switching views or recovering from a failed upload must release resources and allow the next navigation attempt. Measurements need an explicit coordinate frame and units.',
    decisions: [
      { title: 'Scope resources to their owners', body: 'The candidate scopes whole-KTX2 lookups by capture ID and keeps GPU resource leases distinct across product revisions. Tests cover shared revisions, independent revisions and both teardown orders.' },
      { title: 'Recover from interrupted navigation', body: 'The viewer resets the transition when landing confirmation fails. Recovery paths release pending resource leases so the user can select the next station.' },
      { title: 'Validate inputs at the viewer boundary', body: 'The candidate rejects malformed tile descriptors, normalizes incoming rotations, and reports measurements only when the coordinate frame declares a supported up axis and metre units.' },
    ],
    outcome: 'The isolated R5 checkpoint passed 104 behavioral tests. The integrated build passed 18 targeted tests and browser checks on two protected captures, with two stations rendered in each. HTTPS checks confirmed that the hosted preview serves the verified R5 bundle and requires authentication for the capture routes and assets.',
    limits: 'The hosted preview disables measurement on captures whose coordinate frames still need qualification. The verification covered navigation and access controls. Performance on target devices and measurement accuracy remain open.',
    facts: [{ label: 'R5 behavioral tests passed', value: '104' }, { label: 'Protected captures tested', value: '2' }],
  },
  {
    slug: 'arabic-structured-ie', number: '01', category: 'Applied NLP', title: 'Arabic information extraction',
    summary: 'A local language model turns Arabic instructions into structured data that an academic GIS application can validate.',
    role: 'NLP module author', stack: ['Python', 'Qwen 2.5', 'Ollama', 'JSON Schema'], status: 'Team academic project',
    repo: 'https://github.com/youcef-ach/arabic-structured-llm-extractor',
    lead: 'I built the extraction module for PlanMilt DZ, a team GIS project. My work covers the Arabic prompts, output schema, parser, and synthetic examples. Teammates built the map interface, speech recognition, and simulation backend.',
    problem: 'Arabic instructions are natural to read but difficult to turn into predictable application inputs. A language model can suggest a structured representation, but its response might be malformed or omit fields the application needs.',
    decisions: [
      { title: 'Run inference locally', body: 'The Python extractor sends Arabic text and a structured prompt to Qwen through Ollama. The model suggests objects such as operation areas, lines, and forces.' },
      { title: 'Define the interface as a schema', body: 'I used JSON Schema as the contract. The parser converts the response to JSON and validates the parsed object against the Draft 7 schema before the application consumes it.' },
      { title: 'Make the subsystem inspectable on its own', body: 'The public repository contains the standalone extractor, schema, synthetic Arabic inputs, and tests. It can be understood without access to the team application.' },
    ],
    outcome: 'The extractor makes model responses easier for software to handle by rejecting invalid structures. The public source includes the schema and examples for inspecting that behavior.',
    limits: 'Schema validation checks the shape of a response. It does not establish that the model correctly understood an instruction. The integrated GIS application is private, and the diagram shows the contract using a simplified example.',
    facts: [{ label: 'Inference', value: 'Local' }, { label: 'Output contract', value: 'JSON Schema' }],
  },
  {
    slug: 'webgpu-spatial-engine', number: '02', category: 'Spatial computing', title: 'From panoramas to 3D scenes',
    summary: 'A browser prototype connects panoramic imagery, segmentation masks, and scanned geometry so they can be inspected in one place.',
    role: 'Spatial pipeline development', stack: ['Python', 'FastAPI', 'Babylon.js', 'WebGPU'], status: 'Private prototype',
    lead: 'I worked on bringing image segmentation and scan geometry into a common coordinate system. The prototype lets me inspect the scene and move between scanned viewpoints in a browser.',
    problem: 'A 2D mask can mark a door in a panorama. Placing that door in 3D requires knowing the camera pose, choosing the correct surface, and checking for geometry in front of it.',
    decisions: [
      { title: 'Project the panorama into views the models can use', body: 'The pipeline creates cubemap views from a panorama and uses Mask2Former and Segment Anything to obtain candidate masks.' },
      { title: 'Lift image regions onto surfaces', body: 'Rays from the camera intersect candidate planes. Depth checks help reject intersections behind nearer geometry, where a projected mask would otherwise land on the wrong surface.' },
      { title: 'Inspect the result in a browser', body: 'The Babylon.js viewer provides a way to compare panoramas and spatial geometry as the camera moves between known viewpoints.' },
    ],
    outcome: 'The prototype connects the segmentation and geometry stages to an inspection interface. The screenshot shows the viewer during development.',
    limits: 'The capture shows a development build with fallback lighting. It is a record of the interface and scene, with no performance benchmark or production deployment claim.',
    facts: [{ label: 'Input', value: 'Panoramas + scans' }, { label: 'Viewer', value: 'WebGPU' }],
  },
  {
    slug: 'numpy-mlp-from-scratch', number: '03', category: 'Machine learning foundations', title: 'A neural network in NumPy',
    summary: 'A digit classifier built from matrix operations, with hand-derived gradients and a reproducible MNIST evaluation.',
    role: 'Independent implementation', stack: ['Python', 'NumPy', 'MNIST'], status: 'Public code',
    repo: 'https://github.com/youcef-ach/training-mlp-from-scratch-lab',
    lead: 'I implemented a small neural network to understand the math that an automatic differentiation library normally handles. I wrote the forward pass, loss, backpropagation and mini-batch training loop in NumPy.',
    problem: 'Calling a framework’s training API can hide which values are carried forward, how the loss gradient moves backward, and where numerical errors enter. This lab made each step explicit.',
    decisions: [
      { title: 'Batch the math', body: 'The model treats a batch as a matrix so the dense layers and gradients can use vectorized operations. ReLU gates the hidden units and softmax converts the output scores into probabilities.' },
      { title: 'Work through the gradient', body: 'Combining softmax with cross-entropy reduces the gradient at the logits to predicted probabilities minus the one-hot labels. That term is propagated through the second layer and the ReLU gate.' },
      { title: 'Keep the evaluation protocol visible', body: 'The public baseline separates training, validation, and testing. Its README documents the seeds, split, and number of test images consumed by the batch loop.' },
    ],
    outcome: 'The public controlled baseline reports 91.62% mean test accuracy with a standard deviation of 0.23 percentage points across five seeds, on 9,984 consumed MNIST test images.',
    limits: 'The repository documents separate experiment protocols. The number here describes the public baseline under its stated setup.',
    facts: [{ label: 'Mean accuracy', value: '91.62%' }, { label: 'Seeds', value: '5' }, { label: 'Test images', value: '9,984' }],
  },
  {
    slug: 'stethospeech-silent-speech', number: '04', category: 'Research reproduction', title: 'StethoSpeech',
    summary: 'A research reproduction that learns to predict speech representations from signals recorded by a contact microphone.',
    role: 'Independent research reproduction', stack: ['PyTorch', 'HuBERT', 'Transformer'], status: 'Academic experiment',
    lead: 'I adapted a published approach to non-audible murmur, the quiet vibrations recorded at the neck. The experiment evaluates how closely a model can predict speech features from that input.',
    problem: 'A contact microphone records vibrations with a very different signal profile from normal speech. The experiment needed matched recordings, a consistent representation for each side, and a held-out evaluation protocol.',
    decisions: [
      { title: 'Work with paired recordings', body: 'I prepared matched input and target recordings and trained a Transformer on paired sequences. The completed baseline used layer 12 features from an English HuBERT model.' },
      { title: 'Evaluate the completed run separately', body: 'The completed 19.7M-parameter baseline trained for 45 epochs. The selected checkpoint came from epoch 35. A larger paper-style adaptation was explored separately and stopped before a comparable evaluation.' },
      { title: 'Keep the target of the metric explicit', body: 'Mean absolute error measures differences between predicted and target feature values. The experiment used a closed-speaker split, so it measures held-out utterances from speakers represented during training.' },
    ],
    outcome: 'The selected baseline checkpoint recorded 0.23171 mean absolute error on 1,133 held-out utterances. The paired dataset contained 11,323 matched examples.',
    limits: 'The result concerns speech representations. End-to-end intelligibility and performance on unseen speakers still need separate evaluation. The approach was inspired by Shah et al. (ACM IMWUT, 2024).',
    facts: [{ label: 'Feature MAE', value: '0.23171' }, { label: 'Held-out utterances', value: '1,133' }, { label: 'Parameters', value: '19.7M' }],
  },
];

export const community = [
  { image: 'media/evidence/ingehack_badge.webp', width: 1200, height: 960, eyebrow: 'INGENIUMS · 2023–2024', title: 'Vice president, INGENIUMS', body: 'I helped coordinate technical programs at ESI-SBA, co-organized Ingeneer events with Transformatek, and spoke to incoming students at Welcome Day.', alt: 'Youcef at Ingehack wearing his INGENIUMS vice president badge' },
  { image: 'media/evidence/esi_showcase_demo.webp', width: 1080, height: 1080, eyebrow: 'Project demonstrations', title: 'Explaining the work', body: 'At ESI Showcase 7.0 and Ingeneer 1.0, I demonstrated projects and answered questions from students and visitors.', alt: 'Discussion around a laptop at the INGENIUMS ESI Showcase 7.0 stand' },
  { image: 'media/evidence/ingeneer_second_ceremony.webp', width: 1200, height: 836, eyebrow: 'Event organization', title: 'Making events happen', body: 'I supported Ingeneer, Ingehack, LC Hack and Ingecode. At Ingeneer I helped present prizes to the winning teams.', alt: 'Award presentation to a winning team at the Ingeneer ceremony' },
  { image: 'media/evidence/youth_center_stem_1.webp', width: 1200, height: 900, eyebrow: 'Community computing · Algiers', title: 'Learning with the community', body: 'I took part in computing activities at Maison de Jeunes Abderrahmane Laala. At ESI-SBA I also supported campus cultural events, including Amazigh Day and Art Manchour.', alt: 'Participants working at laptops at the youth center in Algiers' },
];

export const awards = [
  { title: 'DevFest Hackathon', year: '2023', result: '2nd place', detail: 'Team Infinity · GDG Sidi Bel Abbès', image: 'media/evidence/dev_fest_stage.webp', width: 720, height: 721 },
  { title: 'NCS Hack 3.0', year: '2026', result: '3rd place', detail: 'Team Spooka · NiT Computer Society Club', image: 'media/evidence/ncs_hack_award.webp', width: 960, height: 1200, projectSlug: 'operations-intelligence-hub' },
  { title: 'ForsaTIC Hackathon', year: '2024', result: 'Participant', detail: 'ESI-SBA delegation · ENSIA, Algiers', image: 'media/evidence/forsatik_team.webp', width: 900, height: 1200 },
];

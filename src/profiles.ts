export const identity = {
  name: 'Achouri Youcef Islem',
  school: 'École Nationale Supérieure d’Informatique de Sidi Bel Abbès (ESI-SBA)',
  specialty: 'Artificial Intelligence and Data Structures',
  email: 'yi.achouri@esi-sba.dz',
  github: 'https://github.com/youcef-ach',
  linkedin: 'https://www.linkedin.com/in/youcef-achouri/',
};

export const profiles = [
  {
    slug: '',
    label: 'General',
    title: 'Engineering portfolio',
    statement: 'I build AI systems for language and 3D environments, and I like getting close to the math and software that make them work.',
    description: 'Industrial digital twins, agent orchestration, Arabic NLP, numerical machine learning, and student leadership at ESI-SBA.',
    projects: ['azuridtwinup', 'operations-intelligence-hub', 'majara-frontend', 'arabic-structured-ie'],
    pdf: 'Youcef_Achouri_CV_English.pdf',
  },
  {
    slug: 'applied-ai',
    label: 'Applied AI',
    title: 'Applied AI engineering',
    statement: 'I build workflows around models, from agents that coordinate an incident response to Arabic text extraction with a defined output contract.',
    description: 'Agent orchestration, local LLMs, model integration and computer vision.',
    projects: ['operations-intelligence-hub', 'arabic-structured-ie', 'webgpu-spatial-engine', 'stethospeech-silent-speech'],
    pdf: 'Youcef_Achouri_CV_Applied_AI.pdf',
  },
  {
    slug: 'research',
    label: 'Research',
    title: 'Research engineering',
    statement: 'I’m interested in how models learn, what their metrics actually tell us, and how to make the experiments reproducible.',
    description: 'Silent speech research, numerical ML, architecture studies, and evaluation from first principles.',
    projects: ['stethospeech-silent-speech', 'deep-q-learning', 'english-french-translation', 'numpy-mlp-from-scratch'],
    pdf: 'Youcef_Achouri_CV_Research.pdf',
  },
  {
    slug: 'software-spatial',
    label: 'Software & spatial',
    title: 'Software & spatial systems',
    statement: 'I work on industrial digital twins\u2014from scanning sites with LiDAR and drones, through alignment and reconstruction, to the browser viewer and backend that deliver the result.',
    description: 'Industrial digital twins, spatial pipelines, 3D viewing and backend integration.',
    projects: ['azuridtwinup', 'webgpu-spatial-engine', 'majara-frontend', 'clinical-consultation-workflow'],
    pdf: 'Youcef_Achouri_CV_Software_Spatial.pdf',
  },
] as const;

export type Profile = typeof profiles[number];

export interface SupportingProject {
  title: string;
  description: string;
  category: string;
  href?: string;
  projectSlug?: string;
}

const voicePrototype: SupportingProject = {
  title: 'Voice tutoring prototype',
  description: 'Connected a React tutoring interface to Vapi voice sessions, rendered final transcripts, and stored session metadata in Supabase.',
  projectSlug: 'voice-tutoring-prototype',
  category: 'Application engineering',
};

const clinicalWorkflow: SupportingProject = {
  title: 'Clinical consultation workflow',
  description: 'Frontend architecture and implementation for a clinical consultation platform, integrating configurable forms and case views with the team’s Django REST API.',
  projectSlug: 'clinical-consultation-workflow',
  category: 'Workflow software',
};

const panoriha: SupportingProject = {
  title: 'Panoriha Advanced',
  description: 'A private spatial tour management prototype with a NestJS API, Prisma data models and MinIO object storage.',
  projectSlug: 'panoriha-advanced',
  category: 'Full-stack systems',
};

export const additionalWork: SupportingProject[] = [
  { title: 'StethoSpeech research adaptation', description: 'Predicting HuBERT features of TTS-generated speech from murmur recordings, with a closed-speaker evaluation.', projectSlug: 'stethospeech-silent-speech', category: 'Speech research' },
  { title: 'Deep Q-learning experiments', description: 'DQN, Double DQN and dueling networks with 90 archived experimental runs and a corrected results table.', projectSlug: 'deep-q-learning', category: 'Reinforcement learning' },
  {
    title: 'Virtual staging on 3D scans',
    description: 'A spatial vision prototype pairing real apartment model outputs with an explicitly synthetic furniture-staging demo.',
    projectSlug: 'webgpu-spatial-engine',
    category: 'Spatial vision',
  },
  {
    title: 'A neural network in NumPy',
    description: 'A two-layer MNIST classifier (784 → 128 → 10) with hand-derived backpropagation gradients. 91.62% ± 0.23pp across five seeds.',
    projectSlug: 'numpy-mlp-from-scratch',
    category: 'Machine learning foundations',
  },
  {
    title: 'English–French translation',
    description: 'An architecture lab implementing four translation architectures from scratch: BiLSTM, Bahdanau attention, decoder-only Transformer, and encoder–decoder Transformer.',
    projectSlug: 'english-french-translation',
    category: 'Natural language processing',
  },
  {
    title: 'Word2Vec from scratch',
    description: 'Implemented CBOW and Skip-gram training in PyTorch to study how context shapes word embeddings.',
    projectSlug: 'word2vec-from-scratch',
    category: 'Machine learning',
  },
  voicePrototype,
  clinicalWorkflow,
  panoriha,
  {
    title: 'MapReduce and Spark coursework',
    description: 'Distributed computing exercises, including Python streaming reducers with tests for empty inputs and malformed rows.',
    href: 'https://github.com/youcef-ach/big-data-distributed-computing',
    category: 'Data engineering foundations',
  },
];

export const spatialWork: SupportingProject[] = [panoriha, clinicalWorkflow, voicePrototype];
export const appliedAiWork: SupportingProject[] = [voicePrototype];

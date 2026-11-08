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
    description: 'Selected work in applied AI, spatial computing, and software engineering, alongside student leadership at ESI-SBA.',
    projects: ['operations-intelligence-hub', 'azuridtwinup', 'arabic-structured-ie', 'numpy-mlp-from-scratch'],
    pdf: 'Youcef_Achouri_CV_English.pdf',
  },
  {
    slug: 'applied-ai',
    label: 'Applied AI',
    title: 'Applied AI engineering',
    statement: 'I build workflows around models, from agents that coordinate an incident response to Arabic text extraction with a defined output contract.',
    description: 'Agent orchestration, local LLMs, model integration and computer vision.',
    projects: ['operations-intelligence-hub', 'arabic-structured-ie', 'webgpu-spatial-engine', 'numpy-mlp-from-scratch'],
    pdf: 'Youcef_Achouri_CV_Applied_AI.pdf',
  },
  {
    slug: 'research',
    label: 'Research',
    title: 'Research engineering',
    statement: 'I’m interested in how models learn, what their metrics actually tell us, and how to make the experiments reproducible.',
    description: 'Silent speech research, numerical ML, and evaluation from first principles.',
    projects: ['stethospeech-silent-speech', 'numpy-mlp-from-scratch', 'webgpu-spatial-engine'],
    pdf: 'Youcef_Achouri_CV_Research.pdf',
  },
  {
    slug: 'software-spatial',
    label: 'Software & spatial',
    title: 'Software & spatial systems',
    statement: 'I work on browser viewers for inspection captures and spatial scans, with a focus on how the software handles real data and recovers when something fails.',
    description: 'Industrial 3D viewing, spatial pipelines and backend integration.',
    projects: ['azuridtwinup', 'webgpu-spatial-engine', 'operations-intelligence-hub'],
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
  category: 'Application engineering',
};

const clinicalWorkflow: SupportingProject = {
  title: 'Clinical consultation workflow',
  description: 'A Django REST and React prototype for multidisciplinary case meetings, with configurable forms, attachment handling and audit logging.',
  category: 'Workflow software',
};

const panoriha: SupportingProject = {
  title: 'Panoriha Advanced',
  description: 'A private spatial tour management prototype with a NestJS API, Prisma data models and MinIO object storage.',
  category: 'Full-stack systems',
};

export const additionalWork: SupportingProject[] = [
  {
    title: 'From panoramas to 3D scenes',
    description: 'A Babylon.js prototype for projecting segmentation masks onto scanned geometry.',
    projectSlug: 'webgpu-spatial-engine',
    category: 'Spatial vision',
  },
  {
    title: 'StethoSpeech',
    description: 'A research reproduction with a held-out evaluation of predicted speech features.',
    projectSlug: 'stethospeech-silent-speech',
    category: 'Research',
  },
  {
    title: 'English–French translation',
    description: 'An architecture lab tracing the path from recurrent models through attention to a custom Transformer.',
    href: 'https://github.com/youcef-ach/english-to-frensh-translation-model',
    category: 'Natural language processing',
  },
  {
    title: 'Word2Vec from scratch',
    description: 'Implemented CBOW and Skip-gram training in PyTorch to study how context shapes word embeddings.',
    href: 'https://github.com/youcef-ach/word2vec_from_scratch',
    category: 'Machine learning',
  },
  voicePrototype,
  clinicalWorkflow,
  panoriha,
];

export const spatialWork: SupportingProject[] = [panoriha, clinicalWorkflow, voicePrototype];
export const appliedAiWork: SupportingProject[] = [voicePrototype];

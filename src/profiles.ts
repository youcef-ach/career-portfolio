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
    projects: ['arabic-structured-ie', 'webgpu-spatial-engine', 'numpy-mlp-from-scratch', 'stethospeech-silent-speech'],
    pdf: 'Youcef_Achouri_CV_English.pdf',
  },
  {
    slug: 'applied-ai',
    label: 'Applied AI',
    title: 'Applied AI engineering',
    statement: 'I work on turning model outputs into something a system can use, from Arabic text extraction to segmentation in a 3D scene.',
    description: 'Local LLMs, model integration, computer vision and practical evaluation.',
    projects: ['arabic-structured-ie', 'webgpu-spatial-engine', 'numpy-mlp-from-scratch'],
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
    statement: 'I build software around difficult inputs, from spatial scans that have to line up in a browser to language models that need a predictable output contract.',
    description: 'Browser 3D, spatial pipelines, typed interfaces and backend integration.',
    projects: ['webgpu-spatial-engine', 'arabic-structured-ie', 'numpy-mlp-from-scratch'],
    pdf: 'Youcef_Achouri_CV_Software_Spatial.pdf',
  },
] as const;

export type Profile = typeof profiles[number];

export const additionalWork = [
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
  {
    title: 'Voice tutoring prototype',
    description: 'Connected a React interface to a streaming voice assistant with WebRTC events and live transcripts.',
    category: 'Application engineering',
  },
  {
    title: 'Industrial 3D GIS',
    description: 'Private project work involving browser-based site visualization, 360° imagery and object storage for spatial assets.',
    category: 'Spatial engineering',
  },
];

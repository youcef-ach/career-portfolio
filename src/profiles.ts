export const identity = {
  name: 'Achouri Youcef Islem',
  school: 'École Nationale Supérieure d’Informatique de Sidi Bel Abbès (ESI-SBA)',
  specialty: 'Artificial Intelligence and Data Science',
  email: 'yi.achouri@esi-sba.dz',
  github: 'https://github.com/youcef-ach',
  linkedin: 'https://www.linkedin.com/in/youcef-achouri/',
};

export const profiles = [
  {
    slug: '',
    label: 'Overview',
    title: 'Engineering portfolio',
    statement: 'I build spatial AI and digital twin systems—combining professional field experience in 3D scanning and photogrammetry with a strong foundation in deep learning, 3D vision, and software architecture.',
    description: 'Industrial digital twins, 3D vision, agent orchestration, numerical machine learning, and student leadership at ESI-SBA.',
    projects: ['azuridtwinup', 'webgpu-spatial-engine', 'operations-intelligence-hub', 'stethospeech-silent-speech'],
    pdf: 'Youcef_Achouri_CV_English.pdf',
  },
  {
    slug: 'applied-ai',
    label: 'Applied AI',
    title: 'Applied AI engineering',
    statement: 'I build workflows around models, from agents that coordinate an incident response to Arabic text extraction with a defined output contract.',
    description: 'Agent orchestration, local LLMs, model integration and computer vision.',
    projects: ['operations-intelligence-hub', 'arabic-structured-ie', 'webgpu-spatial-engine', 'stethospeech-silent-speech'],
    pdf: 'Youcef_Achouri_CV_English.pdf',
  },
  {
    slug: 'research',
    label: 'Research',
    title: 'Research engineering',
    statement: 'I’m interested in how models learn, what their metrics actually tell us, and how to make the experiments reproducible.',
    description: 'Silent speech research, numerical ML, architecture studies, and evaluation from first principles.',
    projects: ['stethospeech-silent-speech', 'deep-q-learning', 'english-french-translation', 'numpy-mlp-from-scratch'],
    pdf: 'Youcef_Achouri_CV_English.pdf',
  },
  {
    slug: 'software-spatial',
    label: 'Digital Twins & Spatial',
    title: 'Digital Twins & Spatial Systems',
    statement: 'I work on industrial digital twins—from scanning sites with LiDAR and drones, through alignment and reconstruction, to the browser viewer and backend that deliver the result.',
    description: 'Industrial digital twins, spatial pipelines, 3D viewing and backend integration.',
    projects: ['azuridtwinup', 'webgpu-spatial-engine', 'majara-frontend', 'clinical-consultation-workflow'],
    pdf: 'Youcef_Achouri_CV_English.pdf',
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
  description: 'Tutorial-based React learning project using Vapi voice sessions and Supabase session metadata; subsequent additions are being documented.',
  projectSlug: 'voice-tutoring-prototype',
  category: 'Guided learning project',
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
  {
    title: 'Arabic structured information extraction',
    description: 'A local Qwen 2.5 7B module converting Arabic descriptions into nested JSON with Draft 7 schema validation.',
    projectSlug: 'arabic-structured-ie',
    category: 'Applied NLP & LLMs',
  },
  {
    title: 'Tourvisto AI travel planner',
    description: 'Full-stack React 19 & Django REST travel dashboard generating validated itineraries behind JWT authentication.',
    projectSlug: 'tourvisto-ai-travel',
    category: 'Full-stack AI web product',
  },
  {
    title: 'iPhone 15 Pro 3D web experience',
    description: 'Dual-view WebGL product showcase using React Three Fiber, Drei Views, PBR lighting rigs, and GSAP ScrollTrigger.',
    projectSlug: 'apple-iphone-3d-showcase',
    category: 'Interactive 3D web graphics',
  },
  {
    title: 'Majara frontend platform',
    description: 'The React and TypeScript frontend architecture for ACS’s community platform, with TypeBox schemas and XState session state.',
    projectSlug: 'majara-frontend',
    category: 'Frontend platform engineering',
  },
  {
    title: 'Neural network from scratch in NumPy',
    description: 'A two-layer MNIST classifier (784 → 128 → 10) built entirely from scratch by hand with raw matrix operations and hand-derived backpropagation—zero autograd. 91.62% ± 0.23pp across five seeds.',
    projectSlug: 'numpy-mlp-from-scratch',
    category: 'Foundations from scratch',
  },
  { title: 'Deep Q-learning experiments', description: 'DQN, Double DQN and dueling networks with 90 archived experimental runs and a corrected results table.', projectSlug: 'deep-q-learning', category: 'Reinforcement learning' },
  {
    title: 'Neural translation architectures from scratch',
    description: 'Four sequence models built from scratch by hand in PyTorch (no nn.Transformer): BiLSTM, Bahdanau attention, causal Transformer, and encoder–decoder Transformer.',
    projectSlug: 'english-french-translation',
    category: 'NLP from scratch',
  },
  {
    title: 'Word2Vec from scratch',
    description: 'Continuous Bag-of-Words and Skip-gram algorithms implemented fully from scratch by hand in PyTorch, with 2D embeddings for direct geometric inspection.',
    projectSlug: 'word2vec-from-scratch',
    category: 'ML from scratch',
  },
  clinicalWorkflow,
  panoriha,
  {
    title: 'TranscribeFlow · Audio/video sync',
    description: 'React 19 + MUI/AntD media player paired with a Django ASGI proxy gateway for word-level speech transcript scrubbing.',
    href: 'https://github.com/youcef-ach/transcriptions-website',
    category: 'Full-stack speech UI',
  },
  {
    title: 'Enterprise admin dashboard',
    description: 'Corporate React operations console featuring Nivo data visualizations, choropleth charts, and calendar scheduling.',
    href: 'https://github.com/youcef-ach/entreprise-admin-dashboard',
    category: 'Data visualization UI',
  },
  {
    title: 'Hdeco interior showcase',
    description: 'Bespoke furniture e-commerce catalog built by hand in React 19, React Router v7, and custom typography.',
    href: 'https://github.com/youcef-ach/Hdeco_decoration_entreprise_website',
    category: 'Frontend craftsmanship',
  },
  voicePrototype,
  {
    title: 'NLP preprocessing pipeline',
    description: 'Modular NLTK & Hugging Face BERT text normalization pipeline with unit tests on the Spooky Author corpus.',
    href: 'https://github.com/youcef-ach/nlp-lab1',
    category: 'NLP foundations',
  },
  {
    title: 'MapReduce and Spark coursework',
    description: 'Distributed computing exercises, including Python streaming reducers with tests for empty inputs and malformed rows.',
    href: 'https://github.com/youcef-ach/big-data-distributed-computing',
    category: 'Data engineering foundations',
  },
];

export interface ArchiveEntry {
  title: string;
  year: string;
  scope: string;
  stack: string;
  description: string;
  projectSlug?: string;
  repo?: string;
  liveHref?: string;
}

export interface ArchiveGroup {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  items: ArchiveEntry[];
}

export const archiveGroups: ArchiveGroup[] = [
  {
    id: 'spatial-3d',
    eyebrow: 'Track 01 · 2024 – 2026',
    title: 'Spatial Computing, 3D Vision & Interactive WebGL',
    summary: 'Progression from early React Three Fiber scenes and GLB/FBX showcases to LiDAR E57 parsing, semantic foundation models, photogrammetry pipelines, and industrial digital twins.',
    items: [
      {
        title: 'AzuridTwinUp · Industrial Digital Twin Platform',
        year: '2026',
        scope: 'Production / Private Platform',
        stack: 'Metashape Pro · RealityScan · QGIS · COLMAP · 3DGS / 2DGS / SuGaR · DUSt3R / MASt3R · VGGT · Three.js · NestJS',
        description: 'End-to-end photogrammetry pipeline (+2,000 drone & terrestrial images with GCPs), DTM/DSM generation, E57/3D Tiles browser viewer, altitude & slope heatmaps, and exploratory neural 3D model studies.',
        projectSlug: 'azuridtwinup',
      },
      {
        title: 'Virtual Staging on 3D LiDAR Scans',
        year: '2026',
        scope: 'Research Prototype · Live Demo',
        stack: 'Matterport Pro3 E57 · Mask2Former · SAM ViT-B · Babylon.js WebGPU · FastAPI',
        description: 'Zero-shot architectural segmentation, E57 coordinate lock invariant, 6-face cubemap projection, and real-time physical occlusion meshes in Babylon.js/WebGPU.',
        projectSlug: 'webgpu-spatial-engine',
        liveHref: 'demos/virtual-staging/',
      },
      {
        title: 'Panoriha Advanced · Spatial Tour Platform',
        year: '2026',
        scope: 'Private Full-Stack Prototype',
        stack: 'NestJS · Prisma · PostgreSQL · MinIO S3 · React Router v7 · Three.js',
        description: 'Full-stack spatial tour management API with presigned MinIO uploads, measurement tools, spatial tagging, and GSAP camera choreography (evolved from Panoriha v1).',
        projectSlug: 'panoriha-advanced',
      },
      {
        title: 'El Merk Early 3D GIS Prototype & 3D Viewer Sandboxes',
        year: '2025 – 2026',
        scope: 'Private / Historical Foundation',
        stack: 'Docker Compose · Nginx · Three.js · Draco · MinIO',
        description: 'Early Three.js 3D tour viewer experiments (virtual_staging v0/v1, D:\\3d-viewer) and geotechnical terrain cross-section / Cut-and-Fill volumetric prototypes leading into AzuridTwinUp.',
      },
      {
        title: 'iPhone 15 Pro 3D Web Experience',
        year: '2024 – 2025',
        scope: 'Public Repo',
        stack: 'React 18 · Three.js r168 · React Three Fiber · Drei · GSAP ScrollTrigger',
        description: 'Dual-view WebGL canvas hardware showcase with titanium PBR materials, custom Lightformer studio rigs, scroll-linked GSAP animations, and accessible finish/size controls.',
        projectSlug: 'apple-iphone-3d-showcase',
        repo: 'https://github.com/youcef-ach/apple',
      },
      {
        title: 'Early Interactive 3D Developer Portfolio',
        year: '2025',
        scope: 'Public Repo',
        stack: 'React · Three.js · React Three Fiber · Drei · GLB / FBX · Ant Design · GSAP',
        description: 'My earlier 3D web portfolio rendering animated custom GLB/FBX characters alongside interactive project cards for Sofi, E-commerce, ESI-SBA 360 Tour, and Admin Dashboard.',
        repo: 'https://github.com/youcef-ach/portfolio',
      },
      {
        title: 'Three-Fiber 3D Keyboard Study',
        year: '2025',
        scope: 'Private Exploration',
        stack: 'React Three Fiber · Three.js',
        description: 'Early WebGL component exercise exploring 3D keycap geometry and interactive pointer events inside a browser scene.',
      },
    ],
  },
  {
    id: 'ai-ml-data',
    eyebrow: 'Track 02 · 2024 – 2026',
    title: 'AI Research, NLP, Reinforcement Learning & Foundations',
    summary: 'From university ML/DL coursework and from-scratch NumPy/PyTorch derivations up to self-supervised speech adaptation, constrained LLMs, and multi-agent systems.',
    items: [
      {
        title: 'StethoSpeech Silent Speech Research Adaptation',
        year: '2026',
        scope: '4th-Year DL Project · Audited Codebase',
        stack: 'PyTorch · HuBERT Base L12 · mHuBERT L11 · Unit HiFi-GAN · MFA',
        description: '19.7M-parameter Transformer encoder mapping non-audible murmur bio-signals to 768-dim HuBERT representations (0.23171 MAE on 1,133 held-out utterances) plus 29.26M FFT & Unit HiFi-GAN pipeline.',
        projectSlug: 'stethospeech-silent-speech',
        repo: 'https://github.com/youcef-ach/stethospeech-nam-reproduction',
      },
      {
        title: 'Arabic Structured IE · PlanMilt DZ',
        year: '2026',
        scope: '4th-Year Multidisciplinary Project · Public Validator',
        stack: 'Qwen 2.5 7B · LoRA · Ollama · JSON Schema Draft 7 · Python · Leaflet GIS',
        description: 'AI/GIS Team Lead: fine-tuned Qwen 2.5 7B via LoRA on institutional 24GB GPU corpus and open-sourced the standalone Ollama extractor with recursive Draft 7 schema contracts.',
        projectSlug: 'arabic-structured-ie',
        repo: 'https://github.com/youcef-ach/arabic-structured-llm-extractor',
      },
      {
        title: 'Enterprise Operations Intelligence Hub',
        year: '2026',
        scope: '3rd Place / 25 Teams (NCS Hack 3.0) · Public Repo',
        stack: 'Python · LangGraph · Claude · FastAPI · Deterministic Replay',
        description: 'StateGraph multi-agent orchestrator routing incidents across HR, Finance, and Security modules and reconciling conflicting recommendations into executive briefs.',
        projectSlug: 'operations-intelligence-hub',
        repo: 'https://github.com/youcef-ach/ncs-hack-operations-intelligence-hub',
      },
      {
        title: 'Deep Q-Learning Experiments (90 Archived Runs)',
        year: '2026',
        scope: 'Course Research Study · Public Repo',
        stack: 'PyTorch · Gymnasium · NumPy · CartPole · LunarLander · Pong · TreasureGrid',
        description: 'Comparative 3-seed study across DQN, Double DQN, and Dueling networks with provenance checks, honest negative-result reporting, and greedy evaluation plots.',
        projectSlug: 'deep-q-learning',
        repo: 'https://github.com/youcef-ach/deep-reinforcement-learning-dqn-benchmarks',
      },
      {
        title: 'Neural Translation Architectures from Scratch',
        year: '2026',
        scope: '4th-Year NLP Capstone · Public Repo',
        stack: 'PyTorch Tensor Primitives · BiLSTM · Bahdanau Attention · Transformers · Gensim',
        description: 'Four EN–FR sequence models hand-coded from primitive tensor math without nn.Transformer modules, covering custom Q/K/V projections, causal masks, and AMP loops.',
        projectSlug: 'english-french-translation',
        repo: 'https://github.com/youcef-ach/english-to-frensh-translation-model',
      },
      {
        title: 'Neural Network from Scratch in Pure NumPy',
        year: '2026',
        scope: 'Public Repo · 18 Unit Tests',
        stack: 'Python · NumPy · Analytical Calculus Backprop · Softmax Jacobian',
        description: 'Two-layer 784–128–10 MNIST classifier written completely by hand with finite-difference gradient checks (< 6.2e-10 error) and a reproducible 5-seed baseline (91.62% ± 0.23pp).',
        projectSlug: 'numpy-mlp-from-scratch',
        repo: 'https://github.com/youcef-ach/training-mlp-from-scratch-lab',
      },
      {
        title: 'Word2Vec CBOW & Skip-Gram from Scratch',
        year: '2026',
        scope: 'Public Repo',
        stack: 'Python · PyTorch Primitives · NLTK · Gensim Dictionary',
        description: 'Hand-coded sentence-aware context windowing paired with 2D embedding projection training to inspect semantic geometry directly.',
        projectSlug: 'word2vec-from-scratch',
        repo: 'https://github.com/youcef-ach/word2vec_from_scratch',
      },
      {
        title: 'NLP Preprocessing & Semantic Normalization (nlp-lab1)',
        year: '2026',
        scope: '4th-Year NLP Lab · Public Repo + pytest',
        stack: 'Python · NLTK · Hugging Face BERT Tokenizer · pytest',
        description: 'Modular text normalization pipeline combining contraction expansion, regex cleaning, lemmatization, BERT subword tokenization, and unit tests on the Spooky Author corpus.',
        repo: 'https://github.com/youcef-ach/nlp-lab1',
      },
      {
        title: 'Big Data Distributed Computing (MapReduce & Spark)',
        year: '2026',
        scope: 'Public Repo · 9 Subprocess Tests',
        stack: 'Python Streaming · Java Hadoop MapReduce · Apache Spark · MLlib',
        description: 'Hadoop streaming mappers/reducers (word count, sales aggregation, anagram grouping), Maven Java MapReduce jobs, PySpark notebooks, and subprocess edge-case tests.',
        repo: 'https://github.com/youcef-ach/big-data-distributed-computing',
      },
      {
        title: 'Deep Learning CNN & Statistical ML Labs',
        year: '2024 – 2026',
        scope: 'University Coursework · Public & Local',
        stack: 'TensorFlow/Keras · Scikit-Learn · Pandas · OpenCV · Streamlit · Gradio',
        description: 'ESI-SBA engineering labs: CIFAR-10 CNN training (deep_learning_lab_3), factor analysis & PCA notebooks, OpenCV grayscale image filtering, SEDS data packages, and modeling/simulation exercises.',
        repo: 'https://github.com/youcef-ach/deep_learning_lab_3',
      },
    ],
  },
  {
    id: 'fullstack-ui',
    eyebrow: 'Track 03 · 2023 – 2026',
    title: 'Full-Stack Platforms & Hand-Crafted Frontend Engineering',
    summary: 'Real-world product interfaces, state machines, clinical/travel dashboards, and responsive layouts built from scratch across React, TypeScript, Django REST, NestJS, and Flutter.',
    items: [
      {
        title: 'Majara Community Frontend Platform (ACS)',
        year: '2026',
        scope: 'Private Organisation · 283 Passing Tests',
        stack: 'React · TypeScript · Vite · TypeBox · XState · Vanilla Extract',
        description: 'Frontend architecture separating TypeBox API contracts, Ory Kratos XState auth/session state machines, and lazy-loaded world routes (Discover, Base, Playground).',
        projectSlug: 'majara-frontend',
      },
      {
        title: 'e-RCP Multidisciplinary Clinical Consultation Client',
        year: '2026',
        scope: 'Private Organisation · Case Study',
        stack: 'React · JavaScript · Django REST API · Configurable Schemas',
        description: 'Owned the React architecture supporting patient dossiers, multidisciplinary RCP case meetings, document workflows, and dynamic schema-driven medical forms.',
        projectSlug: 'clinical-consultation-workflow',
      },
      {
        title: 'Tourvisto · Full-Stack AI Travel Planner',
        year: '2025 – 2026',
        scope: 'Public Repo · Live Client',
        stack: 'React 19 · Syncfusion · Ant Design · Django REST · SimpleJWT · Gemini API',
        description: 'End-to-end travel agency booking dashboard and AI itinerary generator isolating LLM credentials and atomic multi-table saves behind Django REST endpoints.',
        projectSlug: 'tourvisto-ai-travel',
        repo: 'https://github.com/youcef-ach/touristic-agency-dashboard',
        liveHref: 'https://touristic-agency-dashboard.vercel.app',
      },
      {
        title: 'TranscribeFlow · Synchronized Media Transcription Platform',
        year: '2025 – 2026',
        scope: 'Public Repo · Live App',
        stack: 'React 19 · Material UI · Ant Design · Django 5 ASGI Proxy · JWT',
        description: 'Audio/video transcription workspace featuring interactive word-level timestamp scrubbing, silent JWT renewal, and a CORS-isolated Django ASGI proxy gateway.',
        repo: 'https://github.com/youcef-ach/transcriptions-website',
        liveHref: 'https://transcriptions-website.vercel.app',
      },
      {
        title: 'Enterprise Operations & Analytics Admin Dashboard',
        year: '2025',
        scope: 'Public Repo · Live App',
        stack: 'React · Nivo Charts · DataGrid · FullCalendar · Vite',
        description: 'Multi-page corporate analytics console featuring choropleth geography visualizations, interactive bar/line/pie telemetry, invoice tables, and calendar scheduling.',
        repo: 'https://github.com/youcef-ach/entreprise-admin-dashboard',
        liveHref: 'https://entreprise-admin-dashboard-1grh.vercel.app',
      },
      {
        title: 'Hdeco · Luxury Interior & Furniture Showcase',
        year: '2025',
        scope: 'Public Repo',
        stack: 'React 19 · React Router v7 · Custom Typography · Node Tests',
        description: 'Responsive bespoke furniture catalog and brand storefront built by hand for an interior decoration business with detail routing and category filtering.',
        repo: 'https://github.com/youcef-ach/Hdeco_decoration_entreprise_website',
      },
      {
        title: 'LMS Educational Platform & Voice Tutoring Prototype',
        year: '2025 – 2026',
        scope: 'Private Prototypes',
        stack: 'Next.js · TypeScript · Docker · React · Vapi · Deepgram · ElevenLabs · Supabase · Clerk',
        description: 'Next.js role-based LMS architecture plus a real-time conversational AI tutoring client connecting Clerk auth, Vapi voice calls, and Supabase session records.',
        projectSlug: 'voice-tutoring-prototype',
      },
      {
        title: 'Django + React Full-Stack Auth & Multi-Tenant Starter',
        year: '2025',
        scope: 'Public Repo',
        stack: 'Python · Django REST · SimpleJWT · React · Vite',
        description: 'Reusable full-stack template pairing protected client routing and JWT interceptor refresh flows with Django API serializers and unit checks.',
        repo: 'https://github.com/youcef-ach/django-react-project',
      },
      {
        title: 'Ibtikar Tatawo3 · Volunteer Platform & Earlier Mobile Apps',
        year: '2024 – 2026',
        scope: 'Private Team & Early Explorations',
        stack: 'Flutter / Dart · React Native (Expo) · TypeScript',
        description: 'Cross-platform volunteer mobilization client (Ibtikar Tatawo3 in Flutter) alongside earlier React Native (Expo) live-streaming and mobile UI experiments.',
      },
      {
        title: 'Nike E-Commerce Landing Page & Early CSS UI Craft',
        year: '2023 – 2025',
        scope: 'Public Repo · Hand-Coded UI',
        stack: 'React 18 · Tailwind CSS · HTML5 · Responsive Grids',
        description: 'Early hand-coded frontend craft: interactive product colorway switcher, responsive typography tokens, component architecture, and coffee-shop / farm dashboard exercises.',
        repo: 'https://github.com/youcef-ach/Nike-landing-page',
      },
    ],
  },
];

export const spatialWork: SupportingProject[] = [panoriha, clinicalWorkflow, voicePrototype];
export const appliedAiWork: SupportingProject[] = [voicePrototype];

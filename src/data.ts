export interface Project {
  slug: string;
  category: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  status: string;
  repo?: string;
  demo?: { path: string; note: string };
  walkthrough?: boolean;
  walkthroughMedia?: { path: string; poster: string; transcript: string[] };
  evidenceImages?: { path: string; alt: string; caption: string; width: number; height: number }[];
  lead: string;
  context?: string;
  problem: string;
  decisions: { title: string; body: string }[];
  outcome: string;
  limits: string;
  facts: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    "slug": "azuridtwinup",
    "category": "Industrial digital twin platform",
    "title": "AzuridTwinUp",
    "summary": "An authenticated industrial digital-twin platform. My work spans Matterport Pro3 LiDAR and drone image acquisition, point-cloud and mesh processing, and the Three.js viewer and NestJS backend used to inspect a site.",
    "role": "Partner & Lead Spatial Systems Engineer — acquisition, processing pipeline, 3D viewer, backend",
    "stack": [
      "Python",
      "Agisoft Metashape",
      "RealityScan",
      "E57",
      "KTX2",
      "Three.js",
      "React",
      "React Router v7",
      "TypeScript",
      "NestJS",
      "Prisma",
      "MinIO"
    ],
    "status": "Private industrial platform · Partner · March 2026 – Present · Hosting transition",
    "walkthrough": true,
    "walkthroughMedia": {
      "path": "media/azurid-walkthrough.mp4",
      "poster": "media/azurid-walkthrough.webp",
      "transcript": [
        "0:00–0:07 · Industrial 360° inspection in the browser. The walkthrough shows panoramic navigation with a synthetic scene.",
        "0:07–0:22 · Choose a station and drag to inspect the scene. The viewer moves between panoramas aligned with the 3D mesh.",
        "0:22–0:33 · Two bays reuse scan_0. The panorama lookup is scoped to the capture. Separate shared-cache tests exercise both request orders.",
        "0:33–0:42 · Switch from Synthetic Bay A to Synthetic Bay B and open Station 1. The selected capture determines which panorama loads.",
        "0:42–0:52 · A deliberate missing panorama interrupts a station request. A working station can still open afterward.",
        "0:52–1:02 · Measurement is unavailable for an unqualified frame. A metric coordinate frame and supported up axis are required.",
        "1:02–1:13 · The sealed build recorded 104 passing behavioral tests. Read the case study or request a walkthrough."
      ]
    },
    "lead": "As partner and lead spatial engineer at Azurid, I work across field acquisition, scan processing and the web platform. AzuridTwinUp combines panoramic inspection, meshes, site measurements and reporting behind authenticated access. The recorded demonstration below shows the viewer while hosting is in transition.",
    "context": "AzuridTwinUp digitizes construction and industrial sites into navigable 3D digital twins. Two acquisition sources feed the platform: a Matterport Pro3 LiDAR scanner producing E57 point clouds with registered 360° panoramas (a single site can exceed 550 scan stations and 72 GB of raw data), and a DJI Mini 3 drone capturing aerial photographs for photogrammetric reconstruction. Point clouds and images are processed through Agisoft Metashape and RealityScan for alignment and mesh generation. When alignment fails—due to insufficient image overlap, reflective or textureless surfaces, or inconsistent lighting—I perform quality analysis on the misaligned image subsets, diagnose the root cause, and decide whether to adjust alignment parameters or re-acquire the affected area. The reconstructed mesh is converted from OBJ to GLB with Meshopt compression and KTX2 GPU-compressed textures via gltf-transform, then served through a NestJS API backed by Prisma and MinIO object storage.",
    "problem": "An industrial site generates hundreds of scan stations and thousands of images. The pipeline must extract per-station point clouds and camera poses from multi-file E57 datasets, apply Matterport-specific cubemap face rotations so panoramas render correctly in Three.js, convert coordinate systems from the scanner’s Z-up to the viewer’s Y-up convention, and compress meshes for browser delivery. In the viewer, panoramas must be aligned with the 3D geometry, texture lookups must be scoped per capture to prevent cross-capture leaks, and measurements require a validated metric coordinate frame before any distance readout is reported.",
    "decisions": [
      {
        "title": "Acquire and align from two complementary sources",
        "body": "LiDAR scanning (Matterport Pro3) provides registered interior point clouds with camera poses at each station. Drone photogrammetry (DJI Mini 3) extends coverage to rooftops and exteriors. When Agisoft Metashape alignment produces gaps or drift, I run quality analysis on the misaligned image clusters—checking overlap coverage, detecting specular or textureless surfaces, and evaluating exposure consistency—then decide whether to adjust alignment parameters or re-acquire the affected area."
      },
      {
        "title": "Process E57 scans through a custom extraction pipeline",
        "body": "A Python toolchain (pye57, OpenCV, NumPy, SciPy, trimesh) extracts per-station point clouds, camera poses (quaternions + translations), and cubemap face images from multi-file E57 datasets. Matterport’s native pinhole images require canonical rotation and Z-axis inversion to render correctly as Three.js cubemap skyboxes. The MatterPak OBJ mesh is converted to GLB with Meshopt compression and KTX2 textures via gltf-transform and obj2gltf."
      },
      {
        "title": "Scope texture lookups and recover from navigation failures",
        "body": "The KTX2 texture cache is keyed on (captureId, stationId) rather than stationId alone, preventing cross-capture texture leaks when two captures share station identifiers. When a panorama upload fails or a station transition is interrupted, the viewer resets its transition state and releases pending GPU resource leases (WebGL textures and buffers), so the next navigation attempt starts clean."
      },
      {
        "title": "Validate coordinate frames before reporting measurements",
        "body": "Before reporting any distance or area measurement, the viewer verifies that the coordinate frame declares a supported up axis (Y-up after the Z-up → Y-up ingestion transform) and metre units. Malformed tile descriptors are rejected and incoming rotations are normalized, preventing misleading readouts from unqualified frames."
      }
    ],
    "outcome": "The platform combines authenticated inspection with an E57 processing pipeline that handled a 550-station dataset of approximately 72 GB. The recorded Viewer B hardening checkpoint passed 104 behavioural tests and 18 integration tests across two protected captures. Hosting is currently in transition; the recorded viewer demonstration remains available below.",
    "limits": "Measurement is disabled for unqualified coordinate frames. Mobile-device benchmarks and surveyed ground-truth measurement accuracy remain open. The recorded viewer checks cover navigation, access and coordinate handling. Live access is unavailable during the hosting transition.",
    "facts": [
      {
        "label": "Product",
        "value": "Private platform · Hosting transition"
      },
      {
        "label": "Acquisition",
        "value": "Pro3 LiDAR + DJI Mini 3 images"
      },
      {
        "label": "Recorded dataset",
        "value": "550 stations · ~72 GB"
      },
      {
        "label": "Recorded viewer checkpoint",
        "value": "104 behavioural + 18 integration tests"
      }
    ]
  },
  {
    "slug": "stethospeech-silent-speech",
    "category": "Research reproduction",
    "title": "StethoSpeech research adaptation",
    "summary": "A PyTorch adaptation of StethoSpeech: predict HuBERT representations of TTS-generated speech from non-audible murmur recordings. Evaluated on held-out utterances from familiar speakers.",
    "role": "Independent research reproduction",
    "stack": [
      "PyTorch",
      "HuBERT",
      "Transformer",
      "librosa"
    ],
    "status": "Academic experiment",
    "lead": "I adapted the core feature-mapping idea from Shah et al.’s StethoSpeech (IMWUT, 2024). A 19.7M-parameter Transformer maps contact-microphone murmur features to HuBERT features of speech synthesized from the corresponding transcript.",
    "context": "The input is non-audible murmur (NAM), recorded by a contact microphone at the neck. Target audio is generated with text-to-speech from the transcript; it is not a clean simultaneous recording of the same utterance. Frozen HuBERT Base layer 12 features provide 768-dimensional input and target sequences. This is an adaptation of the research idea, not a replication under the paper’s original data conditions.",
    "problem": "Murmur recordings and synthetic speech have different signal characteristics and timing. The experiment needed consistent feature extraction, length handling and a held-out evaluation protocol that makes the closed-speaker setting explicit.",
    "decisions": [
      {
        "title": "Extract paired features with HuBERT Base",
        "body": "I extract layer 12 features from both NAM recordings and TTS-generated target audio using frozen HuBERT Base. A Transformer predicts the target feature sequence. Linear interpolation aligns predicted and target frame counts for the masked L1 loss; it does not establish phonetic alignment or recover the original speaking rhythm."
      },
      {
        "title": "Train and evaluate a 19.7M-parameter Transformer",
        "body": "The baseline uses a 6-layer Transformer encoder (d_model=512, 8 attention heads, 2048-dim FFN, dropout 0.1) with linear input/output projections between the 768-dim HuBERT space and the 512-dim model space. Training ran for 45 epochs using masked L1 loss (MAE) with AdamW (LR 1e-4, batch 32), gradient clipping at norm 1.0, and ReduceLROnPlateau scheduling. The best checkpoint was selected at epoch 35 based on validation performance. A larger paper-style adaptation (29.26M parameters, using mHuBERT layer 11) was explored separately but stopped before reaching a comparable evaluation."
      },
      {
        "title": "Evaluate on held-out utterances from familiar speakers",
        "body": "The dataset contains 11,323 matched NAM/transcript-derived speech pairs. The closed-speaker split holds out utterances, while speakers may appear in both training and test sets. The resulting MAE measures feature prediction in that setting; a separate speaker-disjoint protocol is needed to assess new speakers."
      }
    ],
    "outcome": "The selected baseline checkpoint recorded 0.23171 mean absolute error on 1,133 held-out utterances. The result measures feature-level prediction quality (how closely the predicted 768-dim vectors match the HuBERT targets), not end-to-end speech intelligibility.",
    "limits": "The target speech is TTS-generated. Feature MAE does not measure intelligibility, word error rate or naturalness. Unseen-speaker performance and a direct comparison under the original paper’s protocol remain unevaluated.",
    "facts": [
      {
        "label": "Feature MAE",
        "value": "0.23171"
      },
      {
        "label": "Held-out utterances",
        "value": "1,133"
      },
      {
        "label": "Parameters",
        "value": "19.7M"
      },
      {
        "label": "Architecture",
        "value": "6-layer Encoder (d=512, 8 heads, FFN 2048)"
      },
      {
        "label": "Training",
        "value": "AdamW (LR 1e-4, batch 32, grad clip 1.0)"
      },
      {
        "label": "Loss function",
        "value": "Masked L1 (MAE)"
      },
      {
        "label": "Training epochs",
        "value": "45 (best: epoch 35)"
      },
      {
        "label": "Matched pairs",
        "value": "11,323"
      },
      {
        "label": "Feature dim",
        "value": "768 (HuBERT Base L12)"
      }
    ]
  },
  {
    "slug": "webgpu-spatial-engine",
    "category": "Spatial AI & Computer Vision",
    "title": "Virtual staging on 3D scans",
    "summary": "An offline 3D computer vision pipeline combines Mask2Former Swin-T semantic segmentation and SAM ViT-B zero-shot boundary refinement on real Matterport Pro3 LiDAR scans (E57), paired with an interactive WebGPU / Babylon.js viewer for real-time depth-aware virtual object staging.",
    "role": "Spatial vision pipeline architect — foundation models, point cloud processing, WebGPU integration",
    "stack": [
      "Mask2Former",
      "SAM",
      "PyTorch",
      "E57",
      "Python",
      "Babylon.js",
      "WebGPU",
      "FastAPI"
    ],
    "status": "Research prototype · 2026 · real sample evidence",
    "demo": {
      "path": "demos/virtual-staging/",
      "note": "Interactive furniture placement in a synthetic room. The real scan and aligned model outputs are shown below."
    },
    "lead": "I built an offline scene-understanding pipeline using E57 scan geometry, Mask2Former and SAM, alongside a Babylon.js placement and occlusion viewer. The case study shows real apartment model outputs; the public interactive viewer demonstrates placement separately in a synthetic room.",
    "context": "Matterport Pro3 is a LiDAR scanner. Its E57 exports contain point clouds and scan poses that can be related to panoramic imagery. This project combines those registered inputs with semantic segmentation and a browser renderer. It consumes existing scan registration and transforms coordinates; it does not implement a general-purpose LiDAR registration algorithm.",
    "problem": "A photograph can show where a doorway appears in the image, but placing a virtual object near it requires knowing where the camera stood, how far away the wall is, and what should remain visible in front of the object. The pipeline must transform scanner-native Z-up coordinates into the viewer’s Y-up frame, segment the scene into meaningful regions, and provide depth information so the viewer can occlude virtual furniture behind real geometry.",
    "decisions": [
      {
        "title": "Maintain one metric coordinate frame",
        "body": "At ingestion, the pipeline applies a rotation matrix to convert the E57 scan’s Z-up coordinate system and camera extrinsics to Babylon.js’s Y-up convention, preserving the scan origin. All subsequent geometry, camera poses, and furniture placements share this single metric frame, avoiding misalignment between the point cloud, panoramas, and virtual objects."
      },
      {
        "title": "Label regions, then refine selected boundaries",
        "body": "Mask2Former (Swin-T backbone, trained on the ADE20K scene dataset with 150 classes) performs panoptic segmentation on each perspective face of the panorama, labeling every pixel. The pipeline groups these into seven application classes: floor, wall, ceiling, window, door, furniture, and other. Bounding boxes around candidate windows, doors, and furniture then prompt SAM (ViT-B), which produces refined instance masks. An overlap gate (threshold 0.30) compares each SAM proposal against the original Mask2Former label—proposals with insufficient overlap are rejected."
      },
      {
        "title": "Verify openings with 3D ray casting and depth",
        "body": "The offline pipeline includes ray intersections against candidate wall planes and mesh-derived depth checks to reject openings blocked by nearer geometry. This is a geometric visibility check. The displayed comparison documents segmentation outputs; it is not an end-to-end validation of opening detection or collision-free furniture placement."
      },
      {
        "title": "Render photograph and virtual furniture in separate layers",
        "body": "Babylon.js composites the unmodified photographic panorama with a depth-writing mesh derived from the scan and separately lit glTF furniture models. The depth-write mesh gives virtual objects a surface to rest on and allows real geometry closer to the camera to occlude them correctly."
      }
    ],
    "outcome": "The offline pipeline produced seven-class Mask2Former labels across 21 viewpoints from a Matterport Pro3 sample. For viewpoint 048, 9 SAM proposals were generated and 8 passed the overlap gate (mean overlap: 0.67, range: 0.41–0.82). The case study compares the original input, semantic labels, accepted SAM refinements, and the 2,907 changed pixels (0.71% of 409,600). The interactive staging viewer demonstrates furniture placement in a separately labeled synthetic room.",
    "limits": "The displayed model comparison documents one scan face from one viewpoint and does not measure segmentation accuracy against ground truth (IoU/mIoU) or inference latency. Furniture placement and occlusion controls are demonstrated on synthetic data; the real scan evidence covers the vision pipeline only.",
    "facts": [
      {
        "label": "Scan viewpoints processed",
        "value": "21"
      },
      {
        "label": "Vision models",
        "value": "Mask2Former Swin-T + SAM ViT-B"
      },
      {
        "label": "Semantic classes",
        "value": "7"
      },
      {
        "label": "SAM proposals accepted",
        "value": "8 of 9 (viewpoint 048)"
      },
      {
        "label": "Overlap threshold",
        "value": "0.30"
      },
      {
        "label": "Changed pixels",
        "value": "2,907 / 409,600 (0.71%)"
      }
    ]
  },
  {
    "slug": "operations-intelligence-hub",
    "category": "Agent orchestration",
    "title": "Enterprise Operations Intelligence Hub",
    "summary": "A 4-person hackathon prototype that routes operational incidents to department-specific LangGraph agents—HR, Finance, Security—and reconciles their proposals into one executive brief. Third place at NCS Hack 3.0 out of approximately 20 teams.",
    "role": "AI agent architect and orchestration lead",
    "stack": [
      "LangGraph",
      "Claude",
      "Python",
      "FastAPI",
      "JSON"
    ],
    "status": "NCS Hack 3.0 · June 2026 · ~20 teams",
    "repo": "https://github.com/youcef-ach/ncs-hack-operations-intelligence-hub",
    "lead": "In a 4-person team at NCS Hack 3.0, I designed and implemented the AI agent orchestration layer. I owned the LangGraph state graph, the department routing logic, and the deterministic mock mode. Teammates built the frontend dashboard, data ingestion, and pitch materials.",
    "context": "The implementation uses LangGraph to coordinate an incident-response workflow: classify the incident, branch to relevant department modules, collect their proposals, then reconcile them into a brief. The inspected graph is acyclic; the framework’s support for cycles is not a feature implemented here.",
    "problem": "An operational incident can involve several departments at once. Each department agent needs enough context to respond independently, and a decision maker needs one consolidated brief that explains the proposed actions and flags where they conflict.",
    "decisions": [
      {
        "title": "Route incidents through a LangGraph state graph",
        "body": "I built a StateGraph with conditional routing to HR, Finance and Security modules. The selected branches work with structured state and converge before reconciliation. This makes the responsibilities and handoffs inspectable without claiming a clarification loop that is absent from the implementation."
      },
      {
        "title": "Reconcile conflicting proposals before briefing",
        "body": "A reconciliation node gathers all department outputs, detects conflicting recommendations (e.g., HR approves an action that Security blocks), and produces a structured executive brief with the final decision and supporting rationale from each department."
      },
      {
        "title": "Make the workflow inspectable without an API key",
        "body": "I implemented a deterministic mock mode alongside the Claude-backed path. The mock uses fixture data to drive the same graph topology, making it possible to trace execution, inspect intermediate state, and run automated tests without calling a live LLM."
      }
    ],
    "outcome": "Team Spooka placed third out of approximately 20 teams at NCS Hack 3.0. The GitHub fork preserves the team’s original June 26–27 commits. The portfolio edition adds local setup instructions and tests for the mock workflows.",
    "limits": "This was a 24-hour hackathon prototype. The action layer simulates enterprise side effects through deterministic fixtures and does not connect to real HR, finance, or security systems. Production hardening—persistent state, retry policies, and observability—was out of scope.",
    "facts": [
      {
        "label": "Team result",
        "value": "3rd of ~20 teams"
      },
      {
        "label": "Event",
        "value": "NCS Hack 3.0"
      },
      {
        "label": "My role",
        "value": "Agent orchestration"
      },
      {
        "label": "Team size",
        "value": "4"
      }
    ],
    "evidenceImages": [
      {
        "path": "media/ncs-conflict-report.png",
        "alt": "The mock dashboard recommends blocking a vendor action until a binding objection is cleared, with next steps for each department.",
        "caption": "Executive brief from the synthetic vendor conflict scenario · Local mock run",
        "width": 1092,
        "height": 268
      },
      {
        "path": "media/evidence/ncs_hack_award.webp",
        "alt": "Team Spooka with their third-place award at NCS Hack",
        "caption": "Team Spooka · NCS Hack 3.0, June 2026",
        "width": 960,
        "height": 1200
      }
    ]
  },
  {
    "slug": "arabic-structured-ie",
    "category": "Applied NLP & LLMs",
    "title": "Arabic structured information extraction",
    "summary": "A local Qwen 2.5 7B module that converts Arabic descriptions into nested JSON for an academic GIS application. Syntax and Draft 7 schema validation reject malformed outputs; semantic extraction accuracy remains to be evaluated.",
    "role": "NLP extraction engine architect — prompt engineering, JSON schema, validation guard, tests",
    "stack": [
      "Qwen 2.5 7B",
      "Ollama",
      "Python",
      "JSON Schema Draft 7"
    ],
    "status": "Academic GIS module · 2026 · Public extractor",
    "repo": "https://github.com/youcef-ach/arabic-structured-llm-extractor",
    "lead": "I designed and implemented the Arabic extraction module for PlanMilt DZ, an academic GIS project. My contribution covers the prompt, recursive JSON schema, parsing and validation guards, and eight public tests. The standalone extractor can be reviewed independently of the private team application.",
    "context": "PlanMilt DZ is an academic GIS application for processing Arabic tactical descriptions. The extraction module bridges natural-language Arabic input and the structured data the application needs. Qwen 2.5 7B was selected for its strong Arabic language support and its ability to run locally via Ollama, avoiding external API dependencies and keeping inference private. The JSON Schema defines three top-level entity types (areas_of_operation, tactical_lines, forces) with a recursive military_unit definition supporting six hierarchical levels (battalion through heavy_weapon) and four affiliation classes (friendly, enemy, neutral, unknown). Each entity carries coordinate arrays and nested sub-units, giving the schema enough depth to represent full organizational hierarchies from a single text extraction.",
    "problem": "Arabic instructions are natural to read but difficult to turn into predictable application inputs. A language model can suggest a structured representation, but its response might be malformed JSON, omit required fields, or include unexpected types. The application needs a reliable contract that rejects invalid structures before they reach the business logic.",
    "decisions": [
      {
        "title": "Run inference locally with Qwen 2.5 7B",
        "body": "The Python extractor calls Qwen 2.5 7B through Ollama with an Arabic extraction prompt and the target schema. Ollama’s JSON format constrains syntax; a separate schema check enforces fields and types. Local inference avoids dependence on a hosted model API, while runtime and hardware requirements still need measurement."
      },
      {
        "title": "Enforce structure with JSON Schema (Draft 7)",
        "body": "I defined a Draft 7 JSON Schema specifying three top-level entity types (areas_of_operation, tactical_lines, forces) with a recursive military_unit definition that supports six hierarchical levels (battalion, company, platoon, squad, vehicle, heavy_weapon) and four affiliations (friendly, enemy, neutral, unknown). Each unit carries optional location coordinates, task descriptions, and nested sub_units. The parser calls json.loads on the model response, then validates the parsed object against the schema using Draft7Validator. Invalid structures are rejected before the application consumes them."
      },
      {
        "title": "Make the subsystem inspectable on its own",
        "body": "The public repository contains the standalone extractor, the full schema, synthetic Arabic inputs, and an 8-test suite. It can be understood and evaluated without access to the private team application."
      }
    ],
    "outcome": "The extractor enforces structural validity by rejecting malformed or incomplete model outputs against the Draft 7 schema. The public repository includes the schema, prompt templates, synthetic Arabic examples, and tests for inspecting that behavior.",
    "limits": "Schema validation checks the shape of a response—it does not establish that the model correctly understood the Arabic instruction’s semantic meaning. No extraction accuracy benchmark (F1, precision, recall) was run. The integrated GIS application is private.",
    "facts": [
      {
        "label": "Inference",
        "value": "Local (Ollama)"
      },
      {
        "label": "Output contract",
        "value": "JSON Schema Draft 7"
      },
      {
        "label": "Model",
        "value": "Qwen 2.5 7B"
      },
      {
        "label": "Schema entities",
        "value": "3 top-level, 6 unit levels"
      },
      {
        "label": "Validation",
        "value": "Two-stage (syntax + schema)"
      },
      {
        "label": "Public tests",
        "value": "8"
      }
    ]
  },
  {
    "slug": "numpy-mlp-from-scratch",
    "category": "Machine learning foundations",
    "title": "A neural network in NumPy",
    "summary": "A two-layer MNIST digit classifier (784 → 128 → 10) built entirely from matrix operations—forward propagation, cross-entropy loss, and hand-derived backpropagation gradients—with no automatic differentiation. Reproducible 5-seed evaluation on the public baseline.",
    "role": "Independent implementation",
    "stack": [
      "Python",
      "NumPy",
      "MNIST"
    ],
    "status": "Public code",
    "repo": "https://github.com/youcef-ach/training-mlp-from-scratch-lab",
    "lead": "I implemented a two-layer dense neural network from scratch in NumPy to understand the math that automatic differentiation libraries normally abstract away. Every operation—forward propagation, loss computation, gradient derivation, and mini-batch weight updates—is written as explicit matrix operations.",
    "context": "This project strips away the abstractions of frameworks like PyTorch or TensorFlow. The bias-free network architecture is 784 input pixels → 128 hidden units (ReLU activation) → 10 output classes (softmax), trained with mini-batch SGD (learning rate 0.01, batch size 64, 10 epochs). Weights are initialized from N(0, 0.3). The key insight is that combining softmax with cross-entropy loss simplifies the output gradient to (predicted probabilities − one-hot labels), which is then propagated backward through the hidden layer and the ReLU gate using standard chain-rule derivations.",
    "problem": "Calling a framework’s training API can hide which values are carried forward, how the loss gradient moves backward through each layer, and where numerical errors enter. This lab made each step explicit so the math could be inspected and verified.",
    "decisions": [
      {
        "title": "Vectorize the forward and backward passes",
        "body": "The model treats each mini-batch as a matrix, so the dense-layer multiplications and gradient computations use vectorized NumPy operations. ReLU gates the hidden units element-wise, and softmax converts the output layer’s raw scores into a probability distribution over the 10 digit classes."
      },
      {
        "title": "Derive gradients analytically",
        "body": "The public baseline is bias-free: the analytical gradient updates the two weight matrices. I derive softmax/cross-entropy and backpropagate through ReLU explicitly. Central finite-difference checks on selected test inputs agree to relative error below 6.2e-10; this is a numerical check of those cases, not proof that every training path is defect-free."
      },
      {
        "title": "Document the evaluation protocol",
        "body": "The public baseline separates training (50k), validation (10k), and test (10k) splits. Seeds, learning rate, batch size, and the number of test images consumed by the batch loop are documented in the README. The 9,984 consumed images (vs. 10,000) reflect the final mini-batch truncation at the chosen batch size."
      }
    ],
    "outcome": "The public controlled baseline reports 91.62% mean test accuracy with a standard deviation of 0.23 percentage points across five seeds, on 9,984 consumed MNIST test images. The repository includes 18 tests for the forward pass, gradient computation, and training loop.",
    "limits": "The repository documents separate experiment protocols. The 91.62% number describes only the public baseline under its stated setup. No comparison to a framework-based baseline or published MNIST benchmarks is included in the case study. A separately evaluated local branch achieved higher accuracy but is not part of the public baseline.",
    "facts": [
      {
        "label": "Mean accuracy (5 seeds)",
        "value": "91.62% ± 0.23pp"
      },
      {
        "label": "Architecture",
        "value": "784 → 128 → 10"
      },
      {
        "label": "Optimizer",
        "value": "Mini-batch SGD (LR 0.01, batch 64)"
      },
      {
        "label": "Test images consumed",
        "value": "9,984"
      },
      {
        "label": "Tests",
        "value": "18"
      }
    ]
  },
  {
    "slug": "english-french-translation",
    "category": "Natural language processing",
    "title": "English–French translation architectures",
    "summary": "An architecture lab tracing the evolution of neural machine translation: from a recurrent encoder–decoder (BiLSTM) without attention, through Bahdanau additive attention, to a decoder-only causal Transformer and a full encoder–decoder Transformer with cross-attention—all implemented from scratch in PyTorch.",
    "role": "Independent implementation",
    "stack": [
      "PyTorch",
      "LSTM",
      "Transformer",
      "Gensim",
      "Python"
    ],
    "status": "Public code",
    "repo": "https://github.com/youcef-ach/english-to-frensh-translation-model",
    "lead": "I implemented four translation architectures from scratch in PyTorch to study how the field moved from recurrent models to Transformers. Each notebook builds on the previous one: a BiLSTM encoder–decoder baseline, the same architecture augmented with Bahdanau attention, a decoder-only causal Transformer, and a full encoder–decoder Transformer with cross-attention.",
    "context": "The Tatoeba English–French dataset (fra.txt, ~34.5 MB, 239,189 sentence pairs) provides the reference corpus. Tokenization is word-level via Gensim, with punctuation mapped to explicit tokens and a vocabulary of 49,654 words built from the full corpus. Special tokens (PAD, SOS, EOS, UNK) anchor the sequence boundaries.",
    "problem": "Understanding how attention and Transformer architectures improve on recurrent baselines requires implementing the mechanics—alignment scoring, causal masking, multi-head projections, cross-attention—rather than calling a library. Each architecture surfaces a different design trade-off between sequential processing, parallelism, and information flow.",
    "decisions": [
      {
        "title": "Start with a recurrent baseline",
        "body": "The first notebook implements a bidirectional LSTM encoder (hidden size 256) with packed padded sequences and a unidirectional LSTM decoder (hidden size 512) initialized from the concatenated forward and backward encoder states. FP16 mixed precision and gradient clipping are included. This baseline establishes the limitations of compressing an entire source sentence into a fixed-length vector."
      },
      {
        "title": "Add Bahdanau additive attention",
        "body": "The second notebook introduces a custom attention module that computes alignment scores via a learnable projection: score = vᵀ tanh(W[hidden; encoder_outputs]). The context vector is concatenated with decoder embeddings at each step. Source padding positions are masked with −∞ before softmax. Teacher forcing is scheduled from 1.0 down to 0.5 across epochs to improve inference stability."
      },
      {
        "title": "Build Transformers from scratch",
        "body": "The third notebook implements a decoder-only causal Transformer with custom scaled dot-product attention (Q·Kᵀ/√d_k), lower-triangular causal masking, multi-head structure, residual connections, LayerNorm, and a position-wise FFN (d → 4d → d). The fourth notebook extends this to a full encoder–decoder Transformer (3 encoder layers, 3 decoder layers) with bidirectional self-attention in the encoder, causal self-attention in the decoder, and cross-attention (Q from decoder, K/V from encoder). Autoregressive greedy decoding generates tokens from SOS to EOS."
      }
    ],
    "outcome": "All four architectures compile and execute. The attention model reduced loss from 10.80 to 1.47 over 5 smoke-test epochs. The encoder–decoder Transformer converged to loss 0.000572 on a synthetic sentence pair in 10 epochs. Automated tests verify tensor shapes, attention weight normalization, padding masking, and causal mask correctness.",
    "limits": "This is an educational prototype. Tokenization is word-level (no BPE or SentencePiece). The full corpus was not trained to convergence due to compute constraints, so no BLEU or chrF benchmarks are reported. The goal was understanding the architecture mechanics, not achieving competitive translation quality.",
    "facts": [
      {
        "label": "Architectures",
        "value": "4 (BiLSTM, +Attention, Decoder-only, Enc-Dec Transformer)"
      },
      {
        "label": "Corpus",
        "value": "Tatoeba EN–FR (239,189 pairs)"
      },
      {
        "label": "Vocabulary",
        "value": "49,654 words"
      },
      {
        "label": "Framework",
        "value": "PyTorch (from scratch)"
      }
    ]
  },
  {
    "slug": "word2vec-from-scratch",
    "category": "Machine learning",
    "title": "Word2Vec from scratch",
    "summary": "Implemented CBOW and Skip-gram training in PyTorch to study how context-based objectives shape word embeddings. Uses 2D embedding vectors for direct visualization without dimensionality reduction.",
    "role": "Independent implementation",
    "stack": [
      "PyTorch",
      "NLTK",
      "Gensim",
      "Python"
    ],
    "status": "Public code",
    "repo": "https://github.com/youcef-ach/word2vec_from_scratch",
    "lead": "I built both Word2Vec training objectives—Skip-gram and CBOW—from scratch in PyTorch to understand how a neural network learns semantic relationships from raw text. The implementation uses 2-dimensional embeddings so the learned vectors can be plotted directly, without needing PCA or t-SNE.",
    "context": "Word2Vec learns dense word representations by predicting context. Skip-gram predicts surrounding words from a center word; CBOW predicts the center word from its context. This implementation builds the entire pipeline manually: sentence tokenization (NLTK), word tokenization and vocabulary construction (Gensim corpora.Dictionary), training pair generation with configurable window size, and the embedding–linear neural network.",
    "problem": "Pre-trained embedding libraries abstract away the training dynamics. To see how the optimization actually moves word vectors, the implementation needed explicit training pair generation, a visible loss curve, and embeddings small enough to plot directly as 2D coordinates before and after training.",
    "decisions": [
      {
        "title": "Use 2D embeddings for direct visualization",
        "body": "Setting the embedding dimension to 2 lets the trained vectors be plotted as (x, y) coordinates without any dimensionality reduction. Before training, word positions are random. After 200 epochs (LR 0.01), words that appear in similar contexts cluster together. The trade-off is that 2D embeddings lack the capacity for rich semantic structure, but they make the learning process visually obvious."
      },
      {
        "title": "Generate training pairs with sentence-aware windowing",
        "body": "Text is first split into sentences (NLTK), then each sentence is tokenized into words (Gensim). Training pairs are generated within sentence boundaries: a word at the end of one sentence does not form a context pair with a word at the start of the next. Skip-gram pairs are (center_word_idx, context_word_idx); CBOW pairs are ([context_word_idxs], center_word_idx). Window size is 2 (4 neighbors total)."
      },
      {
        "title": "Compare Skip-gram and CBOW on the same corpus",
        "body": "Both models use the same architecture: nn.Embedding(vocab_size, 2) as the input layer and nn.Linear(2, vocab_size) as the output, trained with CrossEntropyLoss. On the small test corpus (4 sentences, 92 words, vocabulary 62), CBOW converged to lower loss (0.7) than Skip-gram (2.7), consistent with CBOW’s advantage on small datasets where each training example aggregates multiple context signals."
      }
    ],
    "outcome": "Both models train and produce interpretable 2D embeddings. The before/after visualizations show random initial positions converging to semantically meaningful clusters. CBOW achieved 0.7 final loss versus 2.7 for Skip-gram on the small corpus.",
    "limits": "The training corpus is very small (62 words). Negative sampling was not implemented. The 2D embedding dimension is too low for real semantic tasks. This is an educational implementation for understanding training dynamics, not a production embedding system.",
    "facts": [
      {
        "label": "Architectures",
        "value": "Skip-gram + CBOW"
      },
      {
        "label": "Embedding dim",
        "value": "2 (direct visualization)"
      },
      {
        "label": "Corpus",
        "value": "4 sentences, 62-word vocabulary"
      },
      {
        "label": "Training",
        "value": "200 epochs, LR 0.01"
      },
      {
        "label": "CBOW loss",
        "value": "0.7"
      },
      {
        "label": "Skip-gram loss",
        "value": "2.7"
      }
    ]
  },
  {
    "slug": "voice-tutoring-prototype",
    "category": "Application engineering",
    "title": "Voice tutoring prototype",
    "summary": "A conversational learning interface connecting React to Vapi voice sessions with Deepgram speech recognition, GPT-4 dialogue, and ElevenLabs speech synthesis. Transcripts are rendered live and session metadata is stored in Supabase.",
    "role": "Frontend and integration developer",
    "stack": [
      "React",
      "Vapi",
      "GPT-4",
      "Deepgram",
      "ElevenLabs",
      "Supabase",
      "Clerk"
    ],
    "status": "Private prototype · 2025",
    "lead": "I built the frontend voice tutor interface, connecting WebRTC audio streams to a conversational AI pipeline: Deepgram handles speech recognition, GPT-4 generates dialogue responses, and ElevenLabs synthesizes the spoken reply. Session metadata and transcripts are persisted in Supabase.",
    "problem": "A voice-based tutor needs real-time audio processing, natural conversation flow, and persistent session history. The interface must handle speech-state transitions (listening, thinking, speaking), render live transcripts as the conversation progresses, and store completed sessions for review.",
    "decisions": [
      {
        "title": "Route audio through Vapi’s managed pipeline",
        "body": "Vapi orchestrates the voice pipeline: WebRTC audio capture, Deepgram speech-to-text, GPT-4 dialogue generation, and ElevenLabs text-to-speech. The React frontend manages connection state, renders live transcript events, and provides speech-state feedback (visual indicators for listening, processing, and speaking phases)."
      },
      {
        "title": "Persist sessions with Supabase and Clerk",
        "body": "Each tutoring session’s metadata—duration, tutor configuration, and final transcript—is stored in Supabase. Clerk handles user authentication, linking sessions to authenticated users. Tutor personality and subject configuration are set before each session begins."
      }
    ],
    "outcome": "The prototype supports configurable voice tutoring sessions with real-time transcript rendering and persistent session history.",
    "limits": "This is a private prototype. The voice pipeline depends entirely on external services (Vapi, Deepgram, GPT-4, ElevenLabs). No latency benchmarks or user testing results are available.",
    "facts": [
      {
        "label": "Speech recognition",
        "value": "Deepgram (via Vapi)"
      },
      {
        "label": "Dialogue",
        "value": "GPT-4"
      },
      {
        "label": "Speech synthesis",
        "value": "ElevenLabs"
      },
      {
        "label": "Auth",
        "value": "Clerk"
      },
      {
        "label": "Storage",
        "value": "Supabase"
      }
    ]
  },
  {
    "slug": "clinical-consultation-workflow",
    "category": "Frontend architecture",
    "title": "e-RCP clinical consultation frontend",
    "summary": "A React interface for multidisciplinary clinical consultations. I owned the frontend architecture and implementation, integrating configurable forms, case views and document handling with the team’s Django REST API.",
    "role": "Frontend architecture and implementation; team-owned backend",
    "stack": [
      "React",
      "JavaScript",
      "REST APIs",
      "Configurable forms"
    ],
    "status": "Private prototype",
    "lead": "I owned the frontend from architecture and design decisions through implementation. The React application supports multidisciplinary case review and configurable consultation forms, integrating with a Django REST backend developed by the team.",
    "problem": "Specialists need to review a case, navigate its documents and complete the right consultation form without losing context. The frontend must translate nested API structures into usable screens and represent loading, validation and access failures clearly.",
    "decisions": [
      {
        "title": "Build the interface around the consultation workflow",
        "body": "Case, meeting and document interfaces share a consistent React application structure. The frontend presents the team’s workflow and integrates its API; server-side authorization and clinical decisions remain backend responsibilities."
      },
      {
        "title": "Render configurable forms instead of duplicating screens",
        "body": "The frontend consumes configurable form structures so consultation types can collect different fields within the same application. Nested data and validation feedback are presentation concerns I implemented in the client."
      },
      {
        "title": "Keep contribution and deployment scope explicit",
        "body": "My responsibility was the frontend architecture and implementation. The private organisational source includes team backend work; it is not republished as my standalone project. Demonstrations should use synthetic patient information."
      }
    ],
    "outcome": "The private project contains the implemented consultation frontend and API integration. The case study reflects my frontend ownership; the backend and its audit mechanisms belong to the wider team.",
    "limits": "Clinical deployment, immutable audit coverage, encryption at rest and regulatory compliance have not been established by this review. Configurable form definitions are not evidence of immutable form versioning. Public demonstrations must use synthetic data.",
    "facts": [
      {
        "label": "My scope",
        "value": "Frontend architecture → implementation"
      },
      {
        "label": "Client",
        "value": "React"
      },
      {
        "label": "Integration",
        "value": "Team Django REST API"
      },
      {
        "label": "Source",
        "value": "Private organisation repository"
      }
    ]
  },
  {
    "slug": "panoriha-advanced",
    "category": "Full-stack systems",
    "title": "Panoriha Advanced",
    "summary": "A private spatial tour management prototype with a NestJS API, Prisma data models, and MinIO object storage for hosting and organizing 3D tour assets.",
    "role": "Full-stack developer",
    "stack": [
      "NestJS",
      "Prisma",
      "MinIO",
      "TypeScript",
      "PostgreSQL"
    ],
    "status": "Private prototype",
    "lead": "I built a tour management backend for organizing and serving spatial tour data—panoramic images, 3D models, and associated metadata—through a NestJS API backed by Prisma ORM and MinIO object storage.",
    "problem": "Managing spatial tour assets requires structured metadata (tour hierarchy, station positions, capture associations), efficient binary storage for large panoramic images and 3D models, and an API that serves both the management interface and the viewer application.",
    "decisions": [
      {
        "title": "Structure tour data with Prisma models",
        "body": "Prisma schema defines the tour hierarchy: tours contain captures, captures contain stations with position and orientation metadata. Relations enforce referential integrity and enable efficient queries for the viewer (e.g., fetching all stations for a given capture with their panorama URLs)."
      },
      {
        "title": "Store binary assets in MinIO",
        "body": "Panoramic images, 3D model files (GLB), and texture atlases are stored in MinIO object storage rather than the database. The NestJS API generates presigned URLs for direct client downloads, keeping large binary transfers off the application server."
      }
    ],
    "outcome": "The prototype serves tour data and binary assets through a typed NestJS API, with Prisma handling relational queries and MinIO handling object storage.",
    "limits": "This is a private prototype. No load testing or production deployment was performed.",
    "facts": [
      {
        "label": "API",
        "value": "NestJS"
      },
      {
        "label": "ORM",
        "value": "Prisma"
      },
      {
        "label": "Object storage",
        "value": "MinIO"
      },
      {
        "label": "Database",
        "value": "PostgreSQL"
      }
    ]
  },
  {
    "slug": "deep-q-learning",
    "repo": "https://github.com/youcef-ach/deep-reinforcement-learning-dqn-benchmarks",
    "category": "Reinforcement learning",
    "title": "Deep Q-learning experiments",
    "summary": "DQN, Double DQN and dueling networks in PyTorch, with 90 archived runs across control, Atari and custom grid environments. The case study reports both successful control policies and unsuccessful experiments.",
    "role": "Academic implementation and experimental study",
    "stack": [
      "Python",
      "PyTorch",
      "Gymnasium",
      "NumPy"
    ],
    "status": "Course project · 2026 · Archived run evidence",
    "lead": "I implemented and compared deep Q-learning variants across CartPole, LunarLander, Pong and TreasureGrid. The project examines how replay, target updates and network structure affect learning, with the original run configurations and evaluation returns retained for inspection.",
    "problem": "A working training loop does not show whether an algorithm learned a reliable policy. The study needs comparable variants, explicit training budgets, multiple seeds and evaluation without exploration noise.",
    "decisions": [
      {
        "title": "Separate algorithm components from the experiment runner",
        "body": "The core contains vector and image Q-networks, replay storage, hard and soft target updates, Double DQN action selection and dueling value/advantage heads. The runner handles training, checkpoints and greedy evaluation; configuration files retain each experiment’s budget."
      },
      {
        "title": "Retain individual runs and aggregate across seeds",
        "body": "The archive contains 90 runs: 30 environment/variant configurations, three training seeds each and 20 greedy evaluation episodes per run. The summary reports the mean and sample standard deviation across the three seed means, not confidence intervals."
      },
      {
        "title": "Correct conclusions when the saved results disagree",
        "body": "The historical report’s TreasureGrid narrative claimed 100% success. The original result files contradict it: configuration means range from 0% to 11.7%. The corrected results table preserves those failures, and the original report remains labelled as a historical submission."
      }
    ],
    "outcome": "All 90 archived files pass provenance, evaluation-count and stored-mean checks. Five tests exercise the actual core implementation. Control performance varies with the configuration; Pong stays near −21 return, and TreasureGrid remains weak under the recorded budgets.",
    "limits": "The full training study was not rerun for this presentation release, and model checkpoints are not distributed. Three seeds provide limited evidence about variability. No claim of state-of-the-art performance or a solved Pong policy is made.",
    "facts": [
      {
        "label": "Archived runs",
        "value": "90"
      },
      {
        "label": "Configurations",
        "value": "30"
      },
      {
        "label": "Training seeds",
        "value": "3 per configuration"
      },
      {
        "label": "Evaluation",
        "value": "20 greedy episodes per run"
      }
    ]
  },
  {
    "slug": "majara-frontend",
    "category": "Frontend platform engineering",
    "title": "Majara frontend platform",
    "summary": "The React and TypeScript frontend for ACS’s community platform: discovery, profiles, squads, guilds, quests and bounties. I owned the frontend architecture, design decisions and implementation.",
    "role": "Entire frontend: architecture, decisions and implementation",
    "stack": [
      "React",
      "TypeScript",
      "Vite",
      "TypeBox",
      "XState",
      "Vanilla Extract",
      "pnpm"
    ],
    "status": "Private ACS project · 2026",
    "lead": "I designed and implemented the Majara frontend for Advanced Computing Society. The application combines community discovery, member profiles and collaborative challenges, with a shared shell, explicit domain contracts and a separate Go backend maintained by the team.",
    "problem": "A growing community application needs consistent navigation and state handling across several domains. Adding a feature should not duplicate routing state, couple UI components to transport details or make optional plugins a requirement for the core application.",
    "decisions": [
      {
        "title": "Give each route one owner",
        "body": "A canonical RouteMatch and world registry determine route ownership and navigation. A separate composition map resolves routes to lazy-loaded React pages. The current source assigns discovery and maps to Discover, profiles and teams to Base, and quests and bounties to Playground; Academy and Horizon have no implemented landing route."
      },
      {
        "title": "Separate contracts, transport and presentation",
        "body": "TypeBox schemas define and validate API payloads. Domain-specific transports handle requests, application layers coordinate state and map responses, and presentational components render view models. Boundary tests inspect actual imports to protect these dependencies."
      },
      {
        "title": "Model session behaviour explicitly",
        "body": "XState represents session and application transitions. The client integrates Ory Kratos browser flows through the configured proxy, including CSRF fields and validation feedback. Regression tests call the actual auth service with failed network responses to check that an unavailable service does not create a synthetic authenticated identity."
      },
      {
        "title": "Keep the core usable without optional plugins",
        "body": "Platform packages define themes, layout and extension contracts independently of domain features. Plugin lifecycle and package boundaries are explicit. This is a web SPA architecture; a mobile container strategy is not evidence of a released native application."
      }
    ],
    "outcome": "Implemented a shared application shell with domain-specific interfaces, validated API contracts, canonical navigation and explicit session state. Tests import the production route and authentication modules. My contribution covers the frontend architecture and implementation; the backend belongs to the wider team.",
    "limits": "The delivered scope is a web SPA. Academy and Horizon remain reserved domains without implemented landing routes. Runtime performance, accessibility and full cross-device behaviour need dedicated measurement; the architecture’s budgets are targets rather than published field results.",
    "facts": [
      {
        "label": "My scope",
        "value": "Frontend architecture → implementation"
      },
      {
        "label": "Organisation",
        "value": "Advanced Computing Society"
      },
      {
        "label": "Core product domains",
        "value": "Discover · Base · Playground"
      },
      {
        "label": "Delivery",
        "value": "React / TypeScript web SPA"
      }
    ]
  }
];

export const community = [
  { image: 'media/evidence/welcome_day_vp_poster.webp', width: 1440, height: 1440, eyebrow: 'INGENIUMS \u00b7 2023\u20132024', title: 'Vice president, INGENIUMS', body: 'Led the INGENIUMS club executive board at ESI-SBA. Coordinated technical programs, co-organized events with Transformatek, and spoke to incoming students at Welcome Day.', alt: 'Youcef Achouri on the INGENIUMS vice president poster for Welcome Day' },
  { image: 'media/evidence/ingeneer_first_demo.webp', width: 1080, height: 608, eyebrow: 'Project demonstrations', title: 'Demonstrating projects', body: 'Explained student engineering projects to visitors at Ingeneer 1.0 and ESI Showcase 7.0, answering questions from students, professionals and faculty.', alt: 'Youcef explaining a project to visitors at the Ingeneer 1.0 demo table' },
  { image: 'media/evidence/ingeneer_second_ceremony.webp', width: 1200, height: 836, eyebrow: 'Event organization', title: 'Running technical events', body: 'Supported Ingeneer, Ingecode and LC Hack as vice president. At Ingeneer 2.0 I helped present prizes to the winning teams alongside Transformatek.', alt: 'Award presentation to a winning team at the Ingeneer 2.0 ceremony' },
  { image: 'media/evidence/ingehack_youth_center.webp', width: 1440, height: 1152, eyebrow: 'Ingehack \u00b7 Maison de Jeunes', title: 'Hackathons beyond campus', body: 'Co-organized Ingehack at Maison de Jeunes Abderrahmane Laala in Algiers, bringing ESI-SBA\u2019s hackathon format to the local youth center community.', alt: 'Youcef smiling with his vice president badge at the Ingehack event at Maison de Jeunes' },
  { image: 'media/evidence/amazigh_day_director.webp', width: 1439, height: 1151, eyebrow: 'Amazigh Day 6.0 \u00b7 ESI-SBA', title: 'Celebrating cultural diversity', body: 'Invited students from different Amazigh regions to present their culture in dedicated stands. Accompanied the school director to present the regional cultural exhibits to invited personalities.', alt: 'Youcef with the school director at Amazigh Day 6.0, presenting the cultural stands' },
  { image: 'media/evidence/art_manchour_exhibition.webp', width: 1080, height: 1080, eyebrow: 'Art Manchour 2.0 \u00b7 ESI-SBA', title: 'Supporting the arts community', body: 'Contacted and invited artists, coordinated the event as vice president, and accompanied school leaders and invited personalities through the exhibition.', alt: 'An artist presenting work to students at Art Manchour 2.0' },
  { image: 'media/evidence/youth_center_stem_1.webp', width: 1200, height: 900, eyebrow: 'Community computing \u00b7 Algiers', title: 'Learning with the community', body: 'Took part in computing activities at Maison de Jeunes Abderrahmane Laala in Algiers, working alongside local students on technical challenges.', alt: 'Participants working at laptops at the youth center in Algiers' },
];

export const awards = [
  { title: 'DevFest Hackathon', year: '2023', result: '2nd place', detail: 'Team Infinity \u00b7 GDG Sidi Bel Abb\u00e8s', image: 'media/evidence/dev_fest_team.webp', width: 720, height: 721 },
  { title: 'NCS Hack 3.0', year: '2026', result: '3rd place', detail: 'Team Spooka \u00b7 NiT Computer Society Club', image: 'media/evidence/ncs_hack_spooka_poster.webp', width: 3277, height: 4096, projectSlug: 'operations-intelligence-hub' },
  { title: 'ForsaTIC Hackathon', year: '2024', result: 'Participant', detail: 'ESI-SBA delegation \u00b7 ENSIA, Algiers', image: 'media/evidence/forsatik_team.webp', width: 900, height: 1200 },
];

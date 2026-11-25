export interface Project {
  slug: string;
  category: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  status: string;
  repo?: string;
  liveUrl?: { url: string; label: string };
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
    "summary": "An end-to-end industrial digital twin platform unifying combined aerial drone and terrestrial photogrammetry (+2,000 images with Ground Control Points) and terrestrial LiDAR into automated pipelines, paired with a high-performance Three.js inspection viewer.",
    "role": "Partner & Lead Spatial Systems Engineer — acquisition, processing pipeline, 3D viewer, backend",
    "stack": [
      "COLMAP",
      "3DGS",
      "DUSt3R / VGGSfM",
      "VGGT",
      "MapAnything",
      "Agisoft Metashape",
      "RealityScan",
      "QGIS",
      "Three.js",
      "Python"
    ],
    "status": "Private platform · Partner · March 2026 – Present",
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
        "1:02–1:13 · The recording reports 104 behavioural tests for the earlier isolated checkpoint."
      ]
    },
    "lead": "As Partner & Lead Spatial Systems Engineer at Azurid, I engineered the end-to-end pipeline connecting field sensor capture with browser-based inspection. My work bridges physical acquisition (terrestrial LiDAR and +2,000-image combined drone and terrestrial photogrammetry with Ground Control Points), scripted CLI processing automation, and an interactive Three.js viewer with a NestJS backend—complemented by technical evaluation and exploratory studies into 3D foundation models (DUSt3R, VGGSfM, VGGT, MapAnything) and 3D Gaussian Splatting (3DGS).",
    "context": "Industrial site inspection requires fusing multi-scale capture sources: Matterport Pro3 LiDAR for dense, millimeter-accurate interior point clouds, and a combination of DJI Mini 3 drone imagery and terrestrial close-range camera photographs (+2,000 images with Ground Control Points) for complex exterior structures and terrain. My role encompasses the entire pipeline: physical acquisition, georeferenced alignment in Metashape and RealityScan, scripted CLI automation, geospatial verification in QGIS, asset optimization (E57, 3D Tiles, KTX2), and exploratory evaluation of neural representations (3DGS) and feed-forward geometric models (DUSt3R, VGGSfM, VGGT, MapAnything).",
    "problem": "An inspection viewer needs consistent geometry and station poses, capture-scoped imagery, and a recovery path when a panorama fails to load. Measurements also require a qualified coordinate frame.",
    "decisions": [
      {
        "title": "Mastering field acquisition and GCP placement across drone and terrestrial captures",
        "body": "Throwing imagery into photogrammetry software often fails on industrial sites due to repetitive metallic textures, scale discrepancies between aerial and ground viewpoints, specular glare, or sharp geometry changes. Experiencing alignment drift and reconstruction gaps firsthand in Agisoft Metashape and RealityScan created an essential feedback loop: it taught me how to bridge drone overview flights with handheld terrestrial camera angles, maintain consistent multi-angle overlap across scales, and strategically distribute Ground Control Points (GCPs) across terrain rather than clustering them. This field-informed acquisition ensures robust bundle adjustment and millimeter-level georeferenced accuracy."
      },
      {
        "title": "Automating photogrammetric pipelines via Python CLI and QGIS",
        "body": "To scale beyond manual GUI processing, I scripted CLI workflows in Metashape and RealityScan to automate tie-point extraction, bundle adjustment, and dense cloud reconstruction. The pipeline automatically exports georeferenced digital terrain/surface models (DTM/DSM), orthomosaics, and 3D Tiles. Output layers are validated in QGIS for coordinate reference system (CRS) accuracy and elevation integrity before ingestion."
      },
      {
        "title": "Evaluating feed-forward 3D foundation models (DUSt3R, VGGSfM, VGGT, MapAnything) and 3DGS",
        "body": "Classical SfM and MVS pipelines (COLMAP, Metashape) depend heavily on handcrafted feature matching and incremental bundle adjustment, which scale slowly on textureless metal or sparse overlaps. Alongside running classical photogrammetry in production, I conducted technical study and lightweight exploratory tests across sample geometries using 3D Gaussian Splatting (3DGS) and recent feed-forward 3D foundation models—DUSt3R, VGGSfM, VGGT, and MapAnything—to analyze pose-free pointmap regression, metric scale recovery, and sparse-view convergence trade-offs."
      },
      {
        "title": "Prepare spatial inputs for the viewer",
        "body": "Separate station poses and panoramas from the mesh. The preparation code expects posed imagery and an aligned mesh, with MatterPak serving as a possible mesh input. It records frame provenance without qualifying the frame for measurements."
      },
      {
        "title": "Scope texture lookups and recover from navigation failures",
        "body": "The KTX2 texture cache is keyed on (captureId, stationId) rather than stationId alone, preventing cross-capture texture leaks when two captures share station identifiers. When a panorama upload fails or a station transition is interrupted, the viewer resets its transition state and releases pending GPU resource leases (WebGL textures and buffers), so the next navigation attempt starts clean."
      },
      {
        "title": "Validate coordinate frames before reporting measurements",
        "body": "The earlier recording shows measurement disabled for an unqualified frame. The newer R5 descriptor explicitly marks the frame unknown and leaves navigation available."
      },
      {
        "title": "Refuse stale preparation checkpoints",
        "body": "Resume checks bind a job to its input bytes, including station metadata and consumed panorama files. A regression reproduced acceptance of changed files at the same paths; the correction rejects those changes and allows an unchanged retry. These checks use synthetic files and do not establish conversion quality."
      }
    ],
    "outcome": "The platform and automated pipeline are fully operational end-to-end. The system reliably processes multi-scale photogrammetry (+2,000 images with Ground Control Points) and terrestrial LiDAR scans, automatically generating georeferenced DTM/DSM elevation models, orthomosaics, and 3D Tiles verified in QGIS. The Three.js viewer delivers responsive station-to-station navigation, panoramic inspection, altitude and slope heatmaps, metric spatial measurements, and GPU-cached texture streaming backed by NestJS and MinIO. To protect commercial client confidentiality, public portfolio demonstrations feature a synthetic industrial inspection environment.",
    "limits": "The primary technical constraint is local GPU compute capacity and VRAM budget. While the classical photogrammetry and browser delivery pipelines run at 100% operational scale, training or fine-tuning deep feed-forward foundation models (DUSt3R, VGGSfM, VGGT, MapAnything) and dense 3D Gaussian Splatting across thousands of 20MP industrial images rapidly exceeds workstation hardware limits. Experimental exploration was therefore focused on sample geometries, pre-trained weights, and trade-off analysis rather than full quantitative dataset benchmarks. Scaling these neural reconstruction architectures on university or host GPU clusters is the core objective of my PFE internship.",
    "facts": [
      {
        "label": "Pipeline status",
        "value": "End-to-end operational & verified"
      },
      {
        "label": "Photogrammetry scale",
        "value": "+2,000 images · drone & terrestrial"
      },
      {
        "label": "Georeferencing",
        "value": "Ground Control Points (GCPs)"
      },
      {
        "label": "Processing & GIS",
        "value": "Scripted CLI · Metashape · RealityScan · QGIS"
      },
      {
        "label": "Neural 3D exploration",
        "value": "3DGS · DUSt3R · VGGSfM · VGGT · MapAnything"
      },
      {
        "label": "Public demonstration",
        "value": "Synthetic scene (live captures pending)"
      }
    ]
  },
  {
    "slug": "stethospeech-silent-speech",
    "category": "Deep Learning Research & Bio-signals",
    "title": "StethoSpeech research adaptation",
    "summary": "A PyTorch research adaptation of StethoSpeech: mapping non-audible murmur (NAM) contact-microphone bio-signals to 768-dimensional self-supervised HuBERT representations using a 19.7M-parameter Transformer encoder. Evaluated on 1,133 held-out utterances.",
    "role": "Independent deep learning researcher",
    "stack": [
      "PyTorch",
      "HuBERT Base (L12)",
      "Transformer",
      "AdamW",
      "librosa",
      "Python"
    ],
    "status": "4th-Year Deep Learning Research Project · ESI-SBA · 2026",
    "repo": "https://github.com/youcef-ach/stethospeech-nam-reproduction",
    "evidenceImages": [
      {
        "path": "media/evidence/stethospeech_baseline.svg",
        "alt": "Phase 4A 6-layer Transformer encoder architecture mapping 768-dim HuBERT representations (19.7M parameters, 0.23171 test MAE)",
        "caption": "Phase 4A baseline architecture · 19.7M params · 0.23171 MAE on 1,133 held-out utterances",
        "width": 850,
        "height": 480
      },
      {
        "path": "media/evidence/stethospeech_fft.svg",
        "alt": "Phase 4B FastSpeech2-derived Feed-Forward Transformer architecture feeding Meta AI Unit HiFi-GAN vocoder",
        "caption": "Phase 4B experimental FFT architecture & Unit HiFi-GAN vocoder chain · CTC projection head decoupled from executed loss",
        "width": 920,
        "height": 540
      }
    ],
    "lead": "Developed as a 4th-year Deep Learning research project at ESI-SBA, I adapted the core self-supervised representation mapping framework from Shah et al.’s StethoSpeech (IMWUT 2024). I designed and trained a 19.7M-parameter Transformer encoder that translates non-audible murmur (NAM) captured by neck contact microphones into continuous 768-dimensional speech representations from frozen HuBERT Base layer 12.",
    "context": "Non-audible murmur (NAM) captures silent articulatory speech movements using a specialized contact microphone placed on the speaker's neck, bypassing airborne acoustic degradation. Rather than predicting raw acoustic waveforms directly from noisy bio-signals, modern speech research maps bio-signals to rich self-supervised representations (HuBERT). The target representations are extracted from TTS-generated reference audio aligned with target transcripts across 11,323 matched pairs.",
    "problem": "Murmur recordings suffer from low signal-to-noise ratios, acoustic attenuation, and significant temporal drift compared to standard airborne speech. Directly optimizing an audio vocoder is unstable. The challenge is learning a stable non-linear mapping from raw sensor signals to high-dimensional latent acoustic representations (HuBERT) while properly handling sequence length discrepancies and establishing rigorous, leakage-free evaluation protocols.",
    "decisions": [
      {
        "title": "Extract paired representations with frozen HuBERT Base",
        "body": "I extract layer 12 features from both NAM recordings and TTS-generated target audio using frozen HuBERT Base (768-dimensional). A Transformer encoder predicts the target feature sequence. Linear interpolation aligns predicted and target frame counts for masked L1 loss calculation, focusing the loss strictly on latent representation alignment."
      },
      {
        "title": "Train a 19.7M-parameter Transformer encoder",
        "body": "The baseline architecture uses a 6-layer Transformer encoder (d_model=512, 8 attention heads, 2048-dim FFN, dropout 0.1) with linear input/output projections between the 768-dim HuBERT space and the 512-dim model space. Training ran for 45 epochs using masked L1 loss with AdamW (LR 1e-4, batch 32), gradient clipping at norm 1.0, and ReduceLROnPlateau scheduling. The optimal checkpoint was selected at epoch 35 based on validation performance."
      },
      {
        "title": "Evaluate on held-out utterances with rigorous protocol",
        "body": "The dataset contains 11,323 matched NAM/transcript-derived speech pairs. The closed-speaker split holds out 1,133 utterances entirely from training. The resulting Mean Absolute Error (MAE) measures feature prediction fidelity in that setting, establishing a reproducible numerical baseline."
      }
    ],
    "outcome": "The trained 19.7M-parameter Transformer achieved a Mean Absolute Error (MAE) of 0.23171 on 1,133 held-out test utterances. The model successfully learns the latent projection from contact bio-signals into HuBERT representation space, demonstrating reproducible optimization dynamics and stable convergence across 45 epochs.",
    "limits": "The benchmark measures feature-level representation reconstruction (HuBERT layer 12 MAE) rather than end-to-end perceptual speech intelligibility (Word Error Rate via ASR or PESQ/STOI). Ground-truth target speech was synthesized via TTS. Open-speaker evaluation on unseen individuals remains to be tested.",
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
    "category": "Spatial AI & 3D Scene Understanding",
    "title": "Virtual staging on 3D scans",
    "summary": "A semantic digital twin pipeline for 3D scans: transforming Matterport Pro3 LiDAR E57 geometry into WebGPU frames, combining Mask2Former semantic segmentation with SAM boundary refinement, and rendering real-time occlusion in Babylon.js.",
    "role": "Spatial vision pipeline architect — LiDAR processing, foundation models, WebGPU integration",
    "stack": [
      "Matterport Pro3 LiDAR",
      "E57",
      "Mask2Former",
      "SAM",
      "PyTorch",
      "Babylon.js",
      "WebGPU",
      "Python",
      "FastAPI"
    ],
    "status": "Research prototype · 2026 · Synthetic public demo",
    "demo": {
      "path": "demos/virtual-staging/",
      "note": "Interactive furniture placement in a synthetic room. "
    },
    "evidenceImages": [
      {
        "path": "media/virtual-staging/real-view.webp",
        "alt": "Equirectangular panorama from the Matterport Pro3 official public sample property",
        "caption": "Matterport Pro3 official public sample panorama ('Two-story home including facade') processed by the E57 ingestion stage",
        "width": 1920,
        "height": 1021
      },
      {
        "path": "media/virtual-staging/scan_0_densified_diagnostic.webp",
        "alt": "Six-face cubemap depth densification masks and graduated confidence overlays across ±X, ±Y, ±Z faces",
        "caption": "Cubemap six-face depth densification mask & graduated confidence diagnostic overlay (Scan 0)",
        "width": 1920,
        "height": 427
      }
    ],
    "lead": "I built an offline scene-understanding and semantic digital twin pipeline connecting physical LiDAR scans with WebGPU rendering. Ingesting Matterport Pro3 E57 point clouds, the system applies Mask2Former and Segment Anything (SAM) for automated semantic segmentation and extracts depth-writing occlusion meshes for real-time virtual object interaction in Babylon.js.",
    "context": "Matterport Pro3 is a high-precision terrestrial LiDAR scanner. Its E57 exports contain dense point clouds, scan poses, and spherical panoramic imagery. Creating an interactive semantic digital twin requires relating these registered inputs to neural foundation models and browser graphics: transforming scanner-native Z-up coordinates into WebGPU conventions, segmenting structural architectural elements, and generating depth meshes for realistic physical occlusion.",
    "problem": "A raw 3D scan provides dense geometry, but lacks semantic understanding—a computer cannot tell a doorway from a supporting pillar or a floor from a ceiling. Furthermore, placing virtual objects into a scanned environment requires exact metric alignment, real-time depth occlusion (so real walls occlude virtual objects behind them), and clean semantic boundaries that classical geometric filters cannot produce reliably.",
    "decisions": [
      {
        "title": "Maintain one metric coordinate frame across modalities",
        "body": "At ingestion, the pipeline applies a rotation matrix to convert the E57 scan’s Z-up coordinate system and camera extrinsics to Babylon.js’s Y-up convention, preserving the scan origin. All subsequent geometry, camera poses, and virtual objects share this single metric frame, eliminating spatial drift between point clouds, panoramic rasters, and WebGPU geometry."
      },
      {
        "title": "Hierarchical semantic segmentation with Mask2Former + SAM",
        "body": "Mask2Former (Swin-T backbone, trained on the ADE20K dataset with 150 classes) performs dense semantic segmentation on perspective panorama faces, mapping pixels into seven structural classes: floor, wall, ceiling, window, door, furniture, and other. Bounding boxes around structural elements then prompt Segment Anything (SAM ViT-B) for sub-pixel boundary refinement. An automated IoU overlap gate (threshold 0.30) filters out spurious proposals."
      },
      {
        "title": "Verify spatial openings with 3D ray casting and depth",
        "body": "The offline pipeline includes ray intersections against candidate wall planes and mesh-derived depth checks to reject openings blocked by nearer geometry. The retained sample run validates segmentation fidelity, structural boundary adherence, and spatial coordinate transforms."
      },
      {
        "title": "Composite photographic panoramas with depth-writing occlusion meshes",
        "body": "Babylon.js composites the high-resolution photographic panorama with a depth-writing mesh derived from the LiDAR scan and separately lit glTF 3D models. The depth-write mesh ensures virtual objects rest accurately on physical floor planes and correctly disappear behind foreground structural obstacles."
      }
    ],
    "outcome": "The end-to-end spatial digital twin pipeline automatically extracts semantic structure from high-density Matterport Pro3 LiDAR scans and panoramic captures. Through hierarchical Mask2Former segmentation and SAM boundary refinement (IoU overlap gate 0.30, mean overlap 0.67), instance boundaries are mapped with sub-pixel fidelity. In Babylon.js and WebGPU, extracted depth-writing meshes accurately handle real-time physical occlusions for interactive spatial object staging. Public demonstration uses synthetic room geometry to protect proprietary scan data.",
    "limits": "Quantitative boundary metric verification was established with SAM proposals passing the IoU overlap gate; continuous benchmarking against large-scale manually annotated ground-truth architectural masks is in progress. Public demonstration uses synthetic room geometry to protect proprietary customer scan data.",
    "facts": [
      {
        "label": "Geometry source",
        "value": "Matterport Pro3 LiDAR (E57)"
      },
      {
        "label": "Vision models",
        "value": "Mask2Former (Swin-T) + SAM (ViT-B)"
      },
      {
        "label": "Structural classes",
        "value": "7"
      },
      {
        "label": "SAM proposals accepted",
        "value": "8 of 9 (mean IoU 0.67)"
      },
      {
        "label": "Overlap threshold",
        "value": "0.30"
      },
      {
        "label": "Boundary refinement",
        "value": "2,907 / 409,600 px (0.71%)"
      }
    ]
  },
  {
    "slug": "operations-intelligence-hub",
    "category": "Agent orchestration",
    "title": "Enterprise Operations Intelligence Hub",
    "summary": "A multi-agent orchestration platform that routes complex operational incidents to specialized LangGraph agents (HR, Finance, Security) and reconciles conflicting decisions into unified executive briefs. Adapted for NCS Hack 3.0, winning 3rd place out of 25 teams.",
    "role": "AI agent architect and orchestration lead",
    "stack": [
      "LangGraph",
      "Claude",
      "Python",
      "FastAPI",
      "JSON"
    ],
    "status": "NCS Hack 3.0 (3rd place of 25 teams) · June 2026",
    "repo": "https://github.com/youcef-ach/ncs-hack-operations-intelligence-hub",
    "lead": "In a 4-person engineering team, I architected and implemented the multi-agent orchestration system for the Enterprise Operations Intelligence Hub. Developed prior to the competition and tailored to the NCS Hack 3.0 challenge, the system won 3rd place among 25 teams. I designed the LangGraph state machine, conditional department routing, synthesis reconciliation engine, and deterministic execution mode.",
    "context": "Enterprise incidents rarely affect a single domain: an operational crisis impacts HR, finance, and security policies simultaneously. We developed this platform to coordinate autonomous domain-specific agents, analyze cross-departmental impact, and reconcile policy disagreements before escalating to human leadership.",
    "problem": "An operational incident can involve several departments at once. Each department agent needs enough context to respond independently, and a decision maker needs one consolidated brief that explains the proposed actions and flags where they conflict.",
    "decisions": [
      {
        "title": "Route incidents through a LangGraph state graph",
        "body": "I built a StateGraph with conditional routing to HR, Finance and Security modules. Selected branches receive structured state and converge before reconciliation, making the responsibilities and handoffs inspectable."
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
    "outcome": "The complete multi-agent system was deployed during NCS Hack 3.0 to solve complex multi-department crisis scenarios. Team Spooka placed 3rd out of exactly 25 participating teams. The codebase features full state routing, automated scenario tests, and clean FastAPI endpoints.",
    "limits": "The multi-agent graph orchestration, department routing, and conflict reconciliation logic are complete and fully tested. Downstream enterprise side-effects (e.g., executing live payroll adjustments or altering production firewall policies) are routed through deterministic simulated adapters rather than live enterprise production databases.",
    "facts": [
      {
        "label": "Team result",
        "value": "3rd place of 25 teams"
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
    "role": "Project team lead and Arabic extraction-module developer",
    "stack": [
      "Qwen 2.5 7B",
      "LoRA",
      "Ollama",
      "Python",
      "JSON Schema Draft 7"
    ],
    "status": "4th-Year Multidisciplinary Project · Institutional Partner · Feb–May 2026",
    "repo": "https://github.com/youcef-ach/arabic-structured-llm-extractor",
    "evidenceImages": [
      {
        "path": "media/evidence/planmilt_tactical_canvas.webp",
        "alt": "PlanMilt DZ Arabic RTL GIS map centered on synthetic Sidi Bel Abbès sector with NATO APP-6 symbology",
        "caption": "PlanMilt DZ RTL Arabic tactical GIS canvas with NATO APP-6 symbology (synthetic Sidi Bel Abbès scenario)",
        "width": 1440,
        "height": 900
      },
      {
        "path": "media/evidence/planmilt_arabic_command.webp",
        "alt": "Arabic LLM command input modal executing structured extraction on synthetic scenarios",
        "caption": "Arabic natural-language command panel feeding local Qwen 2.5 7B structured schema extraction",
        "width": 1440,
        "height": 900
      },
      {
        "path": "media/evidence/planmilt_synthetic_demo.webp",
        "alt": "Validated JSON entities rendered on the synthetic GIS canvas",
        "caption": "Draft 7 schema-validated entities rendered automatically onto map layers",
        "width": 1440,
        "height": 900
      }
    ],
    "lead": "Developed as the 4th-year Multidisciplinary Engineering Project (Projet Pluridisciplinaire) at ESI-SBA, I led and supervised the AI engineering team developing PlanMilt DZ in collaboration with an institutional partner from February to May 2026. Alongside team coordination, I fine-tuned Qwen 2.5 7B via LoRA on the partner's 24GB VRAM GPU workstation with confidential domain datasets, and built the standalone Ollama structured extraction module with recursive Draft 7 JSON Schema validation.",
    "context": "PlanMilt DZ was developed in collaboration with an institutional partner. We conducted on-site visits, and the partner supplied a 24GB VRAM GPU workstation for the team’s model fine-tuning (LoRA) on proprietary Arabic datasets (those confidential weights and data remain institutional property). My open-source repository isolates the Arabic extraction module linking natural-language instructions to structured GIS layers via local Ollama inference and recursive Draft 7 JSON Schema contracts (supporting 3 top-level entity classes, 6 hierarchical unit levels, and 4 affiliation classes).",
    "problem": "Arabic operational instructions are natural to read but difficult to turn into predictable application inputs. A language model can suggest a structured representation, but its response might be malformed JSON, omit required fields, or include unexpected types. The application needs a reliable contract that rejects invalid structures before they reach the GIS business logic.",
    "decisions": [
      {
        "title": "Fine-tune via LoRA and run inference locally with Qwen 2.5 7B",
        "body": "The team fine-tuned Qwen 2.5 7B using LoRA on the partner's 24GB VRAM GPU on confidential domain data. The Python extraction module calls the model through Ollama with domain-engineered system prompts and structured output constraints. Local execution guarantees that confidential operational data never leaves institutional hardware."
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
    "title": "Neural network from scratch in NumPy",
    "summary": "A two-layer MNIST digit classifier (784 → 128 → 10) built entirely from scratch by hand using raw NumPy matrix operations—forward propagation, softmax activation, cross-entropy loss, and hand-derived analytical backpropagation gradients—with zero automatic differentiation or deep learning frameworks. Reproducible 5-seed evaluation on the public baseline.",
    "role": "Independent implementation from scratch by hand",
    "stack": [
      "Python",
      "NumPy",
      "MNIST"
    ],
    "status": "Public code",
    "repo": "https://github.com/youcef-ach/training-mlp-from-scratch-lab",
    "lead": "I implemented a two-layer dense neural network entirely from scratch by hand in pure NumPy to master the mathematical foundations that automatic differentiation libraries normally abstract away. Every operation—forward propagation, softmax activation, cross-entropy loss computation, analytical multivariable calculus gradient derivation, and mini-batch SGD weight updates—is coded by hand using explicit matrix algebra without any autograd engine.",
    "context": "This project strips away modern framework abstractions to expose raw mathematical mechanics. The bias-free network architecture is 784 input pixels → 128 hidden units (ReLU activation) → 10 output classes (softmax), trained with mini-batch SGD (learning rate 0.01, batch size 64, 10 epochs). Weights are initialized from N(0, 0.3). The fundamental derivation combines softmax with categorical cross-entropy loss, simplifying the output error gradient analytically to (p − y), which is then propagated backward through the hidden layer and the ReLU activation derivative by hand using the multivariable chain rule.",
    "problem": "Calling framework APIs like PyTorch or TensorFlow conceals which tensors are cached, how backpropagation traverses each computational node, and where numerical precision degrades. Building the network from scratch by hand makes every matrix dimension, forward activation, and analytical gradient transparent and verifiable.",
    "decisions": [
      {
        "title": "Vectorize forward operations by hand in NumPy",
        "body": "The model processes mini-batches as 2D matrices. Affine transformations (Z₁ = X·W₁, Z₂ = A₁·W₂), element-wise ReLU activation gating, and numerically stabilized softmax probabilities are implemented from scratch using primitive NumPy array operations, ensuring execution speed and memory efficiency without framework shortcuts."
      },
      {
        "title": "Derive analytical backpropagation gradients by hand",
        "body": "Rather than relying on automatic differentiation (torch.autograd), I derived the exact analytical gradients using multivariable calculus: dW₂ = (A₁ᵀ·dZ₂) / m and dW₁ = (Xᵀ·dZ₁) / m, where dZ₁ = (dZ₂·W₂ᵀ) ⊙ (Z₁ > 0). Central finite-difference gradient checks on test inputs confirm exact mathematical agreement with relative numerical error below 6.2e-10."
      },
      {
        "title": "Document the evaluation protocol",
        "body": "The public baseline separates training (50k), validation (10k), and test (10k) splits. Seeds, learning rate, batch size, and the number of test images consumed by the batch loop are documented in the README. The 9,984 consumed images (vs. 10,000) reflect the final mini-batch truncation at the chosen batch size."
      }
    ],
    "outcome": "The hand-implemented NumPy baseline achieves 91.62% mean test accuracy with a standard deviation of 0.23 percentage points across five random seeds on 9,984 MNIST test images. The repository includes 18 unit tests verifying matrix dimensions, gradient correctness, and the manual training loop.",
    "limits": "The repository documents separate experiment protocols. The 91.62% number describes only the public baseline under its stated setup. No comparison to a framework-based baseline or published MNIST benchmarks is included in the case study. A separately evaluated local branch achieved higher accuracy but is not part of the public baseline.",
    "facts": [
      {
        "label": "Implementation",
        "value": "100% from scratch by hand (Zero autograd)"
      },
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
    "category": "NLP & Transformer foundations",
    "title": "Neural translation architectures from scratch",
    "summary": "An architecture lab implementing four sequence-to-sequence translation models entirely from scratch by hand in PyTorch—BiLSTM encoder–decoder, Bahdanau additive attention, decoder-only causal Transformer, and full encoder–decoder Transformer with cross-attention—writing custom scaled dot-product attention, causal masks, and position encodings with zero pre-built nn.Transformer modules.",
    "role": "Independent architecture implementation from scratch by hand",
    "stack": [
      "PyTorch (basic tensor math)",
      "Attention mechanisms",
      "Transformers",
      "LSTM",
      "Gensim",
      "Python"
    ],
    "status": "4th-Year NLP Capstone Project · ESI-SBA · Public code",
    "repo": "https://github.com/youcef-ach/english-to-frensh-translation-model",
    "lead": "Built as a 4th-year Natural Language Processing (NLP) capstone project at ESI-SBA, I implemented four foundational translation architectures entirely from scratch by hand in PyTorch without using any high-level sequence libraries or nn.Transformer modules. Designed to trace the architectural evolution of neural sequence modeling, each model is coded from tensor primitives: a recurrent BiLSTM baseline, Bahdanau additive attention, a causal decoder-only Transformer, and a complete encoder–decoder Transformer with multi-head cross-attention.",
    "context": "The Tatoeba English–French dataset (fra.txt, ~34.5 MB, 239,189 sentence pairs) provides the reference corpus. Tokenization is word-level via Gensim, with punctuation mapped to explicit tokens and a vocabulary of 49,654 words built from the full corpus. Special tokens (PAD, SOS, EOS, UNK) anchor the sequence boundaries.",
    "problem": "Calling black-box abstractions like torch.nn.Transformer or Hugging Face modules conceals how attention weights are computed, how causal masking enforces autoregressive ordering, and how cross-attention queries exchange information with encoder keys and values. Understanding these mechanics requires hand-coding every projection, normalization step, and mask from basic tensor arithmetic.",
    "decisions": [
      {
        "title": "Implement recurrent baseline from scratch",
        "body": "The first notebook implements a bidirectional LSTM encoder (hidden size 256) with packed sequences and a unidirectional LSTM decoder (hidden size 512) initialized from concatenated forward and backward encoder states. FP16 mixed precision and gradient clipping are included, isolating the bottleneck of compressing an entire sequence into a single fixed-length vector."
      },
      {
        "title": "Code Bahdanau additive attention by hand",
        "body": "Rather than using pre-packaged attention layers, I coded a custom attention module computing alignment scores from tensor operations: score = vᵀ tanh(W[hidden; encoder_outputs]). The context vector is concatenated with decoder embeddings at each auto-regressive step. Source padding positions are masked with −∞ prior to softmax, and teacher forcing is dynamically scheduled from 1.0 down to 0.5 across epochs."
      },
      {
        "title": "Build full Transformer architectures from scratch by hand",
        "body": "I built the complete Transformer architecture from basic PyTorch tensor operations with zero nn.Transformer or nn.MultiheadAttention calls. The implementation includes custom scaled dot-product attention (Q·Kᵀ/√d_k), lower-triangular causal attention masking, multi-head linear split/merge projections, LayerNorm, residual connections, and position-wise Feed-Forward Networks (d → 4d → d). The fourth notebook implements a full encoder–decoder Transformer (3 encoder layers, 3 decoder layers) pairing bidirectional self-attention with causal decoder self-attention and cross-attention, driving an autoregressive greedy decoding loop from SOS to EOS."
      }
    ],
    "outcome": "All four hand-coded architectures compile, execute, and train cleanly. The custom Bahdanau attention model reduced training loss from 10.80 to 1.47 over 5 smoke-test epochs. The custom from-scratch encoder–decoder Transformer converged to loss 0.000572 on a synthetic sentence pair in 10 epochs. Automated unit tests rigorously verify tensor shapes, attention weight normalization (summing to 1.0), padding masking, and causal lower-triangular mask enforcement.",
    "limits": "This is an architectural lab built from scratch to study sequence mechanics, not a competitive production translation engine. Tokenization is word-level (no subword BPE/SentencePiece) and the full 239k Tatoeba corpus was not trained to convergence due to compute limits, so no published BLEU benchmarks are claimed.",
    "facts": [
      {
        "label": "Implementation",
        "value": "100% from scratch by hand (no nn.Transformer)"
      },
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
        "value": "PyTorch (basic tensor primitives)"
      }
    ]
  },
  {
    "slug": "word2vec-from-scratch",
    "category": "Machine learning foundations",
    "title": "Word2Vec from scratch",
    "summary": "Implemented both Continuous Bag-of-Words (CBOW) and Skip-gram algorithms entirely from scratch by hand in PyTorch—without using gensim.models.Word2Vec or pre-packaged embedding packages—to study how context-based objectives shape semantic representations. Uses 2D embedding spaces for direct geometric visualization of vector convergence.",
    "role": "Independent implementation from scratch by hand",
    "stack": [
      "PyTorch (from scratch)",
      "NLTK",
      "Gensim",
      "Python"
    ],
    "status": "Public code",
    "repo": "https://github.com/youcef-ach/word2vec_from_scratch",
    "lead": "I built both fundamental Word2Vec training objectives—Skip-gram and Continuous Bag-of-Words (CBOW)—completely from scratch by hand in PyTorch without using any embedding libraries or gensim.models.Word2Vec. The entire pipeline, from raw text windowing to embedding layer optimization, is hand-coded. The models use 2-dimensional embeddings so that the geometric migration of word vectors during training can be plotted directly without lossy dimensionality reduction.",
    "context": "Word2Vec models learn dense semantic vector spaces by formulating unsupervised text prediction tasks. Skip-gram predicts surrounding context words given a target center word, while CBOW predicts the center word from the average of surrounding context words. Instead of calling high-level embedding packages, this project implements every stage manually: sentence tokenization (NLTK), vocabulary mapping (Gensim corpora.Dictionary), sentence-aware sliding window dataset generation, and linear embedding projection matrices.",
    "problem": "Pre-packaged embedding libraries like Gensim or FastText treat vector training as a black box, hiding how loss optimization actually separates or clusters word vectors in Euclidean space. Building both objectives from scratch by hand reveals the exact gradient dynamics, the impact of context window size, and how distinct objectives organize semantic space.",
    "decisions": [
      {
        "title": "Build sentence-aware sliding window generator by hand",
        "body": "Text is tokenized with NLTK and indexed into an explicit vocabulary with Gensim Dictionary. I hand-coded a sentence-aware sliding window generator (window size = 2, 4 neighbors total) that strictly respects sentence boundaries—preventing cross-sentence context pollution. Training pairs are assembled directly: (center, context) pairs for Skip-gram, and (context_list, center) pairs for CBOW."
      },
      {
        "title": "Train 2D embeddings for direct geometric inspection",
        "body": "Instead of high-dimensional embeddings (e.g. 100D–300D) that require lossy dimensionality reduction like PCA or t-SNE to visualize, I configured both models with 2-dimensional embedding spaces. This allows direct plotting of word vector coordinates (x, y) before and after training, making the geometrical displacement driven by semantic co-occurrence directly visible."
      },
      {
        "title": "Implement and compare both CBOW and Skip-gram from scratch",
        "body": "Both architectures are coded from scratch using basic embedding lookup and linear projection layers trained with cross-entropy loss and Adam/SGD. On the benchmark text corpus, CBOW averaged context embeddings before projecting to vocabulary logits, converging to ~0.7 loss, while Skip-gram independently evaluated each context word, converging to ~2.7 loss."
      }
    ],
    "outcome": "Both hand-implemented objectives run, train, and produce 2D embedding coordinates that can be visually tracked from random initialization to converged semantic positions. The project provides an inspectable, transparent demonstration of representation learning from first principles.",
    "limits": "Built as an educational deep-dive from scratch on a small corpus (62 unique tokens). It uses full softmax rather than negative sampling (hierarchical softmax), and does not claim semantic coverage of large web-scale corpora.",
    "facts": [
      {
        "label": "Implementation",
        "value": "100% from scratch by hand (no Word2Vec library)"
      },
      {
        "label": "Architectures",
        "value": "Skip-gram & CBOW (both implemented)"
      },
      {
        "label": "Embedding dim",
        "value": "2D (direct geometric visualization, no PCA/t-SNE)"
      },
      {
        "label": "Pipeline",
        "value": "Hand-crafted sentence-aware windowing"
      },
      {
        "label": "Training",
        "value": "200 epochs, LR 0.01"
      },
      {
        "label": "Framework",
        "value": "PyTorch (basic tensor primitives)"
      }
    ]
  },
  {
    "slug": "voice-tutoring-prototype",
    "category": "Guided learning project",
    "title": "Voice tutoring prototype",
    "summary": "A tutorial-based React learning project integrating Vapi voice sessions, final-transcript display and completed-session metadata in Supabase.",
    "role": "Tutorial-based implementation with subsequent additions",
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
    "lead": "I followed a tutorial to build this voice-tutoring interface and later added features. It connects React to Vapi voice sessions using Deepgram, GPT-4 and ElevenLabs, displays final transcript messages and records user and tutor identifiers when a call ends.",
    "problem": "A voice tutor interface needs to represent connection and speaking states, display what was said, and associate a completed session with the signed-in user.",
    "decisions": [
      {
        "title": "Route audio through Vapi’s managed pipeline",
        "body": "Vapi manages the voice service pipeline. The React client listens for call, speech and final-transcript events, updates connection and speaking state, and removes those event listeners on cleanup. This work integrates managed services; it does not implement the speech models."
      },
      {
        "title": "Record completed sessions separately from live transcripts",
        "body": "The session-completion action stores companion_id and user_id in Supabase. Transcript messages remain in React state for display during the call. The inspected action does not save transcript text or measured session duration. Clerk supplies the authenticated user context."
      }
    ],
    "outcome": "The source implements configurable tutoring sessions, final-transcript display and a completed-session record. A fresh live-service walkthrough has not been verified for this portfolio release.",
    "limits": "The exact additions beyond the tutorial are still being documented, so this remains a secondary learning project. A fresh live-service walkthrough, transcript persistence, measured latency and learning outcomes are not established.",
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
        "label": "Session storage",
        "value": "User and tutor identifiers"
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
    "evidenceImages": [
      {
        "path": "media/evidence/ercp_form.webp",
        "alt": "e-RCP configurable clinical intake form renderer using synthetic records",
        "caption": "Configurable multidisciplinary case intake form · local synthetic demonstration",
        "width": 1264,
        "height": 1496
      },
      {
        "path": "media/evidence/ercp_patient.webp",
        "alt": "Patient details and linked medical cases table in e-RCP React client",
        "caption": "Patient dossier view and linked case list · synthetic sample patient",
        "width": 1264,
        "height": 912
      },
      {
        "path": "media/evidence/ercp_meeting.webp",
        "alt": "Clinical multidisciplinary meeting view in e-RCP",
        "caption": "Scheduled multidisciplinary RCP meeting screen · local read-only preview",
        "width": 1280,
        "height": 720
      }
    ],
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
    "outcome": "A local walkthrough now exercises the implemented patient dossier, case-linked meeting view, configurable form editor and renderer, and a pre-seeded submission. The walkthrough uses invented records and a read-only local API. The existing three schema tests and both normal and demonstration builds passed. My contribution covers the frontend; the Django backend belongs to the team.",
    "limits": "This private prototype is not established as a clinical deployment or a compliant medical system. The walkthrough demonstrates frontend behaviour with simulated responses, not backend persistence, authorization or clinical outcomes. It uses the private development mirror; parity with the organisation repository’s latest revision remains unconfirmed.",
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
    "role": "Independent full-stack developer",
    "stack": [
      "NestJS",
      "Prisma",
      "MinIO",
      "TypeScript",
      "PostgreSQL"
    ],
    "status": "Private prototype",
    "lead": "I designed and built this private spatial-tour prototype using a NestJS API, Prisma and MinIO. Its source separates relational tour records from large panorama, scan and model files.",
    "problem": "A spatial tour needs structured records for its images, scans and annotations, alongside object storage for large files. The management API must connect those records to the uploaded assets.",
    "decisions": [
      {
        "title": "Structure tour data with Prisma models",
        "body": "The Prisma schema defines User, Tour, Panorama, Scan and Tag models. These describe tours and their associated spatial content; the model names differ from the capture/station contract used in the later Azurid viewer."
      },
      {
        "title": "Store binary assets in MinIO",
        "body": "The storage service creates presigned PUT URLs so the client can upload assets directly to MinIO. Tour services return the upload URL and expected storage path. This is an upload mechanism; it does not establish authenticated private downloads."
      }
    ],
    "outcome": "The inspected source contains tour-management services, relational data models and presigned upload preparation. End-to-end viewer playback has not been revalidated for this presentation.",
    "limits": "This is my independent earlier prototype. It has no current public demonstration or load benchmark, and end-to-end viewer playback has not been revalidated. Presigned upload support does not establish private asset delivery.",
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
    "evidenceImages": [
      {
        "path": "media/evidence/majara_discover.webp",
        "alt": "Majara Discover dashboard displaying quest cards and season luminaries using synthetic records",
        "caption": "Discover world, quest feed, and XP progression bar · synthetic preview run",
        "width": 1265,
        "height": 712
      },
      {
        "path": "media/evidence/majara_profile.webp",
        "alt": "Majara Base profile view with telemetry credentials and guild memberships",
        "caption": "Base profile dossier and guild affiliation view · synthetic preview run",
        "width": 1265,
        "height": 712
      }
    ],
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
    "outcome": "The local walkthrough exercises Discover and Followings, client-side quest search and details, and the profile logbook tabs through the implemented frontend. It uses contract-validated synthetic responses. Type checking and all 283 existing tests passed. My contribution covers frontend architecture and implementation; the Go backend belongs to the team.",
    "limits": "This is a web SPA, not a released native application. The walkthrough is read-only and uses synthetic identities and records; it does not verify the Go backend or production authentication. Quest instructions and illustrations include placeholders, and some guild and quest actions remain unfinished. Academy and Horizon have no implemented landing routes. Performance, comprehensive accessibility and cross-device behaviour require further validation.",
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
  },
  {
    "slug": "tourvisto-ai-travel",
    "category": "Full-stack AI web product",
    "title": "Tourvisto AI travel planner",
    "summary": "A full-stack travel agency & AI itinerary planner in React 19, Django REST, Syncfusion charts, and server-side Gemini generation behind JWT authentication.",
    "role": "Full-stack developer — Django REST backend, Gemini API proxy, React dashboard",
    "stack": [
      "React 19",
      "Django REST Framework",
      "SimpleJWT",
      "Gemini API",
      "Ant Design",
      "Syncfusion"
    ],
    "status": "Public code · Live frontend · 2025–2026",
    "repo": "https://github.com/youcef-ach/touristic-agency-dashboard",
    "liveUrl": {
      "url": "https://touristic-agency-dashboard.vercel.app",
      "label": "Open live frontend"
    },
    "evidenceImages": [
      {
        "path": "media/evidence/tourvisto_overview.webp",
        "alt": "Tourvisto travel agency platform hero and admin analytics dashboard preview",
        "caption": "Tourvisto travel agency frontend & analytics dashboard overview",
        "width": 1440,
        "height": 416
      }
    ],
    "lead": "I built Tourvisto end-to-end as a full-stack product combining a Django REST API with a React dashboard and an authenticated AI itinerary generation endpoint backed by Gemini and Unsplash.",
    "problem": "Exposing LLM provider keys on a client SPA leaks credentials, and raw LLM responses often break nested day-by-day database writes if returned unvalidated.",
    "decisions": [
      {
        "title": "Isolate AI keys and validation inside Django REST",
        "body": "The React frontend sends user preferences to POST /trips/generate/ under JWT auth. The Django backend holds GEMINI_API_KEY and UNSPLASH_ACCESS_KEY server-side, bounds duration (1–21 days), validates JSON structure, and saves trip/day/activity records atomically."
      },
      {
        "title": "Pair consumer booking views with admin telemetry charts",
        "body": "The client implements both a public trip explorer and an admin dashboard built with Syncfusion grids/charts and Ant Design controls."
      }
    ],
    "outcome": "Full-stack React 19 + Django REST platform supporting account registration, JWT authentication, saved trip browsing, and server-validated itinerary creation.",
    "limits": "Live Gemini generation requires configuring a funded GEMINI_API_KEY in backend environment variables; the hosted Vercel deployment serves the React client.",
    "facts": [
      { "label": "Frontend", "value": "React 19 + Vite + Syncfusion/AntD" },
      { "label": "Backend", "value": "Django REST + SimpleJWT" },
      { "label": "AI boundary", "value": "Server-side Gemini + atomic saves" }
    ]
  },
  {
    "slug": "apple-iphone-3d-showcase",
    "category": "Interactive 3D web graphics",
    "title": "iPhone 15 Pro 3D web experience",
    "summary": "An interactive WebGL showcase built with React 18, Three.js, React Three Fiber, Drei Views, and GSAP ScrollTrigger featuring PBR titanium lighting and dual device form factors.",
    "role": "Frontend 3D & motion developer",
    "stack": [
      "React 18",
      "Three.js r168",
      "React Three Fiber",
      "Drei",
      "GSAP ScrollTrigger",
      "Tailwind CSS"
    ],
    "status": "Public code · Interface study · 2024–2025",
    "repo": "https://github.com/youcef-ach/apple",
    "lead": "Developed early in my React and WebGL progression, this project explores timeline-synchronized 3D hardware presentation in the browser using React Three Fiber, Drei Views, physically based materials (GLB meshes), dynamic Lightformer rigs, and GSAP scroll animations.",
    "problem": "Rendering multiple interactive 3D viewport states synced cleanly with DOM scroll timelines without tearing down WebGL shader contexts or blocking UI interactions.",
    "decisions": [
      {
        "title": "Decouple dual Drei Views under a shared R3F Canvas",
        "body": "Instead of spinning up separate WebGL contexts per size variant (6.1-inch and 6.7-inch), shared Canvas portaling renders both models smoothly while keeping React controls responsive."
      },
      {
        "title": "Harden keyboard accessibility and telemetry gating",
        "body": "Refactored finish swatches and size selectors to semantic accessible buttons with visible keyboard focus states, and gated optional Sentry tracing behind explicit configuration flags."
      }
    ],
    "outcome": "Interactive 3D product scene supporting multi-finish material switching, size transitions, video carousel state, and responsive Tailwind styling.",
    "limits": "Unofficial interface study using third-party showcase assets for WebGL/GSAP practice; included Node checks cover config constants rather than WebGL frame-rates.",
    "facts": [
      { "label": "3D stack", "value": "Three.js r168 + React Three Fiber" },
      { "label": "Animation", "value": "GSAP ScrollTrigger timelines" },
      { "label": "Follow-up", "value": "ARIA controls & opt-in telemetry" }
    ]
  }
];

export const community = [
  { image: 'media/evidence/welcome_day_speaking.webp', width: 1080, height: 1080, eyebrow: 'INGENIUMS \u00b7 2024\u20132025', title: 'Elected Vice President & Season Kickoff', body: 'Elected Vice President leading 100+ active members at ESI-SBA. Established the annual roadmap across 10 major technical and cultural events, and launched the season addressing incoming students on Welcome Day.', alt: 'Youcef Achouri speaking on stage at Welcome Day' },
  { image: 'media/evidence/lc_hack_team.webp', width: 1080, height: 1080, eyebrow: 'Internal Hackathon \u00b7 ESI-SBA', title: 'LCHack Campus Sprint', body: 'Organized a high-tempo internal hackathon for ESI-SBA engineering students, creating intensive problem-solving tracks to foster rapid software prototyping and algorithmic collaboration.', alt: 'Youcef Achouri with the club leadership team at LCHack' },
  { image: 'media/evidence/ingecode_sponsor_ceo.webp', width: 1440, height: 1440, eyebrow: 'Industry Partnership \u00b7 Algorithmic Contest', title: 'IngeCode & DC Security Partnership', body: 'Secured corporate sponsorship with the CEO of DC Security, providing industry exposure for student competitors and awarding top algorithmic problem solvers.', alt: 'Youcef Achouri in discussion with the CEO of DC Security at IngeCode' },
  { image: 'media/evidence/amazigh_day_director.webp', width: 1439, height: 1151, eyebrow: 'Campus Heritage \u00b7 Leadership', title: 'Amazigh Day with School Leadership', body: 'Represented the student body before university administration, guiding the School Director and visiting personalities through regional cultural exhibits and stands.', alt: 'Youcef Achouri accompanying the school director at Amazigh Day 6.0' },
  { image: 'media/evidence/ingehack_youth_center.webp', width: 1440, height: 1152, eyebrow: 'National Hackathon \u00b7 Algiers', title: 'IngeHack at Maison de Jeunes', body: 'Led the first INGENIUMS generation to conduct a national hackathon in Algiers at Maison de Jeunes Abderrahmane La\u00e2la; managed inter-wilaya logistics, school rector approvals, and hosted Ministry of Youth representatives.', alt: 'Youcef smiling with his vice president badge at the Ingehack event at Maison de Jeunes' },
  { image: 'media/evidence/ingeneer_second_board.webp', width: 1440, height: 1152, eyebrow: 'Flagship Innovation Fair', title: 'Ingeneer 2.0 Exhibition', body: 'Directed ESI-SBA\u2019s annual flagship engineering competition with Transformatek; oversaw jury panels, student project exhibitions, and the final award ceremony\u2014capping 10 events across the mandate.', alt: 'Youcef Achouri with the INGENIUMS executive board and event manager at Ingeneer 2.0' },
  { image: 'media/evidence/alphabit_workshop.webp', width: 1440, height: 960, eyebrow: 'Technical Speaker & Instructor', title: 'Conducting Developer Workshops', body: 'Regularly conduct hands-on software workshops and developer sessions for engineering students, recently delivering a technical workshop with Alphabit Club at ESI-SBA.', alt: 'Youcef Achouri conducting a technical developer workshop' },
  { image: 'media/evidence/abderrahmane_laala_platform.webp', width: 1440, height: 1080, eyebrow: 'Civic Tech \u00b7 Algiers', title: 'National Youth Platform Collaboration', body: 'Collaborating with Maison de Jeunes Abderrahmane La\u00e2la in Algiers on an upcoming national youth digital platform across multiple working sessions; contributed to Afrobot, Jisr Noumouw, and Sahra Tech.', alt: 'Team working session for the youth platform project at Maison de Jeunes Abderrahmane Laala' },
  { image: 'media/evidence/ingeneer_first_demo.webp', width: 1080, height: 608, eyebrow: 'Learning Community \u00b7 2023\u20132024', title: 'Bootcamps & Project Demonstrations', body: 'Organized full-day LC bootcamps and invited industry mentors; demonstrated student engineering projects to faculty and external guests at Ingeneer 1.0 and ESI Showcase.', alt: 'Youcef explaining a project to visitors at the Ingeneer 1.0 demo table' },
  { image: 'media/evidence/art_manchour_exhibition.webp', width: 1080, height: 1080, eyebrow: 'Campus Culture & Arts', title: 'Art Manchour Exhibition', body: 'Contacted and invited artists, coordinated the event as vice president, and accompanied school leaders and invited personalities through the exhibition.', alt: 'An artist presenting work to students at Art Manchour 2.0' },
];

export const awards = [
  { title: 'DevFest Hackathon', year: '2023', result: '2nd place', detail: 'Team Infinity \u00b7 GDG Sidi Bel Abb\u00e8s', image: 'media/evidence/dev_fest_team.webp', width: 720, height: 721 },
  { title: 'NCS Hack 3.0', year: '2026', result: '3rd place', detail: 'Team Spooka (3rd of 25 teams) \u00b7 NiT Computer Society Club', image: 'media/evidence/ncs_hack_spooka_poster.webp', width: 3277, height: 4096, projectSlug: 'operations-intelligence-hub' },
  { title: 'ForsaTIC Hackathon', year: '2024', result: 'Participant', detail: 'ESI-SBA delegation \u00b7 ENSIA, Algiers', image: 'media/evidence/forsatik_team.webp', width: 900, height: 1200 },
];

Overview

Geostationary satellites provide excellent spatial coverage but comparatively low temporal resolution. Rapid atmospheric events — cyclone intensification, thunderstorm development, flash flood evolution, and wildfire smoke propagation — often evolve within minutes, while satellite observations may only be available every 30 minutes.

ASTRA addresses this by generating physically plausible intermediate satellite observations between two consecutive frames.

Unlike conventional interpolation, ASTRA intelligently estimates regional atmospheric complexity and dynamically routes each image patch through the most appropriate engine — lightweight processing for stable regions, high-quality deep learning for complex atmospheric dynamics. This significantly reduces computational overhead while preserving reconstruction quality where it matters most.


ASTRA is a framework, not a single model. Every AI component is modular and replaceable without architectural changes.




Key Capabilities


Adaptive Compute Scheduling — patch-level complexity estimation routes computation intelligently
Dual Interpolation Engines — Shallow U-Net for fast inference, EMA-VFI for high-quality reconstruction
Scientific Output Formats — .h5, .nc, GeoTIFF compatible with existing meteorological workflows
Confidence Maps — per-pixel uncertainty quantification on every generated frame
Validation Reports — SSIM, PSNR, LPIPS, FSIM, MSE computed automatically
Batch Automated Processing — new satellite data triggers the full pipeline without manual intervention
Scientific Dashboard — single-page workstation for timeline visualization, frame comparison, and data export



System Architecture

Satellite Repository
        ↓
  Image Watcher          ← detects new .h5 / .nc arrivals
        ↓
    Validation           ← format, band, metadata checks
        ↓
  Preprocessing          ← normalization, reprojection, band selection
        ↓
  Patch Manager          ← spatial decomposition into patches
        ↓
Thumbnail Generator      ← lightweight thumbnails for complexity model
        ↓
Complexity Estimation    ← CNN estimates interpolation difficulty per region
        ↓
Adaptive Scheduler       ← routes each patch to Fast or Deep engine
        ↓
  Fast Engine            ← Shallow U-Net (low-complexity patches)
  Deep Engine            ← EMA-VFI (medium / high-complexity patches)
        ↓
  Patch Fusion           ← stitch, blend, seam removal
        ↓
Validation Engine        ← SSIM · PSNR · LPIPS · FSIM · MSE
        ↓
     Storage             ← MinIO object storage + PostgreSQL metadata
        ↓
    REST APIs            ← FastAPI gateway
        ↓
    Dashboard            ← React scientific workstation


AI Pipeline

Complexity Estimation Network


Input: Thumbnail pair (Frame A, Frame B)
Output: Complexity heatmap — per-region interpolation difficulty score
Purpose: Avoid applying expensive computation to static or slowly changing regions


Adaptive Scheduler

Complexity LevelEngine AssignedLowFast Engine (Shallow U-Net)MediumDeep Engine (EMA-VFI)HighDeep Engine (EMA-VFI)

Fast Interpolation Engine


Architecture: Shallow U-Net
Target: Low-complexity atmospheric patches
Characteristics: Lightweight, low GPU usage, fast throughput


Deep Interpolation Engine


Architecture: EMA-VFI (Enhanced Motion-Aware Video Frame Interpolation)
Target: Dynamically evolving atmospheric regions
Characteristics: Attention-based, superior temporal reconstruction, preserves atmospheric structures


Patch Fusion


Weighted blending at patch boundaries
Seam removal
Spatial consistency enforcement



Validation

Offline Metrics

MetricDescriptionSSIMStructural similarity indexPSNRPeak signal-to-noise ratio (dB)LPIPSLearned perceptual image patch similarityFSIMFeature similarity indexMSEMean squared error

Online Checks


Confidence estimation per pixel
Temporal consistency verification
Artifact detection


Outputs


validation.json — full metric report per generated frame
confidence_map.png — spatial confidence visualization



Technology Stack

LayerTechnologiesFrontendReact, TailwindCSS, OpenLayers, Chart.js, Three.js, Framer MotionBackendFastAPI, Celery, RedisAI / MLPyTorch, OpenCV, NumPy, Rasterio, xarrayScientific I/Oh5py, netCDF4, GDALStorageMinIO (object), PostgreSQL (metadata)DeploymentDocker, docker-compose


Project Structure

astra-eo/
├── frontend/
│   └── src/
│       ├── components/         # Dashboard section components
│       ├── pages/
│       ├── hooks/
│       ├── services/
│       ├── data/               # Mock data and type definitions
│       └── utils/
│
├── backend/
│   └── app/
│       ├── api/                # Route definitions
│       ├── services/           # Business logic
│       ├── repositories/       # Database / storage layer
│       ├── models/             # ORM models
│       ├── schemas/            # Pydantic schemas
│       ├── scheduler/          # Celery tasks
│       ├── validation/         # Metric computation
│       └── config/
│
├── ai/
│   ├── complexity_model/       # Complexity estimation network
│   ├── fast_engine/            # Shallow U-Net implementation
│   ├── deep_engine/            # EMA-VFI implementation
│   ├── scheduler/              # Adaptive routing logic
│   ├── fusion/                 # Patch stitching and blending
│   ├── validation/             # Offline metric computation
│   ├── training/
│   └── weights/                # Model checkpoints
│
├── docker-compose.yml
├── .env.example
└── docs/
    ├── architecture.md
    ├── api.md
    └── deployment.md


Database Schema

PostgreSQL stores metadata only. Scientific files remain in MinIO object storage.

TablePurposesatellite_frameRaw and processed frame metadata, timestamps, bandsinterpolation_jobJob tracking, status, engine assignmentsgenerated_frameAI-generated frame metadata and storage pathsvalidation_reportPer-frame metric scores and confidence statisticssystem_logPipeline event logging


Storage Structure

MinIO
└── astra/
    ├── raw/
    │   └── INSAT/YYYY/MM/DD/
    ├── processed/
    │   └── INSAT/YYYY/MM/DD/
    └── reports/
        ├── validation/
        └── logs/

Supported formats: .h5 · .nc · .tif (GeoTIFF) · .png · .json


REST API Reference

GroupEndpointDescriptionSatelliteGET /satellite/latestLatest available framesGET /satellite/historyHistorical frame indexTimelineGET /timelineOrdered frame timelineGET /animationAnimation sequence metadataValidationGET /validation/{frame_id}Validation report for a frameGET /confidence/{frame_id}Confidence map pathDownloadsGET /download/h5Download HDF5 fileGET /download/ncDownload NetCDF fileGET /download/geotiffDownload GeoTIFFGET /download/reportDownload validation reportSystemGET /system/statusService health statusGET /jobsActive and completed job queue

All responses follow a consistent envelope:

json{
  "status": "success",
  "message": "Frame retrieved successfully",
  "data": {},
  "metadata": {}
}


Dashboard

Single-page scientific workstation. Sections:


Hero — Mission overview, live status
Live Satellite Timeline — INSAT-3D frame filmstrip with original / AI-generated markers
Frame Comparison — Side-by-side or slider comparison of Frame A → Interpolated → Frame B
Complexity Heatmap — Regional interpolation difficulty visualization
Confidence Map — Per-pixel confidence of generated observations
Validation Metrics — SSIM, PSNR, LPIPS, FSIM, MSE with sparklines
Scientific Downloads — Formatted export panel for all output types
Historical Archive — Searchable interpolation job history
System Status — Live health of all backend services



Development Roadmap

Phase 1 — Infrastructure
  ├── PostgreSQL schema and migrations
  ├── MinIO bucket configuration
  ├── Docker compose setup
  └── FastAPI skeleton + health endpoints

Phase 2 — AI Pipeline
  ├── Complexity Estimation Network
  ├── Adaptive Scheduler
  ├── Shallow U-Net (Fast Engine)
  ├── EMA-VFI integration (Deep Engine)
  ├── Patch Fusion
  └── Validation Engine

Phase 3 — Frontend
  ├── Dashboard shell and layout
  ├── Timeline and frame comparison
  ├── Heatmap and confidence visualization
  └── Downloads and archive

Phase 4 — Integration & Deployment
  ├── End-to-end pipeline testing
  ├── API integration with frontend
  ├── Docker production build
  └── Validation and benchmarking


Supported Inputs

FormatDescription.h5HDF5 scientific satellite data.ncNetCDF4 atmospheric dataGeoTIFFGeoreferenced raster imagery

Required metadata per frame: timestamp, spectral bands, latitude/longitude bounds, spatial resolution.


Target Users

UserUse CaseISRO ScientistsTemporal densification of INSAT-3D imageryIMD MeteorologistsContinuous monitoring of rapid weather eventsDisaster ManagementNear-real-time atmospheric event tracking


Architecture Decisions

DecisionChoiceRationaleProcessing modeBatch onlyPredictable resource allocation, no on-demand latency requirementsFast engineShallow U-NetMinimal GPU overhead for stable regionsDeep engineEMA-VFIState-of-the-art temporal reconstruction with attentionPatch-based processingEnabledAllows per-region complexity routingMetadata storagePostgreSQLRelational queries for job tracking and historyFile storageMinIOS3-compatible, self-hosted, handles large scientific files


The architecture is frozen. Components may be replaced or upgraded but the overall design is fixed.




Contributing

main          ← stable releases
develop       ← integration branch
feature/*     ← new features
fix/*         ← bug fixes


All changes via pull request into develop
Meaningful commit messages required
Every module must be documented
Unit + integration tests required for backend services



License

MIT License — see LICENSE for details.


<div align="center">
ASTRA · Built for Earth Observation · Designed for Science

ISRO · IMD · National Disaster Management Authority

</div>

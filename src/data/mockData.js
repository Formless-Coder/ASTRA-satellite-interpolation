export const navStatus = {
  live: true,
  cpu: '73%',
  gpu: '64%',
  queue: '12 tasks'
}

export const timelineFrames = [
  { id: 'f-01', label: 'T-09:21', type: 'original', time: '11:09:21 UTC' },
  { id: 'f-02', label: 'T-09:32', type: 'ai', time: '11:09:32 UTC' },
  { id: 'f-03', label: 'T-09:44', type: 'original', time: '11:09:44 UTC' },
  { id: 'f-04', label: 'T-09:56', type: 'ai', time: '11:09:56 UTC' },
  { id: 'f-05', label: 'T-10:08', type: 'original', time: '11:10:08 UTC' },
  { id: 'f-06', label: 'T-10:19', type: 'ai', time: '11:10:19 UTC' }
]

export const comparisonFrames = {
  previous: { title: 'Frame A', time: '2026-06-27 11:09:21 UTC', label: 'Original', color: 'blue' },
  interpolated: { title: 'Interpolated', time: '2026-06-27 11:09:28 UTC', label: 'AI Generated', color: 'cyan' },
  next: { title: 'Frame B', time: '2026-06-27 11:09:35 UTC', label: 'Original', color: 'blue' }
}

export const complexityHeat = {
  subtitle: 'Spatial complexity across the scene',
  regions: [
    { name: 'Ocean band', level: 'Low', value: '0.14' },
    { name: 'Cloud deck', level: 'High', value: '0.78' },
    { name: 'Coastal edge', level: 'Medium', value: '0.52' }
  ]
}

export const confidenceMap = {
  subtitle: 'Generation confidence distribution',
  scores: [
    { region: 'Tropics', confidence: '92%' },
    { region: 'Mid-latitude', confidence: '84%' },
    { region: 'Polar cap', confidence: '68%' }
  ]
}

export const validationMetrics = [
  { name: 'SSIM', value: '0.972', trend: [0.93, 0.95, 0.96, 0.97, 0.972], status: 'Good' },
  { name: 'PSNR', value: '39.5', trend: [35.1, 36.7, 38.2, 39.0, 39.5], status: 'Good' },
  { name: 'LPIPS', value: '0.042', trend: [0.055, 0.050, 0.047, 0.044, 0.042], status: 'Acceptable' },
  { name: 'FSIM', value: '0.903', trend: [0.86, 0.88, 0.89, 0.90, 0.903], status: 'Good' },
  { name: 'MSE', value: '11.7', trend: [18.4, 15.2, 13.1, 12.0, 11.7], status: 'Acceptable' }
]

export const downloads = [
  { label: 'HDF5', extension: '.h5', size: '76.4 MB', generated: '2 min ago' },
  { label: 'NetCDF', extension: '.nc', size: '122.8 MB', generated: '4 min ago' },
  { label: 'GeoTIFF', extension: '.tif', size: '512 MB', generated: '9 min ago' },
  { label: 'PNG', extension: '.png', size: '28.2 MB', generated: '12 min ago' },
  { label: 'Report', extension: '.pdf', size: '2.6 MB', generated: '1 min ago' }
]

export const archiveJobs = [
  { date: '2026-06-27', frames: 'T-08:58 → T-09:10', engine: 'ASTRA-V3', score: '0.958', status: 'Complete', download: true },
  { date: '2026-06-27', frames: 'T-09:10 → T-09:22', engine: 'ASTRA-V3', score: '0.963', status: 'Complete', download: true },
  { date: '2026-06-27', frames: 'T-09:22 → T-09:09', engine: 'ASTRA-X1', score: '0.941', status: 'Validation', download: false },
  { date: '2026-06-26', frames: 'T-07:46 → T-07:58', engine: 'ASTRA-V2', score: '0.927', status: 'Complete', download: true }
]

export const serviceHealth = [
  { service: 'Image Watcher', uptime: '99.98%', status: 'healthy' },
  { service: 'Preprocessing', uptime: '99.91%', status: 'healthy' },
  { service: 'AI Inference', uptime: '99.84%', status: 'healthy' },
  { service: 'Validation', uptime: '99.86%', status: 'degraded' },
  { service: 'Storage', uptime: '99.99%', status: 'healthy' },
  { service: 'API', uptime: '99.75%', status: 'degraded' }
]

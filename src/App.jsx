import { motion } from 'framer-motion'
import NavBar from './components/NavBar.jsx'
import HeroSection from './components/HeroSection.jsx'
import TimelineSection from './components/TimelineSection.jsx'
import ComparisonSection from './components/ComparisonSection.jsx'
import ComplexityHeatmap from './components/ComplexityHeatmap.jsx'
import ConfidenceMap from './components/ConfidenceMap.jsx'
import MapPanel from './components/MapPanel.jsx'
import ValidationMetrics from './components/ValidationMetrics.jsx'
import DownloadsPanel from './components/DownloadsPanel.jsx'
import ArchiveSection from './components/ArchiveSection.jsx'
import FooterStatus from './components/FooterStatus.jsx'
import EarthBackdrop from './components/EarthBackdrop.jsx'
import { navStatus, timelineFrames, comparisonFrames, complexityHeat, confidenceMap, validationMetrics, downloads, archiveJobs, serviceHealth } from './data/mockData.js'

const sectionTransition = { duration: 0.6, ease: 'easeOut' }

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg text-slate-100">
      <EarthBackdrop />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 pb-20 pt-6">
        <NavBar status={navStatus} />
        <HeroSection />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={sectionTransition}
          className="mt-10"
        >
          <TimelineSection frames={timelineFrames} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={sectionTransition}
          className="mt-10 grid gap-6 xl:grid-cols-[1.4fr_0.95fr]"
        >
          <ComparisonSection frames={comparisonFrames} />
          <div className="grid gap-6">
            <ComplexityHeatmap data={complexityHeat} />
            <ConfidenceMap data={confidenceMap} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={sectionTransition}
          className="mt-10 grid gap-6 xl:grid-cols-[1fr_0.7fr]"
        >
          <MapPanel />
          <div className="grid gap-6">
            <ValidationMetrics metrics={validationMetrics} />
            <DownloadsPanel items={downloads} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={sectionTransition}
          className="mt-10"
        >
          <ArchiveSection jobs={archiveJobs} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={sectionTransition}
          className="mt-10"
        >
          <FooterStatus services={serviceHealth} />
        </motion.div>
      </div>
    </div>
  )
}

export default App

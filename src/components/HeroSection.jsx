import { motion } from 'framer-motion'
import { Sparkles, Download, Eye } from 'lucide-react'

function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#1E293B] bg-slate-950/80 p-8 shadow-soft backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -right-16 top-16 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>
      <div className="relative flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/20 bg-[#0f172a]/80 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-300"
          >
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Real-time orbital analytics
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-5xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-6xl"
          >
            ADAPTIVE SATELLITE TEMPORAL RESOLUTION
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="mt-6 max-w-xl text-lg leading-8 text-slate-300"
          >
            AI-powered intermediate frame generation for INSAT-3D imagery with confidence mapping, complexity analysis, and archive-grade data exports.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <button className="inline-flex items-center gap-2 rounded-2xl border border-[#3B82F6]/25 bg-[#0f172a]/90 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-slate-900/95">
              <Eye className="h-4 w-4 text-cyan-300" />
              View Latest Frames
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-[#3B82F6]/25 bg-[#11203b]/90 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:border-blue-400/40 hover:bg-slate-900/95">
              <Download className="h-4 w-4 text-blue-300" />
              Download Data
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative hidden h-80 w-full max-w-[520px] rounded-[28px] border border-[#1E293B] bg-slate-950/70 p-5 shadow-glow xl:block"
        >
          <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.1),_transparent_32%)]" />
          <div className="relative grid h-full gap-5">
            <div className="rounded-3xl border border-[#3B82F6]/15 bg-slate-900/70 p-4 text-sm text-slate-300">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Orbital pass</p>
                  <p className="mt-2 text-lg font-semibold text-white">INSAT-3D EWS 12</p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200">Stable</span>
              </div>
            </div>
            <div className="grid gap-3 rounded-3xl border border-[#1E293B] bg-slate-950/70 p-4 text-slate-300">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-slate-500">
                <span>Latest FPS</span>
                <span>202 ms</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[72%] rounded-full bg-cyan-400" />
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-2xl bg-slate-900/80 p-3 text-center">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Quality</p>
                  <p className="mt-2 text-lg font-semibold text-white">98.4%</p>
                </div>
                <div className="rounded-2xl bg-slate-900/80 p-3 text-center">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Confidence</p>
                  <p className="mt-2 text-lg font-semibold text-white">87.1%</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-[#3B82F6]/20 bg-slate-900/80 p-4 text-sm text-slate-300">
              <p className="uppercase tracking-[0.28em] text-cyan-300">Active stream</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-400">Frame queue</span>
                <span className="text-sm font-semibold text-white">8 / 12</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection

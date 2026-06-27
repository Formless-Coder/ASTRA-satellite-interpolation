import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

function FrameCard({ frame, selected }) {
  const palette = frame.type === 'original' ? 'border-blue-500/25 bg-slate-950/80 text-blue-200' : 'border-cyan-400/25 bg-slate-950/80 text-cyan-200'
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`group relative min-w-[210px] cursor-pointer overflow-hidden rounded-[28px] border ${palette} p-4 shadow-soft transition-all duration-300 ${selected ? 'border-cyan-300/50 shadow-glow' : ''}`}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-slate-500">
        <span>{frame.label}</span>
        <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${frame.type === 'original' ? 'bg-blue-500/10 text-blue-200' : 'bg-cyan-400/10 text-cyan-200'}`}>{frame.type === 'original' ? 'Original' : 'AI Generated'}</span>
      </div>
      <div className="mt-5 flex h-32 items-end justify-between rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-[#060b15] p-4 text-white">
        <div>
          <p className="text-2xl font-semibold tracking-tight">{Math.round(Math.random() * 100)}%</p>
          <p className="text-xs text-slate-500">Cloud coverage</p>
        </div>
        <Star className="h-6 w-6 text-slate-500/70" />
      </div>
      <p className="mt-4 text-sm text-slate-400">{frame.time}</p>
    </motion.div>
  )
}

function TimelineSection({ frames }) {
  return (
    <section className="glass-card overflow-hidden rounded-[32px] border border-[#1E293B] p-6 shadow-soft">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Live Satellite Timeline</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Latest pass frames</h2>
        </div>
        <p className="max-w-xl text-sm text-slate-400">Scroll through the latest INSAT-3D frames and compare real captures with AI-generated interpolations.</p>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-2 pr-2">
        {frames.map((frame, idx) => (
          <FrameCard frame={frame} key={frame.id} selected={idx === 1} />
        ))}
      </div>
    </section>
  )
}

export default TimelineSection

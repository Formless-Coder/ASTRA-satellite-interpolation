import { motion } from 'framer-motion'

function ComparisonTile({ frame }) {
  return (
    <div className="glass-card flex flex-col rounded-[28px] border border-[#1E293B] p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{frame.title}</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{frame.label}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${frame.color === 'blue' ? 'bg-blue-500/15 text-blue-200' : 'bg-cyan-400/15 text-cyan-200'}`}>
          {frame.color === 'blue' ? 'Original' : 'AI Generated'}
        </span>
      </div>
      <div className="h-52 rounded-[24px] border border-[#3B82F6]/10 bg-slate-950/95 p-4">
        <div className="flex h-full items-end justify-between rounded-[20px] bg-slate-900/90 p-4">
          <div className="h-[60%] w-full rounded-3xl bg-gradient-to-t from-slate-700 to-[#0f172a]" />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-400">{frame.time}</p>
    </div>
  )
}

function ComparisonSection({ frames }) {
  return (
    <section className="glass-card rounded-[32px] border border-[#1E293B] p-6 shadow-soft">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Frame Comparison</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">A → Interpolated → B</h2>
        </div>
        <p className="max-w-xl text-sm text-slate-400">Inspect generated intermediate frames next to their original temporal neighbors.</p>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <motion.div whileHover={{ y: -6 }}><ComparisonTile frame={frames.previous} /></motion.div>
        <motion.div whileHover={{ y: -6 }}><ComparisonTile frame={frames.interpolated} /></motion.div>
        <motion.div whileHover={{ y: -6 }}><ComparisonTile frame={frames.next} /></motion.div>
      </div>
    </section>
  )
}

export default ComparisonSection

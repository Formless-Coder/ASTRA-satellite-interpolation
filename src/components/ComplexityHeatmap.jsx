import { motion } from 'framer-motion'

function ComplexityHeatmap({ data }) {
  return (
    <section className="glass-card rounded-[32px] border border-[#1E293B] p-6 shadow-soft">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Complexity Heatmap</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Spatial complexity overlay</h2>
        </div>
        <p className="max-w-xl text-sm text-slate-400">Heat intensity mapped across the current scene to identify where interpolation is most difficult.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.35fr]">
        <motion.div whileHover={{ scale: 1.01 }} className="relative overflow-hidden rounded-[28px] border border-[#3B82F6]/10 bg-slate-950/90 p-4">
          <div className="h-[320px] rounded-[26px] border border-[#1E293B] bg-gradient-to-br from-slate-900 via-[#07101d] to-[#061024] p-6">
            <div className="relative h-full rounded-[22px] bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_12%),radial-gradient(circle_at_75%_40%,rgba(6,182,212,0.16),transparent_14%),radial-gradient(circle_at_50%_70%,rgba(147,197,253,0.15),transparent_18%)]">
              <div className="absolute left-8 top-10 h-14 w-14 rounded-full bg-blue-500/10 blur-2xl" />
              <div className="absolute right-12 top-28 h-16 w-16 rounded-full bg-cyan-400/10 blur-2xl" />
              <div className="absolute inset-x-10 bottom-16 h-24 rounded-full bg-blue-400/10 blur-3xl" />
            </div>
          </div>
        </motion.div>

        <div className="space-y-4 rounded-[28px] border border-[#1E293B] bg-slate-950/80 p-5">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Legend</p>
            <div className="grid gap-2">
              <div className="flex items-center justify-between rounded-2xl border border-[#1E293B] bg-slate-900/80 p-3">
                <span className="text-sm text-slate-100">Low complexity</span>
                <span className="text-sm font-semibold text-slate-200">0.12</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-[#1E293B] bg-slate-900/80 p-3">
                <span className="text-sm text-slate-100">Medium complexity</span>
                <span className="text-sm font-semibold text-slate-200">0.56</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-[#1E293B] bg-slate-900/80 p-3">
                <span className="text-sm text-slate-100">High complexity</span>
                <span className="text-sm font-semibold text-slate-200">0.82</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-[24px] bg-slate-900/90 p-4">
            {data.regions.map(region => (
              <div key={region.name} className="rounded-2xl border border-[#0f172a] bg-slate-950/80 p-3 text-sm">
                <div className="flex items-center justify-between text-slate-300">
                  <span>{region.name}</span>
                  <span className="font-semibold text-slate-100">{region.value}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">{region.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComplexityHeatmap

import { motion } from 'framer-motion'

function ConfidenceMap({ data }) {
  return (
    <section className="glass-card rounded-[32px] border border-[#1E293B] p-6 shadow-soft">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Confidence Map</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">AI generation confidence</h2>
        </div>
        <p className="max-w-xl text-sm text-slate-400">Confidence levels for the latest interpolated frames, shown across satellite coverage regions.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.35fr]">
        <motion.div whileHover={{ scale: 1.01 }} className="relative overflow-hidden rounded-[28px] border border-[#06B6D4]/15 bg-slate-950/90 p-4">
          <div className="h-[320px] rounded-[26px] border border-[#1E293B] bg-gradient-to-br from-slate-900 via-[#06121f] to-[#02080e] p-6">
            <div className="relative h-full rounded-[22px] bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.2),transparent_14%),radial-gradient(circle_at_70%_30%,rgba(248,113,113,0.16),transparent_14%),radial-gradient(circle_at_40%_70%,rgba(250,204,21,0.12),transparent_14%)]">
              <div className="absolute left-12 top-14 h-14 w-14 rounded-full bg-emerald-400/10 blur-2xl" />
              <div className="absolute right-14 top-24 h-16 w-16 rounded-full bg-rose-500/10 blur-2xl" />
              <div className="absolute inset-x-10 bottom-14 h-20 rounded-full bg-amber-400/10 blur-3xl" />
            </div>
          </div>
        </motion.div>

        <div className="space-y-4 rounded-[28px] border border-[#1E293B] bg-slate-950/80 p-5">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Confidence range</p>
            <div className="rounded-3xl border border-[#0f172a] bg-slate-900/90 p-4 text-sm text-slate-300">
              <div className="flex items-center justify-between text-slate-400">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
              <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="w-[18%] bg-red-500" />
                <div className="w-[32%] bg-yellow-400" />
                <div className="w-[50%] bg-emerald-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-[24px] bg-slate-900/90 p-4">
            {data.scores.map(entry => (
              <div key={entry.region} className="rounded-2xl border border-[#0f172a] bg-slate-950/80 p-3 text-sm">
                <div className="flex items-center justify-between text-slate-300">
                  <span>{entry.region}</span>
                  <span className="font-semibold text-slate-100">{entry.confidence}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">Confidence score for generated frame region</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConfidenceMap

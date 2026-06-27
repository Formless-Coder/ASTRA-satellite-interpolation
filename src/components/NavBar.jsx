import { Satellite } from 'lucide-react'

function StatusChip({ label, value }) {
  return (
    <div className="flex items-center space-x-2 rounded-2xl border border-[#1E293B] bg-slate-950/70 px-3 py-2 text-xs text-slate-300 shadow-sm">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold text-slate-100">{value}</span>
    </div>
  )
}

function NavBar({ status }) {
  return (
    <header className="flex flex-col gap-6 rounded-[32px] border border-[#1E293B] bg-slate-950/80 px-6 py-5 shadow-soft backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4 text-slate-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl border border-[#3B82F6]/20 bg-slate-900/70 shadow-glow">
          <Satellite className="h-6 w-6 text-[#3B82F6]" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">ASTRA</p>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Adaptive Temporal Dashboard</h1>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 text-center lg:text-left">
        <div className="inline-flex items-center gap-3 rounded-full border border-[#3B82F6]/20 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 shadow-glow">
          <span className="flex h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 shadow-glow"></span>
          <span className="font-medium tracking-[0.12em] text-slate-100">LIVE</span>
        </div>
        <p className="max-w-xl text-sm text-slate-400">Satellite frame ingestion is active. Intermediate frame generation pipeline is processing the latest INSAT-3D pass.</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <StatusChip label="CPU" value={status.cpu} />
        <StatusChip label="GPU" value={status.gpu} />
        <StatusChip label="Queue" value={status.queue} />
      </div>
    </header>
  )
}

export default NavBar

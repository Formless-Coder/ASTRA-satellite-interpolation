import { Download, ShieldCheck, ArrowUpRight } from 'lucide-react'

function Badge({ status }) {
  const colors = {
    Complete: 'bg-emerald-500/10 text-emerald-300',
    Validation: 'bg-amber-500/10 text-amber-300'
  }
  return (
    <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${colors[status] || 'bg-slate-700/50 text-slate-300'}`}>{status}</span>
  )
}

function ArchiveSection({ jobs }) {
  return (
    <section className="glass-card rounded-[32px] border border-[#1E293B] p-6 shadow-soft">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Historical Archive</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Past interpolation jobs</h2>
        </div>
        <p className="max-w-xl text-sm text-slate-400">Review previously generated frames, engine versions, validation quality, and archive-ready downloads.</p>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-[#1E293B] bg-slate-950/80">
        <div className="grid grid-cols-6 gap-4 border-b border-[#1E293B] px-6 py-4 text-xs uppercase tracking-[0.3em] text-slate-500">
          <span>Date</span>
          <span>Frame Pair</span>
          <span>Engine Used</span>
          <span>Validation Score</span>
          <span>Status</span>
          <span>Download</span>
        </div>
        <div className="space-y-1 px-6 py-4">
          {jobs.map(job => (
            <div key={job.date + job.frames} className="grid grid-cols-6 gap-4 rounded-3xl border border-[#0f172a] bg-slate-900/75 p-4 text-sm text-slate-200 shadow-sm">
              <span>{job.date}</span>
              <span>{job.frames}</span>
              <span>{job.engine}</span>
              <span>{job.score}</span>
              <span><Badge status={job.status} /></span>
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#3B82F6]/20 bg-[#0f172a]/90 px-3 py-2 text-xs font-semibold text-cyan-200 transition hover:border-cyan-300/40 hover:bg-slate-900/95" disabled={!job.download}>
                <Download className="h-4 w-4" />
                {job.download ? 'Save' : 'Pending'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ArchiveSection

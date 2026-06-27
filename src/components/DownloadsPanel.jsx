import { DownloadCloud, FileText, Layers } from 'lucide-react'

function DownloadsPanel({ items }) {
  return (
    <section className="glass-card rounded-[32px] border border-[#1E293B] p-6 shadow-soft">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Scientific Downloads</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Export data products</h2>
        <p className="mt-2 max-w-xl text-sm text-slate-400">Download engineered outputs in modeling-ready formats or snapshot reports for offline review.</p>
      </div>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.extension} className="grid gap-4 rounded-[26px] border border-[#1E293B] bg-slate-950/80 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900/90 text-blue-300 shadow-glow">
                {item.extension === '.pdf' ? <FileText className="h-5 w-5" /> : <DownloadCloud className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{item.label} <span className="text-slate-500">{item.extension}</span></p>
                <p className="mt-1 text-xs text-slate-500">{item.size} · Generated {item.generated}</p>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-[#3B82F6]/20 bg-[#0f172a]/90 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300/40 hover:bg-slate-900/95">
              <Layers className="h-4 w-4 text-cyan-300" />
              Download
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DownloadsPanel

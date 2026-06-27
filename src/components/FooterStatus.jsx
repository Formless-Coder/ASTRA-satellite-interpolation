import { CircleDot } from 'lucide-react'

function StatusDot({ status }) {
  const color = status === 'healthy' ? 'bg-emerald-400' : status === 'degraded' ? 'bg-amber-400' : 'bg-rose-400'
  return <span className={`inline-block h-3 w-3 rounded-full ${color}`} />
}

function FooterStatus({ services }) {
  return (
    <section className="glass-card rounded-[32px] border border-[#1E293B] p-6 shadow-soft">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">System Status</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Service health grid</h2>
        </div>
        <p className="max-w-xl text-sm text-slate-400">Cluster health for the ASTRA pipeline, from ingestion to storage.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {services.map(service => (
          <div key={service.service} className="glass-card rounded-[24px] border border-[#1E293B] bg-slate-950/80 p-4 shadow-soft transition hover:-translate-y-1">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">{service.service}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{service.uptime}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusDot status={service.status} />
                <span className="text-xs uppercase tracking-[0.28em] text-slate-500">{service.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FooterStatus

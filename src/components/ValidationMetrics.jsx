import { motion } from 'framer-motion'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

function metricStatusColor(status) {
  if (status === 'Good') return 'text-emerald-300 bg-emerald-500/10'
  if (status === 'Acceptable') return 'text-amber-300 bg-amber-500/10'
  return 'text-rose-300 bg-rose-500/10'
}

function metricChartData(trend) {
  return {
    labels: trend.map((_, index) => index + 1),
    datasets: [
      {
        data: trend,
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(59,130,246,0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 0
      }
    ]
  }
}

function metricChartOptions() {
  return {
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    maintainAspectRatio: false,
    responsive: true,
    elements: { line: { borderWidth: 2 } }
  }
}

function ValidationMetrics({ metrics }) {
  return (
    <section className="glass-card rounded-[32px] border border-[#1E293B] p-6 shadow-soft">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Validation Metrics</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Model fidelity diagnostics</h2>
        </div>
        <p className="max-w-xl text-sm text-slate-400">Track how AI-generated frames compare against source images using standard scientific metrics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map(metric => (
          <motion.div whileHover={{ y: -6 }} key={metric.name} className="glass-card rounded-[28px] border border-[#1E293B] bg-slate-950/80 p-5 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500">{metric.name}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${metricStatusColor(metric.status)}`}>{metric.status}</span>
            </div>
            <div className="mt-5 h-24">
              <Line data={metricChartData(metric.trend)} options={metricChartOptions()} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default ValidationMetrics

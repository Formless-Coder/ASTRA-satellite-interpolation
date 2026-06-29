function SatelliteViewer({ frames = [], selectedFrame, onFrameSelect }) {
  const selectedId = selectedFrame?.id

  return (
    <div className="space-y-6">
      <div className="text-xs uppercase tracking-[0.35em] text-slate-400">Orbital Feed</div>

      <div className="relative overflow-hidden rounded-[2rem] border border-[#1e293b] bg-[#0a0f1a] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.04),_transparent_35%),linear-gradient(rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[length:100%_100%,100%_5px] opacity-30 pointer-events-none" />

        <div className="border-l-4 border-cyan-400/90 p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="text-lg font-semibold text-white">INSAT-3D</div>
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
              <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
              LIVE
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { label: 'ORBITAL ALT', value: '35,786 KM' },
              { label: 'INCLINATION', value: '0.05°' },
              { label: 'PERIOD', value: '23H 56M' },
              { label: 'SIGNAL', value: '98.4%' },
              { label: 'BAND', value: 'VHRR / CCD' },
              { label: 'PASS', value: 'EWS-12' }
            ].map((item) => (
              <div key={item.label} className="rounded-3xl bg-[#09111f]/80 p-4">
                <p className="text-[10px] uppercase tracking-[0.32em] text-slate-500">{item.label}</p>
                <p className="mt-2 font-mono text-xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 px-6 py-5">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-400">
            <span>SIGNAL STREAM</span>
          </div>
          <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#03101e] px-3 py-4">
            <svg viewBox="0 0 800 140" className="h-28 w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path d="M0 90 Q80 60 160 80 T320 70 T480 85 T640 65 T800 80" fill="none" stroke="url(#waveGradient)" strokeWidth="3" strokeLinecap="round" className="wave-path" />
              <path d="M0 100 Q80 70 160 90 T320 75 T480 95 T640 70 T800 90" fill="none" stroke="#06B6D4" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>
        </div>

        <div className="border-t border-white/5 px-6 py-5">
          <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-400">
            <span>FRAME QUEUE</span>
            <span>8 / 12</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700/70 scrollbar-track-transparent">
            {frames.slice(0, 8).map((frame) => {
              const isSelected = selectedId === frame.id
              const isOriginal = frame.type === 'original'
              const base = 'min-w-[108px] flex-shrink-0 rounded-[999px] border px-4 py-3 transition duration-200'
              const stateClass = isSelected
                ? 'border-cyan-300 bg-[#062b39] shadow-[0_0_0_8px_rgba(6,182,212,0.1)]'
                : isOriginal
                  ? 'border-white/10 bg-white text-slate-950'
                  : 'border-cyan-400/40 bg-transparent text-cyan-300'

              return (
                <button
                  key={frame.id}
                  type="button"
                  onClick={() => onFrameSelect?.(frame.id)}
                  className={`${base} ${stateClass}`}
                >
                  <p className="font-mono text-sm font-semibold uppercase tracking-[0.15em]">{frame.time}</p>
                  <p className={`mt-2 inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold ${isOriginal ? 'bg-slate-900 text-slate-300' : 'border border-cyan-400/50 text-cyan-300'}`}>
                    {frame.type === 'original' ? 'R' : 'AI'}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SatelliteViewer

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Image, Compass } from 'lucide-react'
import MapPanel from '../MapPanel'
import SatelliteViewer from './SatelliteViewer'

function TimelineCard({ frame, isSelected, onSelect }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -6 }}
      className={`relative flex min-w-[220px] flex-col rounded-[2rem] border px-5 py-5 text-left transition ${isSelected ? 'border-cyan-300/40 bg-[#0b1220]' : 'border-white/10 bg-[#070a12]/80'} focus:outline-none`}
      onClick={() => onSelect(frame.id)}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-slate-500">
        <span>{frame.label}</span>
        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${frame.type === 'original' ? 'bg-white/10 text-slate-200' : 'bg-cyan-400/15 text-cyan-200'}`}>
          {frame.type === 'original' ? 'ORIGINAL' : 'AI GENERATED'}
        </span>
      </div>
      <div className="mt-5 flex h-36 items-end justify-between rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-slate-950 via-[#05070f] to-[#02040a] p-4">
        <div>
          <p className="text-2xl font-semibold text-white">{frame.score}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.28em] text-slate-500">{frame.caption}</p>
        </div>
        <Image className="h-6 w-6 text-slate-500/70" />
      </div>
      <p className="mt-4 text-sm text-slate-400">{frame.time}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.32em] text-slate-500">{frame.coverage}</p>
    </motion.button>
  )
}

function TimelineSection({ frames }) {
  const [active, setActive] = useState(frames[0]?.id)
  const selected = useMemo(() => frames.find((item) => item.id === active) || frames[0], [active, frames])

  return (
    <section id="timeline" className="grid gap-10 rounded-[2.5rem] border border-white/10 bg-[#04060b]/90 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] lg:p-8">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Live Timeline</p>
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Live satellite timeline</h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Scroll the most recent INSAT-3D frames with AI-generated interpolations and comparison metadata.
          </p>
          <SatelliteViewer frames={frames} selectedFrame={selected} onFrameSelect={setActive} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-[2rem] border border-white/10 bg-slate-950/80 px-4 py-3 text-sm uppercase tracking-[0.28em] text-slate-400">
            <span>Frame composition</span>
            <span className="text-slate-300">Real-time source pass</span>
          </div>
          <MapPanel />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4 overflow-x-auto pb-2 pr-2 scrollbar-thin scrollbar-thumb-slate-700/80 scrollbar-track-transparent">
          {frames.map((frame) => (
            <TimelineCard key={frame.id} frame={frame} isSelected={active === frame.id} onSelect={setActive} />
          ))}
        </div>

        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-[#070a12]/90 p-6 sm:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Selected frame details</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">{selected.caption}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">{selected.type === 'ai' ? 'AI model interpolation with ensemble confidence metrics.' : 'Original INSAT-3D capture from the current orbital pass.'}</p>
          </div>
          <div className="grid gap-3 rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span className="uppercase tracking-[0.28em] text-slate-500">Timestamp</span>
              <span>{selected.time}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="uppercase tracking-[0.28em] text-slate-500">Frame type</span>
              <span>{selected.type === 'ai' ? 'AI GENERATED' : 'ORIGINAL'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="uppercase tracking-[0.28em] text-slate-500">Cloud coverage</span>
              <span>{selected.coverage.split(' ')[2]}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TimelineSection

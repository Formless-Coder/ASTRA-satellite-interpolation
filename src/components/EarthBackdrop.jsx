function EarthBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.12),_transparent_28%)]" />
      <div className="earth-ambient absolute inset-0" />
      <div className="absolute left-1/2 top-1/2 h-[78vw] w-[78vw] max-h-[980px] max-w-[980px] -translate-x-1/2 -translate-y-1/2">
        <div className="earth-globe absolute inset-0 rounded-full border border-white/10 shadow-[0_0_140px_rgba(6,182,212,0.16)]" />
        <div className="earth-glow absolute inset-[-7%] rounded-full" />
      </div>
    </div>
  )
}

export default EarthBackdrop

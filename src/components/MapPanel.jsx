import { useEffect, useRef } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import 'ol/ol.css'

function MapPanel() {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current) return

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
        maxZoom: 7,
        minZoom: 2
      }),
      controls: []
    })

    return () => map.setTarget(null)
  }, [])

  return (
    <section className="glass-card rounded-[32px] border border-[#1E293B] p-6 shadow-soft">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Map Placeholder</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">OpenLayers viewport</h2>
        </div>
        <p className="max-w-xl text-sm text-slate-400">Interactive geospatial canvas ready for future satellite tile layers and overlays.</p>
      </div>
      <div className="h-[420px] overflow-hidden rounded-[32px] border border-[#1E293B] bg-slate-950/80">
        <div ref={mapRef} className="h-full w-full" />
      </div>
    </section>
  )
}

export default MapPanel

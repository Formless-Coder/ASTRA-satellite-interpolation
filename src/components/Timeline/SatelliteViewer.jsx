import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function createSolarPanelTexture() {
  const width = 512
  const height = 128
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(canvas)

  ctx.fillStyle = '#080808'
  ctx.fillRect(0, 0, width, height)

  const cols = 8
  const rows = 4
  const cellWidth = width / cols
  const cellHeight = height / rows

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      ctx.fillStyle = '#0a0f1a'
      ctx.fillRect(col * cellWidth + 4, row * cellHeight + 4, cellWidth - 8, cellHeight - 8)
    }
  }

  ctx.strokeStyle = '#1a2a3a'
  ctx.lineWidth = 2
  for (let x = 1; x < cols; x += 1) {
    ctx.beginPath()
    ctx.moveTo(x * cellWidth, 0)
    ctx.lineTo(x * cellWidth, height)
    ctx.stroke()
  }
  for (let y = 1; y < rows; y += 1) {
    ctx.beginPath()
    ctx.moveTo(0, y * cellHeight)
    ctx.lineTo(width, y * cellHeight)
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.minFilter = THREE.LinearMipMapLinearFilter
  texture.magFilter = THREE.LinearFilter
  return texture
}

function SatelliteViewer({ frames = [], selectedFrame, onFrameSelect }) {
  const mountRef = useRef(null)
  const selectedId = selectedFrame?.id

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 4.5)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    mount.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0x111122, 0.25)
    const sunLight = new THREE.DirectionalLight(0xfff5e0, 2.2)
    sunLight.position.set(-4, 6, 3)
    const earthLight = new THREE.DirectionalLight(0x2244aa, 0.6)
    earthLight.position.set(2, -4, 1)
    const goldLight = new THREE.PointLight(0xffaa00, 0.4, 5)
    goldLight.position.set(1, 1, 2)

    scene.add(ambient, sunLight, earthLight, goldLight)

    const starGeometry = new THREE.BufferGeometry()
    const starCount = 1000
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i += 1) {
      const radius = 60 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      starPositions[i * 3 + 2] = radius * Math.cos(phi)
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.7 })
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    const satellite = new THREE.Group()
    scene.add(satellite)

    const bodyMaterial = new THREE.MeshStandardMaterial({ color: '#b8860b', metalness: 0.3, roughness: 0.85, emissive: '#3d2a00', emissiveIntensity: 0.2 })
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.7, 0.55), bodyMaterial)
    satellite.add(body)

    const foilColors = ['#c9960c', '#a07808', '#d4a017']
    const foilDepth = 0.02

    const createFoilPatch = ({ width, height, depth, color, roughness, position, rotation }) => {
      const mat = new THREE.MeshStandardMaterial({ color, metalness: 0.4, roughness, emissive: '#3d2a00', emissiveIntensity: 0.08 })
      const patch = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), mat)
      patch.position.set(position.x, position.y, position.z)
      if (rotation) patch.rotation.set(rotation.x || 0, rotation.y || 0, rotation.z || 0)
      satellite.add(patch)
    }

    const foilFaces = [
      { axis: 'z', value: 0.285, rotation: { x: 0 }, direction: 1 },
      { axis: 'z', value: -0.285, rotation: { x: Math.PI }, direction: -1 },
      { axis: 'x', value: 0.285, rotation: { y: Math.PI / 2 }, direction: 1 },
      { axis: 'x', value: -0.285, rotation: { y: -Math.PI / 2 }, direction: -1 },
      { axis: 'y', value: 0.35, rotation: { x: Math.PI / 2 }, direction: 1 },
      { axis: 'y', value: -0.35, rotation: { x: -Math.PI / 2 }, direction: -1 }
    ]

    foilFaces.forEach((face, faceIndex) => {
      for (let i = 0; i < 6; i += 1) {
        const offset = -0.25 + i * 0.1
        const color = foilColors[(faceIndex + i) % foilColors.length]
        const roughness = 0.7 + (i % 3) * 0.1
        const position = { x: 0, y: 0, z: 0 }

        if (face.axis === 'x') {
          position.x = face.value
          position.y = offset
        }
        if (face.axis === 'y') {
          position.y = face.value
          position.x = offset
        }
        if (face.axis === 'z') {
          position.z = face.value
          position.y = offset
        }

        position[face.axis] += face.direction * 0.01

        createFoilPatch({
          width: 0.54,
          height: 0.18,
          depth: foilDepth,
          color,
          roughness,
          position,
          rotation: face.rotation
        })
      }
    })

    const silverPatchMaterial = new THREE.MeshStandardMaterial({ color: '#cccccc', metalness: 0.9, roughness: 0.15 })
    const blackSensorMaterial = new THREE.MeshStandardMaterial({ color: '#000000', metalness: 0.8, roughness: 0.05 })

    const placeDiamondSensor = (x, y, z, rotation) => {
      const patch = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.02), silverPatchMaterial)
      patch.position.set(x, y, z)
      patch.rotation.set(rotation.x || 0, rotation.y || 0, rotation.z || 0)
      satellite.add(patch)

      const sensor = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.025), blackSensorMaterial)
      sensor.position.set(x, y, z + 0.015)
      sensor.rotation.z = Math.PI / 4
      satellite.add(sensor)
    }

    placeDiamondSensor(0.28, 0.18, 0.285, { x: 0 })
    placeDiamondSensor(-0.28, 0.18, 0.285, { x: 0 })
    placeDiamondSensor(0.285, 0.18, 0, { y: Math.PI / 2 })
    placeDiamondSensor(-0.285, 0.18, 0, { y: -Math.PI / 2 })

    const panelMaterial = new THREE.MeshStandardMaterial({ color: '#080808', roughness: 0.4, metalness: 0.5 })
    const panelFrameMaterial = new THREE.MeshStandardMaterial({ color: '#222222', roughness: 0.25, metalness: 0.8 })
    const panelTexture = createSolarPanelTexture()
    const cellMaterial = new THREE.MeshStandardMaterial({ map: panelTexture, roughness: 0.4, metalness: 0.5 })

    const createSolarPanel = (side) => {
      const panelGroup = new THREE.Group()
      const panelPlate = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.02, 0.38), panelMaterial)
      panelPlate.position.set(side * 1.05, 0, 0)
      panelPlate.rotation.z = side * 0.04
      panelGroup.add(panelPlate)

      const panelCells = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 0.35), cellMaterial)
      panelCells.position.set(side * 1.05, 0.015, 0)
      panelCells.rotation.y = side * Math.PI / 2
      panelGroup.add(panelCells)

      const panelFrame = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.04, 0.4), panelFrameMaterial)
      panelFrame.position.set(side * 1.05, 0, 0)
      panelGroup.add(panelFrame)

      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.3), new THREE.MeshStandardMaterial({ color: '#999999', roughness: 0.2, metalness: 0.9 }))
      arm.position.set(side * 0.72, 0, 0)
      arm.rotation.z = Math.PI / 2
      panelGroup.add(arm)

      return panelGroup
    }

    const leftPanel = createSolarPanel(-1)
    const rightPanel = createSolarPanel(1)
    satellite.add(leftPanel)
    satellite.add(rightPanel)

    const createThrusterCluster = (offsetX) => {
      const cluster = new THREE.Group()
      const mount = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.04), new THREE.MeshStandardMaterial({ color: '#333333', metalness: 0.5, roughness: 0.2 }))
      mount.position.set(offsetX, -0.1, 0.29)
      cluster.add(mount)

      const thrusterMat = new THREE.MeshStandardMaterial({ color: '#444455', metalness: 0.8, roughness: 0.3 })
      const offsets = [
        [-0.055, 0.055],
        [0.055, 0.055],
        [-0.055, -0.055],
        [0.055, -0.055]
      ]
      offsets.forEach(([x, y]) => {
        const thruster = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.07, 0.14), thrusterMat)
        thruster.rotation.x = Math.PI / 2
        thruster.position.set(offsetX, -0.1 + y, 0.29 + x)
        cluster.add(thruster)
      })
      satellite.add(cluster)
    }

    createThrusterCluster(-0.25)
    createThrusterCluster(0.25)

    const mainSensor = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.12, 24), new THREE.MeshStandardMaterial({ color: '#111111', roughness: 0.2, metalness: 0.4 }))
    mainSensor.rotation.x = Math.PI / 2
    mainSensor.position.set(0, 0.28, 0.18)
    satellite.add(mainSensor)

    const smallSensor = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.1, 24), new THREE.MeshStandardMaterial({ color: '#111111', roughness: 0.2, metalness: 0.4 }))
    smallSensor.rotation.x = Math.PI / 2
    smallSensor.position.set(0.18, 0.28, 0.12)
    satellite.add(smallSensor)

    const antennaDish = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: '#dddddd', metalness: 0.7, roughness: 0.2 })
    )
    antennaDish.rotation.x = Math.PI
    antennaDish.position.set(-0.18, 0.32, -0.15)
    satellite.add(antennaDish)

    const antennaRod = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.18), new THREE.MeshStandardMaterial({ color: '#999999', metalness: 0.9, roughness: 0.2 }))
    antennaRod.position.set(-0.18, 0.18, -0.08)
    satellite.add(antennaRod)

    const resize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    resize()
    window.addEventListener('resize', resize)

    let frameId = null
    const animate = () => {
      satellite.rotation.y += 0.0035
      satellite.rotation.x = Math.sin(Date.now() * 0.0004) * 0.08
      satellite.position.y = Math.sin(Date.now() * 0.0009) * 0.07
      leftPanel.rotation.z = Math.sin(Date.now() * 0.0003) * 0.06
      rightPanel.rotation.z = -Math.sin(Date.now() * 0.0003) * 0.06
      stars.rotation.y += 0.00008
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (frameId) cancelAnimationFrame(frameId)
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
      scene.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose()
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose())
          } else {
            child.material.dispose()
          }
        }
      })
      renderer.dispose()
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-900 bg-[#050810] px-6 py-6 text-white shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-500/10 bg-[#000000] p-6">
          <div className="relative h-[460px] overflow-hidden rounded-[2rem] bg-[#020815]">
            <div ref={mountRef} className="absolute inset-0" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,113,197,0.08),transparent_30%)]" />
            <div className="pointer-events-none absolute top-5 left-5 h-10 w-10 border-t border-l border-cyan-400/50" />
            <div className="pointer-events-none absolute top-5 right-5 h-10 w-10 border-t border-r border-cyan-400/50" />
            <div className="pointer-events-none absolute bottom-5 left-5 h-10 w-10 border-b border-l border-cyan-400/50" />
            <div className="pointer-events-none absolute bottom-5 right-5 h-10 w-10 border-b border-r border-cyan-400/50" />
            <div className="pointer-events-none absolute left-6 bottom-6 rounded-full border border-cyan-400/20 bg-[#04101c]/80 px-3 py-2 text-xs uppercase tracking-[0.35em] text-cyan-300">
              INSAT-3DS · GSLV-F14
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-pulse-slow {
          animation: pulseSlow 2.4s ease-in-out infinite;
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </div>
  )
}

export default SatelliteViewer

import { useRef } from 'react'
import * as THREE from 'three'
import { useThreeScene, PALETTE } from '../hooks/useThreeScene.js'

/**
 * Red neuronal esférica: 240 nodos en espiral de Fibonacci, conexiones
 * entre vecinos cercanos y un núcleo pulsante. Rotación lenta continua.
 */
export default function NeuralSphere({ className = '' }) {
  const ref = useRef(null)

  useThreeScene(ref, ({ scene, camera }) => {
    camera.position.set(0, 0, 5.4)

    scene.add(new THREE.AmbientLight(PALETTE.mist, 0.4))
    const key = new THREE.PointLight(PALETTE.brand, 20, 0, 1.8)
    key.position.set(3, 3, 4)
    scene.add(key)

    const group = new THREE.Group()
    scene.add(group)

    // Nodos en espiral de Fibonacci
    const COUNT = 240
    const RADIUS = 1.9
    const positions = new Float32Array(COUNT * 3)
    const pts = []
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      const v = new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(RADIUS)
      pts.push(v)
      positions.set([v.x, v.y, v.z], i * 3)
    }

    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const points = new THREE.Points(
      pointsGeo,
      new THREE.PointsMaterial({
        color: PALETTE.haze,
        size: 0.045,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.95,
      })
    )
    group.add(points)

    // Conexiones entre vecinos cercanos
    const linePositions = []
    const MAX_DIST = 0.62
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        if (pts[i].distanceTo(pts[j]) < MAX_DIST) {
          linePositions.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z)
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3))
    const lines = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: PALETTE.brand, transparent: true, opacity: 0.22 })
    )
    group.add(lines)

    // Núcleo pulsante
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0x12142a,
        emissive: PALETTE.brand,
        emissiveIntensity: 0.55,
        metalness: 0.7,
        roughness: 0.3,
      })
    )
    group.add(core)

    const coreWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.62, 1),
      new THREE.MeshBasicMaterial({ color: PALETTE.haze, wireframe: true, transparent: true, opacity: 0.3 })
    )
    group.add(coreWire)

    return (t) => {
      const time = t * 0.001
      group.rotation.y = time * 0.14
      group.rotation.x = Math.sin(time * 0.18) * 0.12
      coreWire.rotation.y = -time * 0.4
      coreWire.rotation.z = time * 0.25
      const pulse = 1 + Math.sin(time * 1.6) * 0.06
      core.scale.setScalar(pulse)
      core.material.emissiveIntensity = 0.45 + Math.sin(time * 1.6) * 0.18
    }
  })

  return <div ref={ref} className={className} aria-hidden="true" />
}

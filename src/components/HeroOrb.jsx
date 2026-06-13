import { useRef } from 'react'
import * as THREE from 'three'
import { useThreeScene, PALETTE } from '../hooks/useThreeScene.js'

/**
 * Gema low-poly flotante con halo de alambre, anillo orbital inclinado y
 * tres satélites. Iluminación en los colores de marca para un acabado
 * metálico violeta sobrio. Parallax sutil con el ratón.
 */
export default function HeroOrb({ className = '' }) {
  const ref = useRef(null)

  useThreeScene(ref, ({ scene, camera, container }) => {
    camera.position.set(0, 0, 6.2)

    // Luces: clave de marca, relleno de apoyo, contra fría
    scene.add(new THREE.AmbientLight(PALETTE.haze, 0.45))
    const key = new THREE.PointLight(PALETTE.brand, 60, 0, 1.8)
    key.position.set(4, 3, 4)
    const fill = new THREE.PointLight(PALETTE.haze, 38, 0, 1.8)
    fill.position.set(-4, -2, 3)
    const rim = new THREE.PointLight(PALETTE.snow, 22, 0, 1.8)
    rim.position.set(0, 4, -4)
    scene.add(key, fill, rim)

    const group = new THREE.Group()
    scene.add(group)

    // Gema central — con color violeta profundo visible
    const gem = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.55, 1),
      new THREE.MeshStandardMaterial({
        color: 0x2a0a6e,
        emissive: 0x1a0550,
        emissiveIntensity: 0.4,
        metalness: 0.85,
        roughness: 0.15,
        flatShading: true,
      })
    )
    group.add(gem)

    // Halo de alambre — más visible
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.78, 1),
      new THREE.MeshBasicMaterial({
        color: PALETTE.brand,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      })
    )
    group.add(wire)

    // Anillo orbital inclinado — más brillante
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.018, 12, 140),
      new THREE.MeshBasicMaterial({ color: PALETTE.haze, transparent: true, opacity: 0.85 })
    )
    ring.rotation.x = Math.PI / 2.45
    ring.rotation.y = 0.35
    group.add(ring)

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.009, 8, 140),
      new THREE.MeshBasicMaterial({ color: PALETTE.brand, transparent: true, opacity: 0.45 })
    )
    ring2.rotation.x = Math.PI / 2.1
    ring2.rotation.y = -0.4
    group.add(ring2)

    // Satélites
    const sats = [0, 1, 2].map((i) => {
      const s = new THREE.Mesh(
        new THREE.SphereGeometry(0.07 - i * 0.015, 16, 16),
        new THREE.MeshStandardMaterial({
          color: i === 0 ? PALETTE.haze : PALETTE.brand,
          emissive: i === 0 ? PALETTE.haze : PALETTE.brand,
          emissiveIntensity: 0.9,
          roughness: 0.4,
        })
      )
      group.add(s)
      return { mesh: s, radius: 2.6 + i * 0.25, speed: 0.32 + i * 0.14, phase: (i * Math.PI * 2) / 3, tilt: i * 0.5 }
    })

    // Parallax con el ratón
    const target = { x: 0, y: 0 }
    const onMove = (e) => {
      const r = container.getBoundingClientRect()
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    return (t) => {
      const time = t * 0.001
      gem.rotation.y = time * 0.18
      gem.rotation.x = Math.sin(time * 0.22) * 0.15
      wire.rotation.y = -time * 0.1
      wire.rotation.z = time * 0.06
      ring.rotation.z = time * 0.12
      ring2.rotation.z = -time * 0.08
      group.position.y = Math.sin(time * 0.6) * 0.12

      sats.forEach(({ mesh, radius, speed, phase, tilt }) => {
        const a = time * speed + phase
        mesh.position.set(
          Math.cos(a) * radius,
          Math.sin(a) * radius * Math.sin(tilt) * 0.5,
          Math.sin(a) * radius * Math.cos(tilt) * 0.4
        )
      })

      // Suavizado del parallax
      group.rotation.y += (target.x * 0.22 - group.rotation.y + time * 0) * 0.04
      group.rotation.x += (target.y * 0.14 - group.rotation.x) * 0.04
    }
  })

  return <div ref={ref} className={className} aria-hidden="true" />
}

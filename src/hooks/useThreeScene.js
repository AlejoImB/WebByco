import { useEffect } from 'react'
import * as THREE from 'three'

/**
 * Monta una escena Three.js en un contenedor con buenas prácticas:
 * - DPR limitado a 2 (rendimiento)
 * - ResizeObserver para tamaño responsivo
 * - El bucle de render se pausa cuando el canvas sale de pantalla
 * - Con prefers-reduced-motion se renderiza UN frame estático (sin bucle)
 * - Limpieza completa de geometrías, materiales y renderer al desmontar
 *
 * @param {React.RefObject<HTMLElement>} containerRef
 * @param {(ctx: {scene, camera, renderer, container}) => (time:number)=>void} setup
 *   Devuelve la función de animación por frame.
 */
export function useThreeScene(containerRef, setup) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height, false)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const animate = setup({ scene, camera, renderer, container }) || (() => {})

    let raf = 0
    let visible = true
    const loop = (t) => {
      raf = requestAnimationFrame(loop)
      animate(t)
      renderer.render(scene, camera)
    }

    if (reduced) {
      // Un único frame estático
      animate(0)
      renderer.render(scene, camera)
    } else {
      const io = new IntersectionObserver(
        ([entry]) => {
          const nowVisible = entry.isIntersecting
          if (nowVisible && !visible) {
            visible = true
            raf = requestAnimationFrame(loop)
          } else if (!nowVisible && visible) {
            visible = false
            cancelAnimationFrame(raf)
          }
        },
        { threshold: 0.02 }
      )
      io.observe(container)
      raf = requestAnimationFrame(loop)
      container._io = io
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      container._io?.disconnect()
      scene.traverse((obj) => {
        obj.geometry?.dispose?.()
        if (obj.material) {
          ;(Array.isArray(obj.material) ? obj.material : [obj.material]).forEach((m) => m.dispose?.())
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export const PALETTE = {
  ink: 0x000807,
  mist: 0xa2a3bb,
  brand: 0x9395d3,
  haze: 0xb3b7ee,
  snow: 0xfbf9ff,
}

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const NS = 'http://www.w3.org/2000/svg'

/** Catmull-Rom -> Bézier para un trazo orgánico que pasa por todos los puntos. */
function smoothPath(pts) {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

const el = (name, attrs = {}, cls) => {
  const n = document.createElementNS(NS, name)
  for (const k in attrs) n.setAttribute(k, attrs[k])
  if (cls) n.setAttribute('class', cls)
  return n
}

/**
 * Columna vertebral generativa.
 * - Un trazo único recorre el documento pasando por el centro de cada [data-spine].
 * - Se dibuja en tiempo real ligado al progreso de scroll; un "cometa" marca la punta.
 * - Cada nodo enciende su anillo + ramificación + etiqueta al ser alcanzado.
 * - Se remide contra el DOM en cada resize / carga de fuentes (se adapta al contenido).
 * - Con prefers-reduced-motion: trazo completo y estático, todos los nodos activos.
 */
export default function Spine() {
  const svgRef = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const svg = svgRef.current

    // Capas persistentes
    const defs = el('defs')
    const grad = el('linearGradient', { id: 'spineGrad', x1: '0', y1: '0', x2: '0', y2: '1' })
    grad.appendChild(el('stop', { offset: '0%', 'stop-color': '#B3B7EE' }))
    grad.appendChild(el('stop', { offset: '50%', 'stop-color': '#9395D3' }))
    grad.appendChild(el('stop', { offset: '100%', 'stop-color': '#B3B7EE' }))
    defs.appendChild(grad)

    const ghost = el('path', {}, 'spine-ghost')
    const main = el('path', {}, 'spine-main')
    const nodesG = el('g')
    const comet = el('circle', { r: '4.5' }, 'spine-comet')
    const cometHalo = el('circle', { r: '11' }, 'spine-comet-halo')
    svg.append(defs, ghost, main, nodesG, cometHalo, comet)

    let total = 0
    let nodes = []
    let rebuildQueued = false

    function build() {
      const docH = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      )
      svg.style.height = docH + 'px'

      const w = window.innerWidth
      const desktop = w >= 1024
      const railBase = desktop ? 72 : 20
      const amp = desktop ? 28 : 9
      const branchLen = desktop ? 56 : 0

      const secs = [...document.querySelectorAll('[data-spine]')]
      const pts = []
      nodes = []

      secs.forEach((sec, i) => {
        const r = sec.getBoundingClientRect()
        const y = r.top + window.scrollY + Math.min(r.height * 0.5, 150)
        const x = railBase + (i % 2 ? amp : -amp) * 0.6
        pts.push({ x, y })
        nodes.push({ x, y, label: sec.getAttribute('data-spine-label') || '' })
      })

      const footer = document.querySelector('footer')
      if (footer) {
        const fr = footer.getBoundingClientRect()
        pts.push({ x: railBase, y: fr.top + window.scrollY + 64 })
      }
      if (pts.length < 2) return

      const d = smoothPath(pts)
      ghost.setAttribute('d', d)
      main.setAttribute('d', d)
      total = main.getTotalLength()
      main.style.strokeDasharray = total

      const spanY0 = pts[0].y
      const spanY1 = pts[pts.length - 1].y || spanY0 + 1

      nodesG.innerHTML = ''
      nodes.forEach((n) => {
        const g = el('g', {}, 'spine-node')

        if (branchLen) {
          const bx = n.x + branchLen
          const bp = el(
            'path',
            { d: `M ${n.x} ${n.y} C ${n.x + branchLen * 0.55} ${n.y} ${bx - 14} ${n.y} ${bx} ${n.y}` },
            'spine-branch'
          )
          const blen = bp.getTotalLength()
          bp.style.strokeDasharray = blen
          bp.style.strokeDashoffset = blen
          g.appendChild(bp)
          g.appendChild(el('circle', { cx: bx, cy: n.y, r: '2.6' }, 'spine-branch-dot'))
          if (n.label) {
            const tx = el('text', { x: bx + 12, y: n.y + 3.5 }, 'spine-label')
            tx.textContent = n.label
            g.appendChild(tx)
          }
          n._branch = bp
          n._blen = blen
        }

        g.appendChild(el('circle', { cx: n.x, cy: n.y, r: '7' }, 'spine-ring'))
        g.appendChild(el('circle', { cx: n.x, cy: n.y, r: '2.8' }, 'spine-dot'))
        nodesG.appendChild(g)
        n._g = g
        n._on = false
        n.frac = (n.y - spanY0) / (spanY1 - spanY0)
      })

      if (reduced) {
        main.style.strokeDashoffset = 0
        comet.style.opacity = 0
        cometHalo.style.opacity = 0
        nodes.forEach((n) => {
          n._g.classList.add('is-active')
          if (n._branch) n._branch.style.strokeDashoffset = 0
        })
      }
    }

    function update() {
      if (reduced || !total) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0
      const drawn = total * p
      main.style.strokeDashoffset = total - drawn

      if (p > 0.002 && p < 0.998) {
        const pt = main.getPointAtLength(drawn)
        comet.setAttribute('cx', pt.x)
        comet.setAttribute('cy', pt.y)
        cometHalo.setAttribute('cx', pt.x)
        cometHalo.setAttribute('cy', pt.y)
        comet.style.opacity = 1
        cometHalo.style.opacity = 1
      } else {
        comet.style.opacity = 0
        cometHalo.style.opacity = 0
      }

      nodes.forEach((n) => {
        const active = p >= n.frac - 0.004
        if (active && !n._on) {
          n._on = true
          n._g.classList.add('is-active')
          if (n._branch) n._branch.style.strokeDashoffset = 0
        } else if (!active && n._on) {
          n._on = false
          n._g.classList.remove('is-active')
          if (n._branch) n._branch.style.strokeDashoffset = n._blen
        }
      })
    }

    const queueBuild = () => {
      if (rebuildQueued) return
      rebuildQueued = true
      requestAnimationFrame(() => {
        rebuildQueued = false
        build()
        update()
      })
    }

    build()
    update()

    if (!reduced) gsap.ticker.add(update)

    const ro = new ResizeObserver(queueBuild)
    ro.observe(document.body)
    window.addEventListener('resize', queueBuild)
    if (document.fonts?.ready) document.fonts.ready.then(queueBuild)
    const t1 = setTimeout(queueBuild, 400)
    const t2 = setTimeout(queueBuild, 1200)

    return () => {
      if (!reduced) gsap.ticker.remove(update)
      ro.disconnect()
      window.removeEventListener('resize', queueBuild)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return <svg ref={svgRef} className="spine-svg" aria-hidden="true" />
}

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const METRICS = [
  { value: 10, suffix: '', label: 'Años de ingeniería continua' },
  { value: 140, suffix: '+', label: 'Sistemas en producción' },
  { value: 99.98, suffix: '%', label: 'Disponibilidad media anual', decimals: 2 },
  { value: 24, suffix: '/7', label: 'Operación y soporte' },
]

export default function Metrics() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('[data-count]').forEach((el) => {
          const target = parseFloat(el.dataset.count)
          const decimals = parseInt(el.dataset.decimals || '0', 10)
          const obj = { v: 0 }
          gsap.to(obj, {
            v: target,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
            onUpdate: () => {
              el.textContent = obj.v.toLocaleString('es-ES', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              })
            },
          })
        })
        gsap.from('[data-metric]', {
          y: 24,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 82%' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} aria-label="Indicadores" className="relative py-20 md:py-28">
      <div className="container-site">
        <div className="hairline mb-16 w-full" aria-hidden="true" />
        <dl className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.label} data-metric>
              <dt className="order-2 mt-3 block font-mono text-[11px] uppercase tracking-label text-mist/70">
                {m.label}
              </dt>
              <dd className="order-1 text-4xl font-semibold tracking-tight text-snow md:text-5xl">
                <span data-count={m.value} data-decimals={m.decimals || 0}>
                  {m.value.toLocaleString('es-ES', {
                    minimumFractionDigits: m.decimals || 0,
                    maximumFractionDigits: m.decimals || 0,
                  })}
                </span>
                <span className="text-brand">{m.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
        <div className="hairline mt-16 w-full" aria-hidden="true" />
      </div>
    </section>
  )
}

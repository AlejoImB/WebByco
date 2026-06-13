import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const COUNTERS = [
  { value: 140, prefix: '+', label: 'proyectos entregados' },
  { value: 50000, prefix: '+', label: 'usuarios activos en nuestros sistemas' },
  { value: 10, prefix: '', label: 'años avalan nuestro camino' },
]

export default function Statement() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-st-line]', {
          yPercent: 110,
          duration: 1,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
        })
        gsap.from('[data-st-copy]', {
          y: 26,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 62%' },
        })
        gsap.from('[data-st-counter]', {
          y: 24,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-st-counters]', start: 'top 82%' },
        })
        gsap.utils.toArray('[data-count]').forEach((el) => {
          const target = parseFloat(el.dataset.count)
          const obj = { v: 0 }
          gsap.to(obj, {
            v: target,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onUpdate: () => {
              el.textContent = Math.round(obj.v).toLocaleString('es-ES')
            },
          })
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} data-spine data-spine-label="Visión" className="relative py-28 md:py-40 overflow-hidden">
      {/* Glow de sección */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-5%] top-1/2 h-[50vw] w-[50vw] max-h-[700px] max-w-[700px] -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)', filter: 'blur(70px)' }}
      />
      <div className="container-site">
        <h2 className="text-[clamp(2.1rem,5.4vw,4.4rem)] font-semibold leading-[1.06] tracking-display text-snow">
          <span className="block overflow-hidden">
            <span data-st-line className="block">Hacer software es fácil.</span>
          </span>
          <span className="block overflow-hidden">
            <span data-st-line className="block text-mist">
              Hacer software que <span className="text-glint">funcione</span>,
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-st-line className="block text-mist">no tanto.</span>
          </span>
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <p data-st-copy className="max-w-lg text-lg leading-relaxed text-mist">
            Por eso existimos. En <strong className="font-semibold text-snow">Axioma</strong>{' '}
            transformamos tu negocio con estrategia, ingeniería e innovación que dan resultados
            medibles. Y sí: llegamos a tiempo.
          </p>

          <dl data-st-counters className="space-y-8">
            {COUNTERS.map((c) => (
              <div key={c.label} data-st-counter className="flex items-baseline gap-5 border-b border-mist/10 pb-7">
                <dd className="min-w-[7.5rem] text-4xl font-semibold tracking-tight md:text-5xl text-glint">
                  <span>{c.prefix}</span>
                  <span data-count={c.value}>{c.value.toLocaleString('es-ES')}</span>
                </dd>
                <dt className="text-sm text-mist">{c.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <p className="mt-16 text-xl font-medium tracking-tight text-snow md:text-2xl">
          Tu negocio no es normal.{' '}
          <span className="text-mist">Tu tecnología tampoco debería serlo.</span>
        </p>
      </div>
    </section>
  )
}

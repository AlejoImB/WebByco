import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedCase() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-case-text] > *', {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
        })
        gsap.fromTo(
          '[data-case-mock]',
          { y: 80, rotateX: 8, opacity: 0 },
          {
            y: -40,
            rotateX: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top 90%', end: 'bottom 25%', scrub: 0.7 },
          }
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="casos" ref={root} data-spine data-spine-label="Casos" className="relative overflow-hidden py-28 md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8%] top-1/4 h-[45vw] w-[45vw] max-h-[620px] max-w-[620px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.32), transparent 70%)', filter: 'blur(70px)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-5%] bottom-1/4 h-[30vw] w-[30vw] max-h-[400px] max-w-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.18), transparent 70%)', filter: 'blur(60px)' }}
      />
      <div className="container-site">
        <p className="eyebrow mb-14">Caso de éxito destacado</p>

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-case-text>
            <div className="flex flex-wrap gap-2.5">
              <span className="chip">Sistemas</span>
              <span className="chip">IA</span>
              <span className="chip">Cloud</span>
            </div>
            <h2 className="mt-7 text-[clamp(1.9rem,4.2vw,3.2rem)] font-semibold leading-[1.08] tracking-display text-snow">
              Atlas Banca
            </h2>
            <p className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-mist">
              Diseñamos y construimos el <strong className="font-semibold text-snow">core de banca digital</strong>{' '}
              y la app móvil para 1,2 millones de usuarios, con un sistema de detección de fraude
              basado en IA. Migración completa desde sistemas legados{' '}
              <strong className="font-semibold text-snow">sin un minuto de parada</strong>.
            </p>
            <ul className="mt-8 space-y-2.5 text-sm text-mist">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-haze" aria-hidden="true" />
                −38 % de tiempo de operación por transacción
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-haze" aria-hidden="true" />
                99,98 % de disponibilidad en el primer año
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-haze" aria-hidden="true" />
                Fraude detectado en tiempo real con IA propia
              </li>
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#contacto" className="btn-primary">Ver proyecto</a>
              <a href="#contacto" className="btn-ghost">Todos los proyectos</a>
            </div>
          </div>

          <div className="relative" style={{ perspective: '1400px' }}>
            <div data-case-mock className="frame relative rounded-2xl will-change-transform">
              <div className="flex items-center gap-2 border-b border-mist/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-mist/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-mist/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-mist/25" />
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-haze">
                  <span className="h-1.5 w-1.5 rounded-full bg-haze" />
                  En producción
                </span>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 rounded-lg border border-mist/12 p-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-mist/70">Saldo total</p>
                    <p className="mt-1.5 text-2xl font-semibold text-snow">€ 84 392,10</p>
                    <div className="mt-4 flex h-16 items-end gap-1.5">
                      {[40, 65, 50, 80, 60, 92, 75, 100, 88, 70, 95, 84].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm"
                          style={{
                            height: `${h}%`,
                            background: `linear-gradient(to top, rgba(124,58,237,${0.4 + h / 250}), rgba(167,139,250,${0.6 + h / 300}))`,
                            boxShadow: h > 80 ? '0 0 8px rgba(124,58,237,0.5)' : undefined,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-mist/12 p-3">
                      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-mist/70">Fraude</p>
                      <p className="mt-1 text-sm font-semibold text-haze">0 incidentes</p>
                    </div>
                    <div className="rounded-lg border border-mist/12 p-3">
                      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-mist/70">Uptime</p>
                      <p className="mt-1 text-sm font-semibold text-snow">99,98 %</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-3 rounded-md border border-mist/10 px-3 py-2.5">
                      <span className="h-7 w-7 rounded-full bg-brand/20" />
                      <span className="h-2 w-28 rounded-full bg-snow/25" />
                      <span className="ml-auto h-2 w-12 rounded-full bg-mist/20" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

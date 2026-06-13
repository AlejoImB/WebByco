import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    id: 'arquitectura',
    title: 'Arquitectura',
    desc: 'Definimos el sistema antes de escribirlo: dominios, contratos y límites claros.',
  },
  {
    id: 'diseno',
    title: 'Diseño de producto',
    desc: 'La interfaz se decide con datos y se construye sobre un sistema de diseño propio.',
  },
  {
    id: 'datos',
    title: 'Datos e inteligencia',
    desc: 'Métricas, paneles y modelos conectados desde el primer despliegue.',
  },
  {
    id: 'produccion',
    title: 'Producción',
    desc: 'CI/CD, observabilidad y soporte continuo. El sistema queda vivo, no entregado.',
  },
]

export default function Assembly() {
  const root = useRef(null)
  const stage = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      const setStep = (i) => {
        gsap.utils.toArray('[data-step]').forEach((el, j) => {
          el.classList.toggle('is-active', j <= i)
        })
      }

      const buildTimeline = (scrollTrigger) => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' }, scrollTrigger })

        tl.call(() => setStep(0))
          .from('[data-asm-frame]', { opacity: 0, scale: 0.94, duration: 0.6 })
          .from('[data-asm-chrome]', { opacity: 0, duration: 0.4 }, '<0.2')

          .call(() => setStep(1), null, '+=0.2')
          .from('[data-asm-side]', { xPercent: -100, opacity: 0, duration: 0.6 })
          .from('[data-asm-top]', { yPercent: -100, opacity: 0, duration: 0.5 }, '<0.15')
          .from('[data-asm-nav] > *', { x: -12, opacity: 0, stagger: 0.08, duration: 0.35 }, '<0.2')

          .call(() => setStep(2), null, '+=0.2')
          .from('[data-asm-kpi]', { y: 22, opacity: 0, stagger: 0.12, duration: 0.5 })
          .from(
            '[data-asm-bar]',
            { scaleY: 0, transformOrigin: 'bottom', stagger: 0.06, duration: 0.5, ease: 'power3.out' },
            '<0.2'
          )

          .call(() => setStep(3), null, '+=0.2')
          .from('[data-asm-row]', { y: 14, opacity: 0, stagger: 0.1, duration: 0.4 })
          .from('[data-asm-badge]', { scale: 0.6, opacity: 0, duration: 0.5, ease: 'back.out(2)' })
          .to('[data-asm-frame]', { boxShadow: '0 30px 120px -30px rgba(147,149,211,0.35)', duration: 0.6 }, '<')

        return tl
      }

      // Escritorio: sección fijada, el scroll ensambla la interfaz
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        buildTimeline({
          trigger: root.current,
          start: 'top top',
          end: '+=2600',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        })
      })

      // Móvil / tablet: misma secuencia, sin pin
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        setStep(3)
        buildTimeline({
          trigger: stage.current,
          start: 'top 78%',
        })
      })

      // Movimiento reducido: todo visible y todos los pasos marcados
      mm.add('(prefers-reduced-motion: reduce)', () => {
        setStep(3)
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="proceso" ref={root} className="relative overflow-hidden py-28 md:py-36 lg:flex lg:min-h-screen lg:items-center lg:py-0">
      <div className="container-site w-full">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          {/* Pasos */}
          <div>
            <p className="eyebrow mb-6">Proceso</p>
            <h2 className="text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-display text-snow">
              Así se ensambla <br className="hidden md:block" />
              un sistema.
            </h2>
            <ol className="mt-12 space-y-8">
              {STEPS.map((s) => (
                <li key={s.id} data-step className="step flex gap-5">
                  <span className="step-bar mt-1.5 h-10 w-px shrink-0 bg-mist/25 transition-colors duration-500" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-snow">{s.title}</h3>
                    <p className="mt-1.5 max-w-sm text-[14.5px] leading-relaxed text-mist">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Interfaz que se ensambla */}
          <div ref={stage} className="relative" aria-hidden="true">
            <div
              className="absolute -inset-10 rounded-full opacity-60"
              style={{ background: 'radial-gradient(ellipse at center, rgba(147,149,211,0.10), transparent 70%)' }}
            />
            <div data-asm-frame className="frame relative overflow-hidden rounded-2xl">
              {/* Barra del navegador */}
              <div data-asm-chrome className="flex items-center gap-2 border-b border-mist/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-mist/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-mist/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-mist/25" />
                <span className="ml-4 hidden h-5 flex-1 max-w-[260px] rounded-md bg-mist/10 sm:block" />
                <span data-asm-badge className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-haze">
                  <span className="h-1.5 w-1.5 rounded-full bg-haze" />
                  En producción
                </span>
              </div>

              <div className="flex">
                {/* Sidebar */}
                <div data-asm-side className="hidden w-36 shrink-0 border-r border-mist/10 p-4 sm:block">
                  <div className="mb-5 h-6 w-6 rounded-md bg-brand/30" />
                  <div data-asm-nav className="space-y-3">
                    <div className="h-2 w-20 rounded-full bg-snow/30" />
                    <div className="h-2 w-16 rounded-full bg-mist/20" />
                    <div className="h-2 w-[4.5rem] rounded-full bg-mist/20" />
                    <div className="h-2 w-14 rounded-full bg-mist/20" />
                    <div className="h-2 w-[4.2rem] rounded-full bg-mist/20" />
                  </div>
                </div>

                <div className="min-w-0 flex-1 p-5">
                  {/* Topbar */}
                  <div data-asm-top className="mb-5 flex items-center justify-between">
                    <div className="h-3 w-32 rounded-full bg-snow/35" />
                    <div className="flex gap-2">
                      <div className="h-6 w-14 rounded-md bg-mist/12" />
                      <div className="h-6 w-6 rounded-full bg-brand/35" />
                    </div>
                  </div>

                  {/* KPIs */}
                  <div className="mb-5 grid grid-cols-3 gap-3">
                    {[['99.98%', 'uptime'], ['1,2 M', 'usuarios'], ['38 ms', 'p95']].map(([v, l]) => (
                      <div key={l} data-asm-kpi className="rounded-lg border border-mist/12 bg-snow/[0.03] p-3">
                        <p className="text-sm font-semibold text-snow">{v}</p>
                        <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-mist/70">{l}</p>
                      </div>
                    ))}
                  </div>

                  {/* Gráfico de barras */}
                  <div className="mb-5 rounded-lg border border-mist/12 bg-snow/[0.02] p-4">
                    <div className="flex h-24 items-end gap-2.5">
                      {[34, 52, 41, 68, 57, 82, 73, 96].map((h, i) => (
                        <div
                          key={i}
                          data-asm-bar
                          className="flex-1 rounded-t-sm"
                          style={{
                            height: `${h}%`,
                            background:
                              i === 7
                                ? 'linear-gradient(180deg, #B3B7EE, #9395D3)'
                                : 'rgba(147,149,211,0.28)',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Filas de datos */}
                  <div className="space-y-2.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} data-asm-row className="flex items-center gap-3 rounded-md border border-mist/10 px-3 py-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-haze/80" />
                        <span className="h-2 w-24 rounded-full bg-snow/25" />
                        <span className="ml-auto h-2 w-12 rounded-full bg-mist/20" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

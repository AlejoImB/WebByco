import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: 'atlas',
    name: 'Atlas Banca',
    sector: 'Fintech',
    desc: 'Core de banca digital y aplicación móvil para 1,2 millones de usuarios. Migración completa desde sistemas legados sin un minuto de parada.',
    meta: 'Plataforma · 2024 — presente',
    type: 'dashboard',
  },
  {
    id: 'vector',
    name: 'Vector Salud',
    sector: 'Salud',
    desc: 'Plataforma de telemedicina con video, historia clínica y receta electrónica. 40 000 consultas mensuales con disponibilidad del 99,99 %.',
    meta: 'Producto móvil · 2023 — presente',
    type: 'phone',
  },
  {
    id: 'helio',
    name: 'Helio Energía',
    sector: 'Industria',
    desc: 'Monitorización IoT de plantas solares con modelos predictivos de mantenimiento. 30 % menos incidencias en el primer año.',
    meta: 'IA + IoT · 2022 — presente',
    type: 'analytics',
  },
]

function Mockup({ type }) {
  if (type === 'phone') {
    return (
      <div className="frame mx-auto w-[230px] rounded-[2.2rem] p-3 sm:w-[260px]">
        <div className="overflow-hidden rounded-[1.7rem] border border-mist/10 bg-ink/80">
          <div className="flex items-center justify-between px-5 pt-4">
            <span className="h-2 w-10 rounded-full bg-snow/30" />
            <span className="h-3.5 w-3.5 rounded-full bg-brand/40" />
          </div>
          <div className="px-5 pb-6 pt-7">
            <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-mist/70">Próxima consulta</p>
            <p className="mt-2 text-lg font-semibold text-snow">Dra. Llanos</p>
            <p className="text-xs text-mist">Cardiología · 16:30</p>
            <div className="mt-5 h-9 rounded-xl bg-gradient-to-r from-brand to-haze opacity-90" />
            <div className="mt-6 space-y-2.5">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-mist/10 p-3">
                  <span className="h-7 w-7 rounded-full bg-brand/20" />
                  <span className="h-2 w-20 rounded-full bg-snow/25" />
                  <span className="ml-auto h-2 w-6 rounded-full bg-mist/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const isAnalytics = type === 'analytics'
  return (
    <div className="frame w-full max-w-xl rounded-2xl">
      <div className="flex items-center gap-2 border-b border-mist/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-mist/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-mist/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-mist/25" />
      </div>
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="h-3 w-28 rounded-full bg-snow/35" />
          <span className="h-6 w-20 rounded-md bg-brand/25" />
        </div>
        {isAnalytics ? (
          <svg viewBox="0 0 400 140" className="w-full" aria-hidden="true">
            <polyline
              points="0,110 50,95 100,100 150,70 200,78 250,48 300,55 350,28 400,20"
              fill="none"
              stroke="#9395D3"
              strokeWidth="2"
            />
            <polyline
              points="0,120 50,118 100,108 150,112 200,98 250,100 300,86 350,80 400,70"
              fill="none"
              stroke="rgba(179,183,238,0.45)"
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />
            <line x1="0" y1="135" x2="400" y2="135" stroke="rgba(162,163,187,0.2)" />
          </svg>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 rounded-lg border border-mist/12 p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-mist/70">Saldo total</p>
              <p className="mt-1.5 text-2xl font-semibold text-snow">€ 84 392,10</p>
              <div className="mt-4 flex h-14 items-end gap-1.5">
                {[40, 65, 50, 80, 60, 92, 75, 100, 88, 70, 95, 84].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm bg-brand/35" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border border-mist/12 p-3">
                <span className="block h-2 w-12 rounded-full bg-mist/25" />
                <span className="mt-2 block h-3 w-14 rounded-full bg-haze/60" />
              </div>
              <div className="rounded-lg border border-mist/12 p-3">
                <span className="block h-2 w-10 rounded-full bg-mist/25" />
                <span className="mt-2 block h-3 w-16 rounded-full bg-snow/35" />
              </div>
            </div>
          </div>
        )}
        <div className="mt-4 space-y-2">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-md border border-mist/10 px-3 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              <span className="h-2 w-28 rounded-full bg-snow/25" />
              <span className="ml-auto h-2 w-10 rounded-full bg-mist/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Showcase() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('[data-proj]').forEach((row) => {
          const mock = row.querySelector('[data-mock]')
          const text = row.querySelector('[data-proj-text]')

          gsap.fromTo(
            mock,
            { y: 90, rotateX: 10, rotateY: row.dataset.dir === 'rtl' ? 7 : -7, opacity: 0 },
            {
              y: -60,
              rotateX: 0,
              rotateY: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top 90%',
                end: 'bottom 20%',
                scrub: 0.7,
              },
            }
          )

          gsap.from(text.children, {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 72%' },
          })
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="proyectos" ref={root} className="relative py-28 md:py-40">
      <div className="container-site">
        <p className="eyebrow mb-6">Proyectos</p>
        <h2 className="max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.08] tracking-display text-snow">
          Trabajo que está <span className="text-mist">en producción.</span>
        </h2>

        <div className="mt-24 space-y-32 md:space-y-44">
          {PROJECTS.map((p, i) => {
            const reversed = i % 2 === 1
            return (
              <article
                key={p.id}
                data-proj
                data-dir={reversed ? 'rtl' : 'ltr'}
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                  reversed ? '' : ''
                }`}
              >
                <div
                  data-proj-text
                  className={reversed ? 'lg:order-2' : ''}
                >
                  <p className="font-mono text-[11px] uppercase tracking-label text-brand">{p.sector}</p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-tight text-snow md:text-4xl">{p.name}</h3>
                  <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-mist">{p.desc}</p>
                  <p className="mt-7 font-mono text-[11px] uppercase tracking-label text-mist/60">{p.meta}</p>
                  <a
                    href="#contacto"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-haze transition-colors hover:text-snow"
                  >
                    Ver caso completo
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </a>
                </div>

                <div
                  className={`relative ${reversed ? 'lg:order-1' : ''}`}
                  style={{ perspective: '1400px' }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute -inset-12 rounded-full opacity-50"
                    style={{ background: 'radial-gradient(ellipse at center, rgba(147,149,211,0.12), transparent 70%)' }}
                  />
                  <div data-mock className="relative will-change-transform">
                    <Mockup type={p.type} />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

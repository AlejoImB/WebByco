import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CX = 260
const CY = 260
const R = 178

// Seis capacidades dispuestas como nodos de un mismo sistema
const SERVICES = [
  {
    id: 'web',
    angle: -90,
    label: 'Web',
    name: 'Desarrollo Web',
    desc: 'Plataformas web de alto rendimiento sobre arquitecturas que escalan con el negocio. Medibles, accesibles y rápidas en cualquier red.',
    meta: 'React · Next.js · Node',
  },
  {
    id: 'movil',
    angle: -30,
    label: 'Móvil',
    name: 'Aplicaciones Móviles',
    desc: 'Productos nativos y multiplataforma con la fluidez que sus usuarios esperan y la estabilidad que su operación exige.',
    meta: 'Swift · Kotlin · React Native',
  },
  {
    id: 'sistemas',
    angle: 30,
    label: 'Sistemas',
    name: 'Sistemas Empresariales',
    desc: 'ERP, CRM y plataformas internas a medida. Integramos lo que ya funciona y reemplazamos, sin fricción, lo que frena.',
    meta: 'Integraciones · APIs · Datos',
  },
  {
    id: 'ia',
    angle: 90,
    label: 'IA',
    name: 'Inteligencia Artificial',
    desc: 'Modelos aplicados a problemas reales: predicción, clasificación y lenguaje. IA que produce resultados en producción, no demos.',
    meta: 'LLMs · ML aplicado · RAG',
  },
  {
    id: 'auto',
    angle: 150,
    label: 'Auto',
    name: 'Automatización',
    desc: 'Procesos que se ejecutan solos, se auditan solos y avisan antes de fallar. Su equipo queda libre para lo importante.',
    meta: 'Orquestación · RPA · CI/CD',
  },
  {
    id: 'cloud',
    angle: 210,
    label: 'Cloud',
    name: 'Cloud',
    desc: 'Infraestructura como código sobre AWS, GCP y Azure. Despliegues continuos, costes bajo control y alta disponibilidad.',
    meta: 'AWS · GCP · Kubernetes',
  },
]

const pos = (angle) => {
  const rad = (angle * Math.PI) / 180
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
}

export default function Services() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Trazado de las conexiones al entrar la sección
        const links = gsap.utils.toArray('.svc-link')
        links.forEach((path) => {
          const len = path.getTotalLength()
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        })
        gsap.to(links, {
          strokeDashoffset: 0,
          duration: 1.6,
          stagger: 0.12,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: root.current, start: 'top 60%' },
        })
        gsap.from('.svc-node', {
          opacity: 0,
          scale: 0.7,
          transformOrigin: 'center center',
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: root.current, start: 'top 60%' },
        })
        gsap.from('[data-core]', {
          opacity: 0,
          scale: 0.6,
          transformOrigin: 'center center',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 65%' },
        })

        // Cada bloque de texto activa su nodo y su conexión
        gsap.utils.toArray('[data-svc-item]').forEach((item) => {
          const id = item.dataset.svcItem
          ScrollTrigger.create({
            trigger: item,
            start: 'top 62%',
            end: 'bottom 38%',
            onToggle: (self) => {
              document.getElementById(`node-${id}`)?.classList.toggle('is-active', self.isActive)
              document.getElementById(`link-${id}`)?.classList.toggle('is-active', self.isActive)
            },
          })
        })

        // Entrada sutil de cada bloque
        gsap.utils.toArray('[data-svc-item]').forEach((item) => {
          gsap.from(item, {
            y: 36,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%' },
          })
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="capacidades" ref={root} className="relative py-28 md:py-40">
      <div className="container-site">
        <p className="eyebrow mb-6">Capacidades</p>
        <h2 className="max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.08] tracking-display text-snow">
          Un ecosistema conectado, <span className="text-mist">no una lista de servicios.</span>
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-mist">
          Cada capacidad comparte el mismo núcleo de ingeniería: estándares, observabilidad y
          seguridad comunes. Lo que construimos en una, refuerza a las demás.
        </p>

        <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-10">
          {/* Diagrama del sistema — fijo mientras se recorren las capacidades */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28">
              <svg
                viewBox="0 0 520 520"
                role="img"
                aria-label="Diagrama del ecosistema de capacidades de Byco conectadas a un núcleo común"
                className="mx-auto w-full max-w-[520px]"
              >
                <defs>
                  <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(147,149,211,0.35)" />
                    <stop offset="100%" stopColor="rgba(147,149,211,0)" />
                  </radialGradient>
                </defs>

                <circle cx={CX} cy={CY} r="120" fill="url(#coreGlow)" />
                <circle cx={CX} cy={CY} r={R} stroke="rgba(162,163,187,0.08)" fill="none" />

                {SERVICES.map((s) => {
                  const p = pos(s.angle)
                  return (
                    <path
                      key={s.id}
                      id={`link-${s.id}`}
                      className="svc-link"
                      d={`M ${CX} ${CY} L ${p.x} ${p.y}`}
                      strokeWidth="1.25"
                      fill="none"
                    />
                  )
                })}

                <g data-core>
                  <circle cx={CX} cy={CY} r="46" fill="rgba(0,8,7,0.9)" stroke="#9395D3" strokeWidth="1.25" />
                  <circle cx={CX} cy={CY} r="58" fill="none" stroke="rgba(147,149,211,0.25)" strokeDasharray="2 6" />
                  <text
                    x={CX}
                    y={CY + 4}
                    textAnchor="middle"
                    fontSize="12"
                    letterSpacing="2.5"
                    fill="#FBF9FF"
                    style={{ fontFamily: '"Geist Mono", monospace' }}
                  >
                    NÚCLEO
                  </text>
                </g>

                {SERVICES.map((s) => {
                  const p = pos(s.angle)
                  return (
                    <g key={s.id} id={`node-${s.id}`} className="svc-node">
                      <circle className="ring" cx={p.x} cy={p.y} r="30" fill="rgba(0,8,7,0.92)" strokeWidth="1.25" />
                      <circle className="dot" cx={p.x} cy={p.y - 12} r="2.5" />
                      <text
                        x={p.x}
                        y={p.y + 8}
                        textAnchor="middle"
                        fontSize="10.5"
                        letterSpacing="1.5"
                        style={{ fontFamily: '"Geist Mono", monospace' }}
                      >
                        {s.label.toUpperCase()}
                      </text>
                    </g>
                  )
                })}
              </svg>
              <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-label text-mist/60">
                Un núcleo de ingeniería · seis capacidades
              </p>
            </div>
          </div>

          {/* Capacidades en flujo continuo, separadas por líneas hairline */}
          <div>
            {SERVICES.map((s, i) => (
              <article
                key={s.id}
                data-svc-item={s.id}
                className="group border-t border-mist/10 py-12 first:border-t-0 first:pt-0 md:py-14"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="text-2xl font-semibold tracking-tight text-snow transition-colors duration-500 group-hover:text-haze md:text-[1.7rem]">
                    {s.name}
                  </h3>
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-brand opacity-40 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mist">{s.desc}</p>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-label text-brand/80">{s.meta}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

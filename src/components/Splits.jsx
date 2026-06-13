import { lazy, Suspense, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const NeuralSphere = lazy(() => import('./NeuralSphere.jsx'))

gsap.registerPlugin(ScrollTrigger)

function VisualIA() {
  return (
    <div className="frame relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl" style={{ boxShadow: '0 0 80px rgba(var(--brand-rgb),0.35), 0 40px 80px -40px rgba(0,0,0,0.9)' }}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 60% 40%, rgba(var(--brand-rgb),0.38), transparent 62%)' }}
      />
      <Suspense fallback={null}>
        <NeuralSphere className="relative h-full w-full" />
      </Suspense>
      <p className="pointer-events-none absolute bottom-5 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-label text-mist/50">
        Red en tiempo real · WebGL
      </p>
    </div>
  )
}

function VisualAuto() {
  return (
    <div className="frame relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl p-8" style={{ boxShadow: '0 0 80px rgba(var(--brand-rgb),0.3), 0 40px 80px -40px rgba(0,0,0,0.9)' }}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 35% 70%, rgba(var(--haze-rgb),0.28), transparent 60%)' }}
      />
      <div className="relative flex h-full flex-col justify-center gap-4" aria-hidden="true">
        {[
          ['Factura recibida', 'auto', true],
          ['Datos extraídos', 'IA', true],
          ['Validación contable', 'auto', true],
          ['Pago programado', 'listo', false],
        ].map(([label, tag, done], i) => (
          <div key={i} className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${done ? 'bg-haze' : 'bg-mist/30'}`} style={done ? { boxShadow: '0 0 8px rgba(var(--haze-rgb),0.9)' } : undefined} />
            <div className="frame flex flex-1 items-center justify-between rounded-xl px-4 py-3.5">
              <span className="text-sm text-snow">{label}</span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-brand">{tag}</span>
            </div>
          </div>
        ))}
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-label text-mist/50">
          0 intervenciones manuales
        </p>
      </div>
    </div>
  )
}

const SPLITS = [
  {
    id: 'ia',
    spineLabel: 'IA',
    Visual: VisualIA,
    title: (
      <>
        Todo el mundo habla de IA.{' '}
        <span className="text-glint">Nosotros la ponemos a trabajar.</span>
      </>
    ),
    copy: 'Usamos la inteligencia artificial para lo que de verdad importa: automatizar procesos, personalizar experiencias y anticipar lo que viene. Aplicaciones reales, en producción, pensadas para que tu negocio avance sin quemar tiempo ni recursos.',
    cta: 'Impulsa tu negocio con IA',
    reverse: false,
  },
  {
    id: 'automatizacion',
    spineLabel: 'Automatización',
    Visual: VisualAuto,
    title: (
      <>
        Tú decides: <span className="text-mist">¿seguir apagando fuegos</span>{' '}
        <span className="text-glint">o avanzar?</span>
      </>
    ),
    copy: 'Automatizamos lo repetitivo de tu operación: facturas, informes, integraciones entre sistemas. Procesos que se ejecutan solos, se auditan solos y avisan antes de fallar. Tu equipo recupera horas; tú recuperas foco.',
    cta: 'Automatiza tu operación',
    reverse: true,
  },
]

export default function Splits() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('[data-split]').forEach((row) => {
          gsap.from(row.querySelectorAll('[data-split-text] > *'), {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 70%' },
          })
          gsap.fromTo(
            row.querySelector('[data-split-visual]'),
            { y: 60, opacity: 0 },
            {
              y: -30,
              opacity: 1,
              ease: 'none',
              scrollTrigger: { trigger: row, start: 'top 92%', end: 'bottom 30%', scrub: 0.7 },
            }
          )
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root}>
      {SPLITS.map(({ id, spineLabel, Visual, title, copy, cta, reverse }) => (
        <section
          key={id}
          id={id}
          data-split
          data-spine
          data-spine-label={spineLabel}
          className="relative py-24 md:py-32"
        >
          <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
            <div data-split-text className={reverse ? 'lg:order-2' : ''}>
              <h2 className="text-[clamp(1.9rem,4.2vw,3.1rem)] font-semibold leading-[1.12] tracking-display text-snow">
                {title}
              </h2>
              <p className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-mist">{copy}</p>
              <a href="#contacto" className="btn-ghost mt-9">
                {cta}
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
            </div>
            <div data-split-visual className={`will-change-transform ${reverse ? 'lg:order-1' : ''}`}>
              <Visual />
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

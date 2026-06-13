import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const QUOTES = [
  {
    text: 'Hay muchas empresas de software. Pocas que entiendan tu negocio antes de escribir una línea de código. Byco captó la esencia de nuestra idea y la convirtió en un sistema que usamos cada día.',
    name: 'Julia Santamaría',
    role: 'Directora Comercial · Grupo Mirlo',
  },
  {
    text: 'La migración nos daba pánico: veinte años de datos y cero margen de error. Lo hicieron sin que nuestros clientes notaran nada. Eso, en banca, no tiene precio.',
    name: 'Alberto Cano',
    role: 'CTO · Banco Atlas',
  },
  {
    text: 'Necesitaba lanzar rápido y sin deuda técnica. Me llevaron de la mano: producto, arquitectura, despliegue. Hoy la plataforma escala sola y yo duermo por las noches.',
    name: 'Nacho Peral',
    role: 'CEO · Vector Salud',
  },
  {
    text: 'Automatizaron nuestra facturación y conciliación. Lo que antes ocupaba a tres personas una semana, ahora ocurre solo. El ROI llegó en el primer trimestre.',
    name: 'Beatriz Lago',
    role: 'CFO · Kappa Foods',
  },
  {
    text: 'Trato cercano, respuesta inmediata y cero humo. Te dicen lo que no necesitas, aunque eso les haga facturar menos. Por eso seguimos con ellos cinco años después.',
    name: 'José Luis Hidalgo',
    role: 'Gerente · Faro Seguros',
  },
  {
    text: 'El gemelo de datos que construyeron unificó la información de toda la ciudad en un solo panel. La planificación urbana dejó de ser intuición y pasó a ser evidencia.',
    name: 'María Belén Calatrava',
    role: 'Concejala de Urbanismo · Ayto. de Riberalta',
  },
]

export default function Testimonials() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-t-head] > *', {
          y: 26,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 78%' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} aria-label="Testimonios" data-spine data-spine-label="Confianza" className="relative py-28 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 bottom-0 h-[50vw] w-[50vw] max-h-[650px] max-w-[650px] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(var(--brand-rgb), 0.14), transparent 70%)', filter: 'blur(80px)' }}
      />
      <div className="container-site">
        <div data-t-head className="max-w-2xl">
          <p className="eyebrow mb-6">Testimonios</p>
          <h2 className="text-[clamp(2rem,4.8vw,3.6rem)] font-semibold leading-[1.07] tracking-display text-snow">
            Lo cuentan ellos. <span className="text-mist">Nosotros solo copiamos y pegamos.</span>
          </h2>
        </div>

        <div data-quotes className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {QUOTES.map((q) => (
            <figure
              key={q.name}
              data-quote
              className="flex flex-col justify-between rounded-2xl p-7 transition-all duration-500"
              style={{
                background: 'linear-gradient(145deg, rgba(var(--brand-rgb), 0.1), rgba(255,255,255,0.015))',
                border: '1px solid rgba(var(--brand-rgb), 0.22)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(var(--brand-rgb), 0.55)'
                e.currentTarget.style.boxShadow = '0 20px 60px -20px rgba(var(--brand-rgb), 0.4), 0 0 0 1px rgba(var(--brand-rgb), 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(var(--brand-rgb), 0.22)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <blockquote className="text-[14.5px] leading-relaxed text-mist">
                <span aria-hidden="true" className="mb-3 block text-3xl leading-none text-haze" style={{ textShadow: '0 0 20px rgba(var(--haze-rgb), 0.6)' }}>
                  &ldquo;
                </span>
                {q.text}
              </blockquote>
              <figcaption className="mt-7">
                <p className="text-sm font-semibold text-snow">{q.name}</p>
                <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-mist/60">{q.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

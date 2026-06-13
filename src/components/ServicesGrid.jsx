import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Piezas visuales construidas en CSS/SVG — sin fotos de stock */
function ArtWeb() {
  return (
    <div className="tile-art relative h-full w-full bg-gradient-to-br from-brand/40 via-brand/10 to-ink p-6">
      <div className="frame h-full rounded-xl">
        <div className="flex items-center gap-1.5 border-b border-brand/20 px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-haze/60" />
          <span className="h-2 w-2 rounded-full bg-brand/50" />
          <span className="h-2 w-2 rounded-full bg-mist/30" />
        </div>
        <div className="p-4">
          <div className="h-2.5 w-24 rounded-full bg-snow/60" />
          <div className="mt-2 h-2 w-16 rounded-full bg-haze/35" />
          <div className="mt-4 h-8 w-24 rounded-full bg-gradient-to-r from-brand to-haze shadow-[0_0_16px_rgba(124,58,237,0.6)]" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="h-10 rounded-lg bg-brand/15 border border-brand/20" />
            <div className="h-10 rounded-lg bg-haze/10 border border-haze/15" />
            <div className="h-10 rounded-lg bg-brand/15 border border-brand/20" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ArtMovil() {
  return (
    <div className="tile-art relative flex h-full w-full items-end justify-center bg-gradient-to-tr from-haze/35 via-brand/10 to-ink pt-8">
      <div className="frame w-32 rounded-t-[1.6rem] p-2 pb-0" style={{ boxShadow: '0 -20px 60px rgba(124,58,237,0.35)' }}>
        <div className="rounded-t-[1.2rem] border border-b-0 border-brand/20 bg-ink/80 p-3 pb-0">
          <div className="mx-auto h-1.5 w-10 rounded-full bg-haze/40" />
          <div className="mt-4 h-2 w-16 rounded-full bg-snow/60" />
          <div className="mt-2 h-2 w-12 rounded-full bg-haze/35" />
          <div className="mt-3 h-7 rounded-lg bg-gradient-to-r from-brand to-haze" style={{ boxShadow: '0 0 14px rgba(124,58,237,0.55)' }} />
          <div className="mt-3 space-y-2 pb-2">
            <div className="h-6 rounded-lg bg-brand/15 border border-brand/15" />
            <div className="h-6 rounded-lg bg-haze/10 border border-haze/10" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ArtSistemas() {
  return (
    <div className="tile-art relative flex h-full w-full items-center justify-center bg-gradient-to-bl from-brand/35 via-brand/10 to-ink">
      <div className="relative h-32 w-44">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="frame absolute left-1/2 w-40 -translate-x-1/2 rounded-lg px-3 py-2.5"
            style={{ top: `${i * 34}px`, opacity: 1 - i * 0.15, boxShadow: i === 0 ? '0 0 20px rgba(124,58,237,0.4)' : undefined }}
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-haze" style={{ boxShadow: '0 0 6px rgba(167,139,250,0.8)' }} />
              <span className="h-1.5 w-16 rounded-full bg-snow/40" />
              <span className="ml-auto h-1.5 w-6 rounded-full bg-brand/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArtIA() {
  return (
    <div className="tile-art relative flex h-full w-full items-center justify-center bg-gradient-to-br from-haze/30 via-brand/10 to-ink">
      <svg viewBox="0 0 200 140" className="h-full w-auto" aria-hidden="true">
        <circle cx="100" cy="70" r="26" fill="rgba(124,58,237,0.35)" />
        <circle cx="100" cy="70" r="26" stroke="#7C3AED" strokeWidth="1.5" fill="none" style={{ filter: 'drop-shadow(0 0 8px rgba(124,58,237,0.8))' }} />
        <circle cx="100" cy="70" r="44" stroke="rgba(167,139,250,0.5)" strokeWidth="1" strokeDasharray="3 5" fill="none" />
        <circle cx="100" cy="70" r="62" stroke="rgba(124,58,237,0.25)" strokeWidth="0.75" fill="none" />
        {[[30, 30], [170, 36], [24, 110], [176, 104]].map(([x, y], i) => (
          <g key={i}>
            <line x1="100" y1="70" x2={x} y2={y} stroke="rgba(124,58,237,0.5)" strokeWidth="0.75" />
            <circle cx={x} cy={y} r="5" fill="#A78BFA" style={{ filter: 'drop-shadow(0 0 6px rgba(167,139,250,0.9))' }} />
          </g>
        ))}
        <circle cx="100" cy="70" r="8" fill="#7C3AED" style={{ filter: 'drop-shadow(0 0 10px rgba(124,58,237,1))' }} />
      </svg>
    </div>
  )
}

function ArtAuto() {
  return (
    <div className="tile-art relative flex h-full w-full items-center justify-center bg-gradient-to-tl from-brand/35 via-brand/10 to-ink px-8">
      <svg viewBox="0 0 240 100" className="w-full" aria-hidden="true">
        <path d="M10 50 H70 M110 50 H170 M210 50 H230" stroke="rgba(124,58,237,0.65)" strokeWidth="1.5" />
        <path d="M70 50 Q90 50 90 30 M90 70 Q90 50 110 50" stroke="rgba(167,139,250,0.55)" fill="none" strokeWidth="1.5" />
        {[10, 90, 170].map((x, i) => (
          <rect key={i} x={x} y="38" width="34" height="24" rx="7" fill="rgba(6,4,18,0.9)" stroke="#7C3AED" strokeWidth="1.5" style={{ filter: i === 1 ? 'drop-shadow(0 0 8px rgba(124,58,237,0.7))' : undefined }} />
        ))}
        <rect x="210" y="40" width="20" height="20" rx="10" fill="#A78BFA" style={{ filter: 'drop-shadow(0 0 8px rgba(167,139,250,1))' }} />
        <circle cx="90" cy="22" r="7" fill="rgba(124,58,237,0.75)" style={{ filter: 'drop-shadow(0 0 6px rgba(124,58,237,0.8))' }} />
        <circle cx="90" cy="78" r="5" fill="rgba(167,139,250,0.5)" />
      </svg>
    </div>
  )
}

function ArtCloud() {
  return (
    <div className="tile-art relative flex h-full w-full items-center justify-center bg-gradient-to-tr from-haze/30 via-brand/10 to-ink">
      <div className="w-44 space-y-2.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="frame flex items-center gap-2.5 rounded-lg px-3.5 py-3"
            style={{ boxShadow: i === 0 ? '0 0 16px rgba(124,58,237,0.35)' : undefined }}
          >
            <span className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-haze' : 'bg-brand/60'}`} style={i === 0 ? { boxShadow: '0 0 8px rgba(167,139,250,0.9)' } : undefined} />
            <span className="h-1.5 w-20 rounded-full bg-snow/35" />
            <span className="ml-auto flex gap-1">
              <span className="h-3.5 w-1 rounded-full bg-brand/55" />
              <span className="h-3.5 w-1 rounded-full bg-brand/75" />
              <span className="h-3.5 w-1 rounded-full bg-haze" style={{ boxShadow: '0 0 4px rgba(167,139,250,0.6)' }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const SERVICES = [
  {
    title: 'Webs que trabajan',
    tag: 'Desarrollo Web',
    desc: 'Bonitas, claro. Pero sobre todo rápidas, medibles y hechas para convertir.',
    Art: ArtWeb,
  },
  {
    title: 'Apps que nadie borra',
    tag: 'Aplicaciones Móviles',
    desc: 'Nativas o multiplataforma. Fluidas para tus usuarios, estables para tu operación.',
    Art: ArtMovil,
  },
  {
    title: 'Adiós a las hojas de cálculo heroicas',
    tag: 'Sistemas Empresariales',
    desc: 'ERP, CRM y plataformas a medida que ponen orden donde hoy hay correos y Excel.',
    Art: ArtSistemas,
  },
  {
    title: 'IA que produce, no que presume',
    tag: 'Inteligencia Artificial',
    desc: 'Predicción, lenguaje y visión aplicados a problemas reales de tu negocio.',
    Art: ArtIA,
  },
  {
    title: 'Procesos que se hacen solos',
    tag: 'Automatización',
    desc: 'Lo repetitivo, para las máquinas. Tu equipo, libre para lo importante.',
    Art: ArtAuto,
  },
  {
    title: 'Infraestructura que no se cae',
    tag: 'Cloud',
    desc: 'Despliegues continuos, costes bajo control y disponibilidad del 99,99 %.',
    Art: ArtCloud,
  },
]

export default function ServicesGrid() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-svc-head] > *', {
          y: 28,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 75%' },
        })
        gsap.utils.toArray('[data-tile]').forEach((tile, i) => {
          gsap.from(tile, {
            y: 56,
            opacity: 0,
            duration: 0.9,
            delay: (i % 3) * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: tile, start: 'top 88%' },
          })
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="servicios" ref={root} data-spine data-spine-label="Capacidades" className="relative py-28 md:py-36 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vw] w-[70vw] max-h-[900px] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.1), transparent 65%)', filter: 'blur(60px)' }}
      />
      <div className="container-site">
        <div data-svc-head className="max-w-3xl">
          <p className="eyebrow mb-6">Tecnología que funciona. Punto.</p>
          <h2 className="text-[clamp(2rem,4.8vw,3.6rem)] font-semibold leading-[1.07] tracking-display text-snow">
            Todo lo que tu negocio necesita, <span className="text-mist">en un solo equipo.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ title, tag, desc, Art }) => (
            <a key={tag} href="#contacto" data-tile className="tile group flex flex-col focus-visible:outline-haze">
              <div className="h-56 overflow-hidden">
                <Art />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-[10.5px] uppercase tracking-label text-brand">{tag}</p>
                <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-snow">{title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-mist">{desc}</p>
                <span className="tile-cta mt-5 inline-flex items-center gap-2 text-sm font-medium text-snow">
                  Ver más
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

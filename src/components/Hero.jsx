import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const WORDS = ['software a medida', 'datos', 'inteligencia artificial', 'automatización']

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Palabras rotativas — todas ocultas al inicio
        const words = gsap.utils.toArray('[data-word-item]')
        gsap.set(words, { yPercent: 110, opacity: 0 })

        // Entrada del hero — words[0] entra igual que las demás (fromTo suave)
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('[data-hero-eyebrow]', { y: 18, opacity: 0, duration: 0.7, delay: 0.1 })
          .from('[data-hero-line]', { yPercent: 110, duration: 1, stagger: 0.1, ease: 'power4.out' }, '-=0.4')
          .from('[data-hero-sub]', { y: 22, opacity: 0, duration: 0.8 }, '-=0.5')
          .from('[data-hero-cta] > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.5')
          .fromTo(words[0], { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, '-=0.2')

        // Rotación — empieza tras el hero + 1s de pausa. Todas las palabras tienen el mismo gap
        const rot = gsap.timeline({ repeat: -1, delay: tl.duration() + 1.0 })
        words.forEach((w, i) => {
          const next = words[(i + 1) % words.length]
          rot
            .to(w, { yPercent: -110, opacity: 0, duration: 0.55, ease: 'power3.in' }, `+=3.5`)
            .fromTo(next, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, '<0.1')
        })

        // Parallax de salida
        gsap.to('[data-hero-inner]', {
          yPercent: -6,
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} data-spine data-spine-label="Inicio" className="relative flex min-h-[92svh] items-center overflow-hidden">
      {/* Luces ambientales — alta visibilidad */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="glow animate-drift-a left-[-8%] top-[-15%] h-[60vw] w-[60vw] max-h-[820px] max-w-[820px]"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.42), transparent 65%)' }}
        />
        <div
          className="glow animate-drift-b bottom-[-20%] right-[-8%] h-[52vw] w-[52vw] max-h-[740px] max-w-[740px]"
          style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.32), transparent 65%)' }}
        />
        <div
          className="glow animate-drift-a left-1/2 top-1/2 h-[40vw] w-[40vw] max-h-[560px] max-w-[560px] -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.18), transparent 65%)' }}
        />
      </div>

      <div data-hero-inner className="container-site relative z-10 pb-20 pt-40">
        <p data-hero-eyebrow className="eyebrow mb-8">
          Byco · Partner tecnológico
        </p>

        <h1 className="max-w-4xl text-[clamp(2.8rem,7.2vw,6.2rem)] font-semibold leading-[1.04] tracking-display text-snow">
          <span className="block overflow-hidden">
            <span data-hero-line className="block">Impulsamos los resultados</span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block">de tu negocio integrando</span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block">
              <span className="relative inline-grid overflow-hidden align-top" aria-hidden="true">
                {WORDS.map((w, i) => (
                  <span
                    key={w}
                    data-word-item
                    className="text-glint col-start-1 row-start-1 whitespace-nowrap"
                  >
                    {w}.
                  </span>
                ))}
              </span>
              <span className="sr-only">software a medida, datos, inteligencia artificial y automatización.</span>
            </span>
          </span>
        </h1>

        <p data-hero-sub className="mt-9 max-w-2xl text-base leading-relaxed text-mist md:text-lg">
          Tu socio tecnológico: ingeniería, datos e innovación trabajando juntos. Analizamos tu
          modelo de negocio y construimos exactamente lo que necesitas para crecer.
        </p>

        <div data-hero-cta className="mt-11 flex flex-wrap items-center gap-4">
          <a href="#contacto" className="btn-primary">
            Hablemos de tu proyecto
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
          <a href="#casos" className="btn-ghost">
            Ver casos de éxito
          </a>
        </div>
      </div>
    </section>
  )
}

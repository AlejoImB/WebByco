import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-cta] > *', {
          y: 34,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 75%' },
        })
        gsap.fromTo(
          '[data-cta-glow]',
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: root.current, start: 'top 70%' },
          }
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contacto" ref={root} data-spine data-spine-label="Contacto" className="relative overflow-hidden py-36 md:py-44 border-t" style={{ borderColor: 'rgba(124,58,237,0.2)' }}>
      {/* Aurora dramática centrada */}
      <div
        data-cta-glow
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vw] max-h-[900px] w-[70vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(167,139,250,0.2) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[35vw] max-h-[480px] w-[35vw] max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(167,139,250,0.35) 0%, transparent 65%)',
          filter: 'blur(30px)',
        }}
      />
      <div data-cta className="container-site relative z-10 flex flex-col items-center text-center">
        <p className="eyebrow mb-7">¿Empezamos?</p>
        <h2 className="max-w-4xl text-[clamp(2.1rem,5.2vw,4.2rem)] font-semibold leading-[1.08] tracking-display text-snow">
          ¿Tienes una idea, un reto o un objetivo{' '}
          <span className="text-glint">que no puede esperar?</span>
        </h2>
        <p className="mt-7 max-w-md text-base leading-relaxed text-mist">
          Cuéntanoslo en una llamada de 30 minutos con nuestro equipo de ingeniería. Sin
          compromiso y sin guion comercial.
        </p>
        <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
          <a href="mailto:hola@axioma.dev" className="btn-primary">
            Hablemos de tu proyecto
          </a>
          <a href="tel:+34925000000" className="btn-ghost">
            O llámanos: 925 00 00 00
          </a>
        </div>
        <p className="mt-9 font-mono text-[11px] uppercase tracking-label text-mist/60">
          Respuesta en menos de 24 horas
        </p>
      </div>
    </section>
  )
}

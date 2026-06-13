import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TEXT =
  'La mayoría del software se construye para salir del paso. El nuestro se construye para durar: cada línea de código es una decisión de ingeniería, y cada decisión, una promesa que mantenemos en producción.'

export default function Manifesto() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-word]',
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.6,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top 72%',
              end: 'bottom 45%',
              scrub: 0.4,
            },
          }
        )
        gsap.from('[data-manifesto-rule]', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: root.current, start: 'top 80%' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} aria-label="Manifiesto" className="relative py-32 md:py-44">
      <div className="container-site">
        <div data-manifesto-rule className="hairline mb-14 w-full" aria-hidden="true" />
        <p className="eyebrow mb-10">Manifiesto</p>
        <p className="max-w-4xl text-[clamp(1.6rem,3.6vw,3rem)] font-medium leading-[1.28] tracking-tight text-snow">
          {TEXT.split(' ').map((w, i) => (
            <span key={i} data-word className="inline">
              {w}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

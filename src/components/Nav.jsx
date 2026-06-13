import { useEffect, useRef, useState } from 'react'

const LINKS = [
  { href: '#capacidades', label: 'Capacidades' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#ia', label: 'IA' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth ${
        scrolled
          ? 'border-b border-mist/10 bg-ink/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Principal" className="container-site flex h-[72px] items-center justify-between">
        <a href="#contenido" className="flex items-center gap-2.5" aria-label="Byco — inicio">
          <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16 5 L27 27 H21.8 L16 14.8 L10.2 27 H5 Z" fill="#9395D3" />
            <circle cx="16" cy="25" r="2.4" fill="#B3B7EE" />
          </svg>
          <span className="text-[15px] font-semibold tracking-tight text-snow">Byco</span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[13.5px] text-mist transition-colors duration-300 hover:text-snow"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a href="#contacto" className="btn-primary !px-5 !py-2.5 text-[13px]">
            Iniciar proyecto
          </a>
        </div>

        {/* Menú móvil */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-snow md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <path d="M2 6 H18 M2 14 H18" stroke="currentColor" strokeWidth="1.5" />
            )}
          </svg>
        </button>
      </nav>

      <div
        id="menu-movil"
        ref={menuRef}
        className={`md:hidden ${open ? 'block' : 'hidden'} border-t border-mist/10 bg-ink/95 backdrop-blur-xl`}
      >
        <ul className="container-site flex flex-col gap-1 py-4">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-3 text-[15px] text-mist transition-colors hover:text-snow"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a href="#contacto" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">
              Iniciar proyecto
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

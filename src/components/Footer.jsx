const COLUMNS = [
  {
    title: 'Servicios',
    links: [
      { label: 'Desarrollo Web', href: '#servicios' },
      { label: 'Aplicaciones Móviles', href: '#servicios' },
      { label: 'Sistemas Empresariales', href: '#servicios' },
      { label: 'Inteligencia Artificial', href: '#ia' },
      { label: 'Automatización', href: '#automatizacion' },
      { label: 'Cloud', href: '#servicios' },
    ],
  },
  {
    title: 'Compañía',
    links: [
      { label: 'Casos de éxito', href: '#casos' },
      { label: 'Testimonios', href: '#contenido' },
      { label: 'Contacto', href: '#contacto' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Aviso legal', href: '#' },
      { label: 'Política de privacidad', href: '#' },
      { label: 'Política de cookies', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative z-10" style={{ borderTop: '1px solid rgba(124,58,237,0.25)' }}>
      {/* Guiño de fin de scroll */}
      <div className="py-7 text-center" style={{ borderBottom: '1px solid rgba(124,58,237,0.18)' }}>
        <p className="font-mono text-[11px] uppercase tracking-label text-haze/55">
          Fin del scroll. Ahora te toca a ti ;)
        </p>
      </div>

      <div className="container-site py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <a href="#contenido" className="flex items-center gap-2.5" aria-label="Byco — inicio">
              <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M16 5 L27 27 H21.8 L16 14.8 L10.2 27 H5 Z" fill="#9395D3" />
                <circle cx="16" cy="25" r="2.4" fill="#B3B7EE" />
              </svg>
              <span className="text-[15px] font-semibold tracking-tight text-snow">Byco</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
              Tu partner tecnológico: software a medida, datos e inteligencia artificial que dan
              resultados.
            </p>
            <p className="mt-6 text-sm text-mist">
              Si lo prefieres, llámanos:{' '}
              <a href="tel:+34925000000" className="font-medium text-snow transition-colors hover:text-haze">
                925 00 00 00
              </a>
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-label text-mist/50">
              Madrid · Bogotá · CDMX
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[11px] font-medium uppercase tracking-label text-mist/60">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-mist transition-colors duration-300 hover:text-snow"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 pt-7 sm:flex-row sm:items-center sm:justify-between" style={{ borderTop: '1px solid rgba(124,58,237,0.18)' }}>
          <p className="text-xs text-mist/60">© {new Date().getFullYear()} Byco. Todos los derechos reservados.</p>
          <p className="font-mono text-[10px] uppercase tracking-label text-mist/40">
            Diseñado y construido internamente — sin plantillas
          </p>
        </div>
      </div>
    </footer>
  )
}

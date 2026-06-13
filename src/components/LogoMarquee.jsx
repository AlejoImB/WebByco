const CLIENTS = [
  'Banco Atlas',
  'NORDIKA',
  'Vector Salud',
  'Grupo Mirlo',
  'Helio Energía',
  'Universidad Andina',
  'Kappa Foods',
  'Ayto. de Riberalta',
  'Faro Seguros',
  'Talavera Móvil',
]

export default function LogoMarquee() {
  return (
    <section aria-label="Empresas que confían en nosotros" className="relative py-9" style={{ borderTop: '1px solid rgba(124,58,237,0.2)', borderBottom: '1px solid rgba(124,58,237,0.2)' }}>
      <div className="marquee overflow-hidden" role="presentation">
        <div className="marquee-track items-center gap-16 pr-16">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span
              key={i}
              aria-hidden={i >= CLIENTS.length}
              className="whitespace-nowrap text-lg font-semibold tracking-tight text-mist/65 transition-colors duration-300 hover:text-snow md:text-xl"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      <p className="container-site mt-6 font-mono text-[10.5px] uppercase tracking-label text-haze/50">
        Confían en nosotros desde 2016
      </p>
    </section>
  )
}

import { useState, useEffect, useRef } from 'react'

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [contrast, setContrast] = useState(() => {
    return localStorage.getItem('accessibility-contrast') === 'true'
  })
  const [zoom, setZoom] = useState(() => {
    const saved = localStorage.getItem('accessibility-zoom')
    return saved ? parseInt(saved, 10) : 100
  })

  const widgetRef = useRef(null)

  // Aplicar Alto Contraste
  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', contrast)
    localStorage.setItem('accessibility-contrast', contrast.toString())
  }, [contrast])

  // Aplicar Zoom de Maquetación
  useEffect(() => {
    document.documentElement.style.fontSize = `${zoom}%`
    localStorage.setItem('accessibility-zoom', zoom.toString())
  }, [zoom])

  // Cerrar al hacer clic fuera o presionar Escape
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const increaseZoom = () => {
    setZoom((z) => Math.min(z + 10, 140))
  }

  const decreaseZoom = () => {
    setZoom((z) => Math.max(z - 10, 100))
  }

  const resetAccessibility = () => {
    setContrast(false)
    setZoom(100)
  }

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 font-sans accessibility-widget">
      {/* Panel Desplegable */}
      {isOpen && (
        <div 
          className="absolute bottom-16 right-0 w-64 rounded-2xl border border-mist/20 bg-ink/90 p-5 shadow-2xl backdrop-blur-xl"
          style={{ boxShadow: '0 20px 50px -10px rgba(0,0,0,0.8)' }}
        >
          <div className="flex items-center justify-between border-b border-mist/10 pb-3 mb-4">
            <h4 className="text-sm font-semibold tracking-tight text-snow">Accesibilidad</h4>
            <button 
              onClick={resetAccessibility}
              className="text-[11px] font-mono uppercase tracking-wider text-haze transition-colors hover:text-snow"
              aria-label="Restablecer accesibilidad"
            >
              Resetear
            </button>
          </div>

          <div className="space-y-4">
            {/* Control de Alto Contraste */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-mist font-medium">Alto Contraste</span>
              <button
                type="button"
                onClick={() => setContrast((c) => !c)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
                  contrast ? 'bg-brand' : 'bg-mist/30'
                }`}
                aria-label="Alternar alto contraste"
                aria-pressed={contrast}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-snow shadow ring-0 transition duration-300 ease-in-out ${
                    contrast ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Control de Zoom (100% a 140%) */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-mist font-medium">Zoom (100% - 140%)</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseZoom}
                  disabled={zoom <= 100}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-mist/20 bg-snow/5 text-sm font-bold text-snow transition-all hover:bg-snow/15 disabled:opacity-30 disabled:hover:bg-snow/5"
                  aria-label="Disminuir tamaño de texto"
                >
                  −
                </button>
                <span className="min-w-[3rem] text-center text-xs font-mono font-semibold text-snow">
                  {zoom}%
                </span>
                <button
                  onClick={increaseZoom}
                  disabled={zoom >= 140}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-mist/20 bg-snow/5 text-sm font-bold text-snow transition-all hover:bg-snow/15 disabled:opacity-30 disabled:hover:bg-snow/5"
                  aria-label="Aumentar tamaño de texto"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botón Principal Flotante */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-brand/30 bg-brand/20 text-snow shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-brand/35 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-brand"
        aria-label="Menú de accesibilidad"
        aria-expanded={isOpen}
      >
        <svg 
          width="22" 
          height="22" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="5" r="1" />
          <path d="m9 20 1-5h4l1 5" />
          <path d="m5 10 7 3 7-3" />
          <path d="m12 8v7" />
        </svg>
      </button>
    </div>
  )
}

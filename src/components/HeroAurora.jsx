export default function HeroAurora({ className = '' }) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} aria-hidden="true">
      {/* Blob 1 — núcleo violeta vibrante */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '15%',
          width: '60%',
          height: '58%',
          borderRadius: '60% 40% 55% 45% / 55% 45% 55% 45%',
          background: 'radial-gradient(circle at 40% 50%, rgba(124,58,237,0.92), rgba(109,40,217,0.55) 45%, transparent 70%)',
          filter: 'blur(38px)',
          animation: 'aurora-blob-a 9s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Blob 2 — halo lavanda */}
      <div
        style={{
          position: 'absolute',
          top: '28%',
          left: '30%',
          width: '52%',
          height: '52%',
          borderRadius: '40% 60% 65% 35% / 60% 35% 65% 40%',
          background: 'radial-gradient(circle at 55% 45%, rgba(167,139,250,0.75), rgba(139,92,246,0.38) 48%, transparent 70%)',
          filter: 'blur(32px)',
          animation: 'aurora-blob-b 12s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Blob 3 — acento índigo superior */}
      <div
        style={{
          position: 'absolute',
          top: '4%',
          left: '38%',
          width: '55%',
          height: '45%',
          borderRadius: '70% 30% 40% 60% / 45% 55% 45% 55%',
          background: 'radial-gradient(circle at 50% 60%, rgba(79,70,229,0.6), transparent 68%)',
          filter: 'blur(44px)',
          animation: 'aurora-blob-c 15s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Blob 4 — brillo central pequeño */}
      <div
        style={{
          position: 'absolute',
          top: '38%',
          left: '42%',
          width: '28%',
          height: '28%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,181,253,0.65), rgba(167,139,250,0.2) 50%, transparent 70%)',
          filter: 'blur(18px)',
          animation: 'aurora-blob-a 6s ease-in-out infinite reverse',
          willChange: 'transform',
        }}
      />

      {/* Blob 5 — destello inferior */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '40%',
          height: '38%',
          borderRadius: '55% 45% 50% 50% / 50% 60% 40% 50%',
          background: 'radial-gradient(circle at 40% 40%, rgba(124,58,237,0.5), transparent 65%)',
          filter: 'blur(40px)',
          animation: 'aurora-blob-b 10s ease-in-out infinite reverse',
          willChange: 'transform',
        }}
      />
    </div>
  )
}

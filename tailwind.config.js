/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#060412',      // fondo principal
        mist: '#9091AB',     // texto secundario
        brand: '#7C3AED',    // color de marca (vivid violet)
        haze: '#A78BFA',     // color de apoyo (vivid violet-400)
        snow: '#F5F3FF',     // texto principal
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        display: '-0.04em',
        label: '0.18em',
      },
      maxWidth: {
        site: '80rem',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

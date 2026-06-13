import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2018',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap'],
          three: ['three'],
          vendor: ['react', 'react-dom', 'lenis'],
        },
      },
    },
  },
})

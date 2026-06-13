import Spine from './components/Spine.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import LogoMarquee from './components/LogoMarquee.jsx'
import Manifesto from './components/Manifesto.jsx'
import Statement from './components/Statement.jsx'
import Services from './components/Services.jsx'
import Assembly from './components/Assembly.jsx'
import Showcase from './components/Showcase.jsx'
import Splits from './components/Splits.jsx'
import Testimonials from './components/Testimonials.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'
import { useSmoothScroll } from './hooks/useSmoothScroll.js'

export default function App() {
  useSmoothScroll()

  return (
    <div className="grain relative">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Spine />
      <Nav />
      <main id="contenido" className="relative z-10">
        <Hero />
        <LogoMarquee />
        <Manifesto />
        <Statement />
        <Services />
        <Assembly />
        <Showcase />
        <Splits />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

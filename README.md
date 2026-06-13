# Byco— Experiencia digital corporativa

Sitio de una sola página construido con React + Vite + Tailwind CSS + GSAP/ScrollTrigger + Lenis.
Dirección visual: minimalismo tecnológico premium sobre la paleta corporativa.

## Paleta

| Token   | Hex       | Uso                  |
| ------- | --------- | -------------------- |
| `ink`   | `#000807` | Fondo principal      |
| `mist`  | `#A2A3BB` | Texto secundario     |
| `brand` | `#9395D3` | Color de marca (luz) |
| `haze`  | `#B3B7EE` | Color de apoyo       |
| `snow`  | `#FBF9FF` | Texto principal      |

## Uso

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # build de producción en /dist
npm run preview  # previsualizar el build
```

## Arquitectura

```
src/
  hooks/useSmoothScroll.js   Lenis sincronizado con el ticker de GSAP
  components/
    Nav.jsx        Navegación fija con blur + menú móvil accesible
    Hero.jsx       Pantalla completa: luces ambientales, órbita, secuencia de entrada
    Manifesto.jsx  Declaración que se ilumina palabra a palabra (scrub)
    Services.jsx   Firma del sitio: diagrama de ecosistema SVG sticky;
                   cada capacidad activa su nodo y conexión al hacer scroll
    Assembly.jsx   Sección pinned: una interfaz se ensambla por fases
    Showcase.jsx   Proyectos con mockups CSS flotantes, perspectiva y parallax
    Metrics.jsx    Indicadores con contadores animados
    CTA.jsx        Cierre con luz ambiental
    Footer.jsx     Pie minimalista
```

## Decisiones técnicas

- **Sin Three.js.** El brief lo permitía solo si aportaba valor real; las formas
  ambientales y el diagrama del sistema se resuelven con SVG y CSS, con mejor
  rendimiento y el mismo nivel de sofisticación.
- **Movimiento reducido respetado de verdad.** Todas las animaciones viven dentro de
  `gsap.matchMedia('(prefers-reduced-motion: no-preference)')` y usan tweens `from`,
  de modo que con motion desactivado la página se renderiza completa y estática.
- **Mockups construidos en CSS/SVG**, no imágenes: cero assets pesados, nitidez en
  cualquier densidad de píxeles y fáciles de rebrandear.
- **Accesibilidad**: HTML semántico, skip-link, foco visible, `aria-label` en SVG
  informativos, decorativos con `aria-hidden`, menú móvil con `aria-expanded` y Escape.
- **SEO básico**: metadatos, Open Graph, canonical, `lang="es"` y JSON-LD de organización.

## Personalización rápida

- Marca y copy: cada componente contiene su contenido en constantes al inicio del archivo.
- Colores: `tailwind.config.js` (tokens) y variables en `src/index.css`.
- Dominio: actualizar `canonical` y Open Graph en `index.html`.

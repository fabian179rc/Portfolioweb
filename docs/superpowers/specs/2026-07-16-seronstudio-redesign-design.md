# SeronStudio — Rediseño completo del sitio

**Fecha:** 2026-07-16
**Estado:** Aprobado por usuario, pendiente de plan de implementación

## Contexto

El repositorio (`Portfolioweb`, remote `https://github.com/fabian179rc/Portfolioweb.git`) contiene hoy un catálogo React + Vite de una sola página (`src/App.jsx`, ~854 líneas, todo en un componente con estilos inline) para "Sistema Maestro HyS", un ecosistema de productos de Higiene y Seguridad Ocupacional.

El usuario quiere **reemplazar por completo** ese sitio por el portfolio de **SeronStudio**, su estudio de diseño y desarrollo web. El catálogo HyS desaparece del código (queda disponible en el historial de git). El usuario proveyó un prompt muy detallado (identidad de marca, paleta, tipografía, copy de las 9 secciones y lista de animaciones) que sirve como fuente de verdad de contenido y estilo.

## Decisiones tomadas

- **Alcance:** reemplazo total del sitio actual, no convivencia con el catálogo HyS.
- **Casos de portfolio:** se usan los 6 casos placeholder del prompt del usuario tal cual (Gastronomía, Legal, Salud, Inmobiliaria, Fitness, Servicios), listos para ser reemplazados por trabajos reales más adelante.
- **Imágenes de portfolio:** gradientes CSS (uno distintivo por caso), sin dependencia de servicios externos de imágenes.
- **Datos de contacto reales:**
  - Email: `soporte.seronstudio@gmail.com`
  - WhatsApp: `+5493412665657` (link `https://wa.me/5493412665657`)
- **Stack:** se mantiene React + Vite (base ya existente en el repo), dividiendo la UI en componentes por sección en vez de un solo archivo.
- **Formulario de contacto:** envía email real vía **Web3Forms** (gratuito, sin backend propio, sin SDK — un `fetch POST` a `https://api.web3forms.com/submit`). El usuario debe generar su `access_key` en web3forms.com con el email de arriba; hasta entonces queda como placeholder marcado en `src/data/config.js`. Pensado para poder swapear el endpoint por un CRM más adelante sin tocar la UI.

## Arquitectura

```
src/
  App.jsx                    # orquesta las secciones, sin lógica de negocio
  components/
    Cursor.jsx                # cursor personalizado (solo desktop, pointer:fine)
    Nav.jsx                   # sticky, backdrop-blur al hacer scroll
    Hero.jsx
    Ticker.jsx                 # banda infinita en loop, pausa al hover
    Metricas.jsx                # 4 counters + líneas divisoras animadas
    Portfolio.jsx                # grid de 6 casos
    PortfolioCard.jsx             # una card: número de fondo, gradiente, hover overlay
    Servicios.jsx                  # lista numerada con flecha al hover
    Filosofia.jsx                   # texto + lista de diferenciales
    Contacto.jsx                     # formulario + WhatsApp
    Footer.jsx
  hooks/
    useScrollReveal.js          # Intersection Observer → fade + slide-up genérico
    useCounter.js                # animación de conteo 0→N con requestAnimationFrame
  data/
    portfolio.js                  # los 6 casos (placeholder)
    servicios.js                   # los 5 servicios
    config.js                       # WEB3FORMS_ACCESS_KEY, contacto, WhatsApp
  styles/
    tokens.css                       # variables de color / tipografía
    global.css                        # reset, utilidades, keyframes compartidos
```

Se elimina el contenido de `src/App.jsx` actual (catálogo HyS) y los assets de `src/assets/products/` dejan de usarse (quedan en git history, no se borran del filesystem salvo que el usuario lo pida explícitamente en la implementación).

## Sistema de diseño

```css
--bg-primary: #0a0a0a;
--text-primary: #f5f5f0;
--accent: #c9a84c;
--bg-secondary: #1a1a1a;
--border-subtle: #2a2a2a;

--font-serif: 'Playfair Display', Georgia, serif;   /* títulos */
--font-sans: 'DM Sans', -apple-system, sans-serif;  /* cuerpo */
```

Ambas fuentes se cargan desde Google Fonts en `index.html`, reemplazando el link actual a Inter/Lora. El `<title>` y meta del `index.html` se actualizan a SeronStudio.

## Secciones (contenido = copy del prompt del usuario, sin reinterpretar)

1. **Nav** — sticky, transparente → fondo oscuro con blur al hacer scroll. Logo "SeronStudio" en serif, links a Portafolio/Servicios/Filosofía/Consulta, CTA "Iniciar Proyecto →" con borde dorado.
2. **Hero** — etiqueta "Aceptando proyectos — 2025", título de 3 líneas con slide-up secuencial al cargar ("Sitios web / que convierten. / Hechos a mano."), subtítulo, dos CTAs ("Ver Portfolio →", "WhatsApp Directo →" apuntando al wa.me real).
3. **Ticker** — banda dorada con texto negro en loop horizontal infinito (contenido duplicado para el loop), pausa al hover.
4. **Métricas** — 4 counters ("12+ Proyectos", "8 Industrias", "100% A Medida", "1:1 Atención Directa"), 4 cols desktop / 2×2 mobile, líneas divisoras animadas entre columnas.
5. **Portfolio** — grid 2 columnas desktop (1 columna mobile). Cada card: número decorativo de fondo (opacity 0.05), etiqueta de industria, nombre en serif, descripción 2 líneas, gradiente CSS con overlay oscuro, hover con leve brillo + botón "Ver Proyecto →". Los 6 casos placeholder del prompt.
6. **Servicios** — lista numerada (5 ítems) con línea separadora animada y flecha dorada deslizante al hover.
7. **Filosofía** — layout 2 columnas: texto grande a la izquierda (título + párrafo del prompt), lista de 5 diferenciales con punto dorado a la derecha.
8. **Contacto** — formulario numerado (Nombre, Email, Tipo de Proyecto, Contame sobre tu negocio) que envía vía Web3Forms; estados de carga/éxito/error. WhatsApp directo al lado. Nota "Respuesta personal en menos de 24hs."
9. **Footer** — logo, tagline, links, copyright 2025, "Por cita únicamente."

## Animaciones

- **Cursor personalizado**: círculo que sigue el mouse vía `transform: translate3d` (evita reflow), se agranda en hover sobre elementos interactivos. Desactivado con `@media (hover: hover) and (pointer: fine)` — no se monta en touch devices.
- **Scroll reveal**: `useScrollReveal` (Intersection Observer) aplica fade + `translateY` a elementos marcados al entrar en viewport. Reemplaza las animaciones `slideUp`/`fadeIn` hardcodeadas por delay del `App.jsx` actual.
- **Counter animation**: `useCounter` dispara con el mismo Observer, cuenta 0→N en ~1.2s con easing vía `requestAnimationFrame`.
- **Ticker**: `@keyframes marquee` puro CSS, `animation-play-state: paused` en `:hover`.
- **Portfolio card hover**: `transform: scale()` sobre el fondo + overlay con `opacity`, todo CSS transitions (sin JS extra por card).
- **Nav scroll**: clase que agrega `backdrop-filter: blur()` + fondo oscuro pasado cierto `scrollY`.
- **Smooth scroll**: `scroll-behavior: smooth` en `html` + anchors del nav a IDs de sección.

Sin librerías de animación externas (no Framer Motion, no GSAP) — todo con CSS + Intersection Observer + `requestAnimationFrame`, según pedido explícito del usuario.

## Fuera de alcance (explícitamente no incluido en esta iteración)

- Integración de CRM real (el usuario planea definirlo más adelante; Web3Forms es el paso intermedio).
- Contenido/imágenes reales de portfolio (se usan los 6 placeholders).
- Cualquier tipo de backend propio, base de datos o autenticación.
- Analytics, SEO avanzado más allá de meta tags básicos.
- Testing automatizado (no hay suite de tests en el proyecto hoy; no se introduce en este cambio salvo que se pida aparte).

## Verificación

- `npm run dev` y revisión manual en navegador: recorrido completo de las 9 secciones, cursor personalizado en desktop, scroll reveal, contador de métricas, ticker en loop con pausa al hover, hover de portfolio cards, envío de prueba del formulario (una vez cargado el `access_key` real de Web3Forms).
- `npm run build` sin errores.
- Responsive: verificar layout en mobile (grid de métricas 2×2, portfolio a 1 columna, nav/menu, cursor desactivado).

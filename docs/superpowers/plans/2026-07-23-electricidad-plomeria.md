# Caso de portfolio "Chispa & Caño 24hs" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el caso placeholder "06 — La Mano Confiable" del portfolio por una landing ficticia real ("Chispa & Caño 24hs", electricidad y plomería a domicilio, ángulo de urgencia 24hs), embebida como vista previa igual que los otros 5 casos.

**Architecture:** Página estática autocontenida (`public/casos/electricidad-plomeria/index.html`) sin build ni dependencias, servida directamente por Vite desde `public/`. Se referencia desde `src/data/portfolio.js`, que ya soporta el patrón `preview` → `<iframe>` en `PortfolioCard.jsx` / `PortfolioPreviewModal.jsx`. No hay lógica de negocio ni backend: es contenido de portfolio, no un sitio en producción.

**Tech Stack:** HTML5 + CSS inline (sin framework) + JS vanilla mínimo. Google Fonts. React/Vite solo para el sitio contenedor (no para este caso).

Repo no tiene test runner (`package.json` solo define `dev`/`build`/`preview`). La verificación de cada tarea es: `npm run build` sin errores + inspección visual en `npm run dev` (localhost). Esa es la sustitución válida de "tests" para este proyecto de contenido.

## Global Constraints

- No modificar ningún otro caso del array `portfolio.js` (spec: "Fuera de alcance").
- La página del caso debe ser un único archivo HTML autocontenido, sin paso de build (spec: "Implementación técnica").
- Debe terminar con el mismo script de bloqueo de clicks/submits que usan los demás casos, para que el `<iframe>` de preview no navegue (ver `public/casos/dentistas/index.html` líneas finales).
- CTA principal = llamada telefónica directa, no formulario (spec: "Objetivo de conversión").
- Paleta: fondo oscuro + acento ámbar (eléctrico) + acento azul (plomería) (spec: "Sistema de diseño").
- Marca ficticia "Chispa & Caño 24hs", sin ciudad específica (spec: "Concepto de contenido").

---

### Task 1: Construir la página estática del caso

**Files:**
- Create: `public/casos/electricidad-plomeria/index.html`

**Interfaces:**
- Produces: archivo servible en `/casos/electricidad-plomeria/index.html` (ruta pública de Vite, ya que todo lo que está en `public/` se sirve tal cual desde la raíz).

- [ ] **Step 1: Crear el archivo con boilerplate, metadatos y fuentes**

Crear `public/casos/electricidad-plomeria/index.html` con este arranque:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Chispa & Caño 24hs: electricistas y plomeros a domicilio, urgencias las 24 horas. Respuesta en menos de 60 minutos, presupuesto sin cargo."
    />
    <title>Chispa & Caño 24hs | Electricidad y Plomería de Urgencia</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <style>
      /* Step 2 agrega el CSS acá */
    </style>
  </head>
  <body>
    <!-- Step 3 agrega el contenido acá -->
    <script>
      (function () {
        document.addEventListener(
          "click",
          function (e) {
            var link = e.target.closest("a");
            if (link) e.preventDefault();
          },
          true
        );
        document.addEventListener(
          "submit",
          function (e) {
            e.preventDefault();
          },
          true
        );
      })();
    </script>
  </body>
</html>
```

- [ ] **Step 2: Escribir el CSS (design tokens + layout de todas las secciones)**

Reemplazar el comentario `/* Step 2 agrega el CSS acá */` por las reglas de estilo. Tokens base:

```css
:root {
  --bg: #0f0b05;
  --bg-alt: #1a130a;
  --amber: #f5a623;
  --amber-dark: #c9820f;
  --blue: #3b82f6;
  --text: #f5f1e8;
  --text-dim: #b8ae9c;
  --border: rgba(245, 166, 35, 0.18);
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, .brand { font-family: 'Manrope', sans-serif; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
.btn-call {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, var(--amber) 0%, var(--amber-dark) 100%);
  color: #1a1204;
  font-weight: 700;
  padding: 14px 28px;
  border-radius: 999px;
  text-decoration: none;
  font-size: 1rem;
}
```

Agregar después las reglas para: `header` (sticky, fondo `var(--bg-alt)`, logo + teléfono + botón), `.hero` (grid con titular grande, subtítulo, botón de llamada, badges de confianza), `.servicios` (grid de 2 columnas, tarjetas con borde `var(--border)`, una columna acentuada en ámbar para Electricidad y otra en azul para Plomería), `.diferenciales` (grid de 4 tarjetas con ícono/numero), `.como-funciona` (3 pasos horizontales conectados por una línea), `.testimonios` (3 tarjetas con estrellas ámbar), `.disponibilidad` (franja destacada 24/7 con fondo `var(--bg-alt)`), `.cta-final` (banner con `background: linear-gradient(135deg, var(--amber) 0%, var(--blue) 100%)` y texto oscuro), `footer` (fondo `var(--bg-alt)`, columnas de contacto y aclaración de matrícula). Incluir un `@media (max-width: 720px)` que pasa los grids a una columna y reduce el tamaño de titulares.

- [ ] **Step 3: Escribir el contenido HTML de las 9 secciones**

Reemplazar `<!-- Step 3 agrega el contenido acá -->` por el markup real, siguiendo el orden de la spec:

1. `<header>`: logo de texto "⚡ Chispa & Caño <span>24hs</span>", teléfono `+54 9 341 555-0134` visible, `<a class="btn-call" href="tel:+5493415550134">📞 Llamar ahora</a>`.
2. `<section class="hero">`: badge "Urgencias 24hs, los 365 días", `<h1>` ("Se te cortó la luz o se te rompió un caño?"), subtítulo ("Electricistas y plomeros matriculados a domicilio. Te atendemos en menos de 60 minutos."), botón de llamada grande, fila de 3 badges de confianza ("+12 años de experiencia", "Técnicos matriculados", "Seguro de responsabilidad civil").
3. `<section class="servicios">` con dos `<div class="servicio-col">`:
   - Electricidad: cortocircuitos y disyuntor que salta, tableros eléctricos, instalaciones nuevas, iluminación LED, emergencias por chispas u olor a quemado.
   - Plomería: pérdidas de agua, destapaciones de cañerías, reparación e instalación de calefones, instalaciones sanitarias, detección de pérdidas ocultas.
4. `<section class="diferenciales">` con 4 tarjetas: "Respuesta en -60 min", "Presupuesto sin cargo", "Técnicos matriculados", "Garantía escrita por 6 meses".
5. `<section class="como-funciona">` con 3 pasos: "1. Llamás — contanos qué pasó", "2. Diagnóstico en el lugar — sin compromiso", "3. Solución el mismo día — con garantía".
6. `<section class="testimonios">` con 3 reseñas cortas (5 estrellas cada una), ej: "Vinieron a las 40 minutos un domingo a la noche. Solucionaron el problema del tablero en el momento. — Marina G.".
7. `<section class="disponibilidad">`: texto grande "24/7 · Todos los días del año", subtítulo "Cobertura en toda la ciudad y zonas aledañas".
8. `<section class="cta-final">`: "¿Necesitás ayuda ahora?" + botón de llamada repetido + teléfono grande.
9. `<footer>`: teléfono, email ficticio `contacto@chispaycano24hs.com`, texto "Electricistas y plomeros matriculados. Seguro de responsabilidad civil vigente.", copyright "© 2026 Chispa & Caño 24hs".

- [ ] **Step 4: Verificar visualmente el archivo standalone**

Run: `start "" "public/casos/electricidad-plomeria/index.html"` (PowerShell: `Invoke-Item public/casos/electricidad-plomeria/index.html`) para abrirlo directo en el navegador.
Expected: la página carga sin errores de consola, las 9 secciones se ven, los botones de llamada tienen estilo, y al hacer click en cualquier link/botón no navega (el script anti-click lo bloquea).

- [ ] **Step 5: Commit**

```bash
git add public/casos/electricidad-plomeria/index.html
git commit -m "Agrega landing del caso Chispa & Caño 24hs (electricidad y plomería)"
```

---

### Task 2: Reemplazar el caso 06 en el portfolio y verificar en localhost

**Files:**
- Modify: `src/data/portfolio.js:51-59`

**Interfaces:**
- Consumes: `public/casos/electricidad-plomeria/index.html` de la Task 1 (ruta pública `/casos/electricidad-plomeria/index.html`).
- Produces: entrada de `portfolio` array consumida por `Portfolio.jsx` → `PortfolioCard.jsx` (sin cambios en esos componentes, ya soportan el campo `preview`).

- [ ] **Step 1: Levantar el servidor de desarrollo**

Run: `npm run dev`
Expected: Vite arranca y muestra una URL local, típicamente `http://localhost:5173/`.

- [ ] **Step 2: Editar la entrada del caso 06**

En `src/data/portfolio.js`, reemplazar el objeto actual (líneas 51-59):

```js
  {
    numero: "06",
    industria: "Servicios",
    nombre: "La Mano Confiable",
    descripcion:
      "Un sitio simple y directo que convierte visitas en llamadas para un negocio de servicios técnicos a domicilio.",
    gradient: "linear-gradient(135deg, #1a2a33 0%, #0a1216 100%)",
    url: "#",
  },
```

por:

```js
  {
    numero: "06",
    industria: "Servicios",
    nombre: "Chispa & Caño 24hs",
    descripcion:
      "Landing de urgencias para electricistas y plomeros a domicilio: llamada directa como CTA principal, respuesta en menos de 60 minutos y garantía escrita.",
    gradient: "linear-gradient(135deg, #2d2110 0%, #0f0b05 100%)",
    aspectRatio: "3 / 2",
    preview: "/casos/electricidad-plomeria/index.html",
  },
```

(El valor de `aspectRatio: "3 / 2"` es un punto de partida; el Step 3 lo ajusta a la proporción real observada en el navegador, igual que se hizo con los demás casos.)

- [ ] **Step 3: Verificar en el navegador y ajustar aspectRatio si hace falta**

Abrir `http://localhost:5173/` en el navegador, ir a la sección Portfolio, confirmar que la 6ª card muestra el `<iframe>` de la nueva landing con el gradiente ámbar de fondo mientras carga. Click en la card para abrir `PortfolioPreviewModal` y confirmar que la landing completa se ve dentro del modal, sin scroll horizontal ni contenido cortado de forma extraña. Si el recorte del iframe en la card se ve mal (contenido cortado a la mitad de una sección en vez de mostrar el hero), ajustar `aspectRatio` en `portfolio.js` (por ejemplo `"4 / 3"` o `"16 / 10"`) hasta que el hero se vea completo en la card, y volver a revisar.

- [ ] **Step 4: Verificar el build de producción**

Run: `npm run build`
Expected: build termina sin errores (exit code 0), sin warnings sobre `portfolio.js`.

- [ ] **Step 5: Commit**

```bash
git add src/data/portfolio.js
git commit -m "Reemplaza el caso 06 (La Mano Confiable) por Chispa & Caño 24hs"
```

---

## Self-Review Notes

- Cobertura de spec: las 9 secciones de contenido (Task 1 Step 3), la paleta ámbar+azul (Task 1 Step 2), el CTA de llamada como objetivo principal (Task 1 Step 3 sección 2 y 8), el script anti-navegación (Task 1 Step 1), y el reemplazo in-place del caso 06 sin tocar otros casos (Task 2 Step 2, Global Constraints) están todos cubiertos.
- No hay placeholders: todo el copy de Task 1 Step 3 está escrito completo, no hay "TBD".
- `aspectRatio` es el único valor no cerrado de antemano porque depende de una medición visual real (igual que en los 5 casos anteriores) — el Step 3 de Task 2 da el criterio exacto para ajustarlo, no es un placeholder abierto.

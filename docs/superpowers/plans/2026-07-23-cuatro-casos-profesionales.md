# Cuatro Casos Profesionales Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar 4 casos nuevos al portfolio (07-10): Abogados ("Bianchi & Asociados"), Inmobiliaria ("Horizonte Propiedades"), Veterinaria ("Vitalpet") y Psicólogos ("Espacio Psicológico"), cada uno como página estática autocontenida embebida en la grilla de portfolio.

**Architecture:** Mismo patrón que el caso 06 (`public/casos/electricidad-plomeria/index.html`): un `index.html` autocontenido por caso en `public/casos/<slug>/`, sin build ni dependencias, referenciado desde `src/data/portfolio.js` vía el campo `preview`. `PortfolioCard.jsx` / `PortfolioPreviewModal.jsx` no cambian — ya soportan el patrón.

**Tech Stack:** HTML5 + CSS inline (custom properties por caso) + JS vanilla mínimo. Google Fonts. Reutiliza la misma arquitectura CSS que `public/casos/electricidad-plomeria/index.html` (reset, `.container`, sistema de botones, grids de servicios/diferenciales/testimonios, header sticky, footer), cambiando tokens de color y contenido por caso.

Repo no tiene test runner. La verificación de cada tarea es: abrir el HTML standalone en el navegador (sin errores de consola, secciones completas) + al final, `npm run build` sin errores + inspección visual en `npm run dev`.

## Global Constraints

- No modificar los casos 01-06 existentes en `portfolio.js` (spec: "Decisión de alcance").
- Cada página es un único archivo HTML autocontenido, sin paso de build (spec: "Implementación técnica").
- Cada página termina con el mismo script de bloqueo de clicks/submits que los demás casos (ver `public/casos/electricidad-plomeria/index.html`, últimas 20 líneas).
- Abogados e Inmobiliaria: CTA principal = WhatsApp + acción secundaria específica (formulario de consulta / tasación), NO botón de llamada como eje central.
- Veterinaria: doble CTA — WhatsApp para turnos + llamada para emergencias.
- Psicólogos: tono bajo, sin urgencia, CTA "Escribime" — y fondo **claro** (única excepción intencional al fondo oscuro que usan los demás casos, ver spec sección 10).
- Paletas exactas (spec):
  - Abogados: `--navy: #0d1b2e`, `--gold: #c9a24b`
  - Inmobiliaria: `--graphite: #1c1815`, `--terracotta: #c4693a`
  - Veterinaria: `--teal: #0f3d3e`, `--peach: #f2a679`
  - Psicólogos: `--sage: #4a5a45`, `--cream: #ece3d3`

---

### Task 1: Página estática — Abogados ("Bianchi & Asociados")

**Files:**
- Create: `public/casos/abogados/index.html`

**Interfaces:**
- Produces: archivo servible en `/casos/abogados/index.html`.

- [ ] **Step 1: Crear el archivo reutilizando la arquitectura CSS de `electricidad-plomeria`**

Copiar la estructura de `public/casos/electricidad-plomeria/index.html` (boilerplate `<head>`, reset, `.container`, sistema `.btn-call`, `header` sticky, secciones con `.section-title`/`.section-subtitle`, grids de tarjetas, `footer`, script anti-navegación final) y adaptar:
- `<title>`: "Bianchi & Asociados | Estudio Jurídico"
- meta description: "Bianchi & Asociados: estudio jurídico especializado en derecho laboral, familia y accidentes de tránsito. Primera consulta sin cargo."
- Tokens de color: `--bg: #0d1b2e; --bg-alt: #142235; --bg-card: #111f30; --gold: #c9a24b; --gold-dark: #a9843a; --text: #f2ede1; --text-dim: #b7bdc9; --border: rgba(201, 162, 75, 0.2);`
- Renombrar clases de botón/acento reutilizando el mismo patrón visual (`.btn-call` → mantener nombre de clase para no romper el copy-paste de estilos, pero el texto y el `href` cambian a WhatsApp: `href="https://wa.me/5493415550200"`).

- [ ] **Step 2: Escribir el contenido de las secciones**

1. Header: logo "⚖ Bianchi & Asociados", botón "💬 Consulta por WhatsApp" (WhatsApp, no teléfono).
2. Hero: badge "Primera consulta sin cargo", `<h1>` "Defendemos tus derechos con la experiencia que necesitás", subtítulo "Más de 15 años asesorando en derecho laboral, familia y accidentes de tránsito.", botón WhatsApp + botón secundario "Ver áreas de práctica" (ancla a la sección de áreas), badges de confianza: "+15 años de trayectoria", "+400 casos resueltos", "Colegio de Abogados matriculado".
3. Áreas de práctica (grid 2x2 o 4 columnas, mismo patrón que `.servicios-grid`/`.diferenciales-grid`): Derecho Laboral (despidos, indemnizaciones, accidentes de trabajo), Derecho de Familia (divorcios, alimentos, sucesiones), Accidentes de Tránsito (reclamos a aseguradoras, daños y perjuicios), Derecho Civil y Comercial (contratos, deudas, defensa del consumidor).
4. Por qué elegirnos (4 tarjetas, mismo patrón `.diferenciales-grid`): "Primera consulta sin cargo", "+15 años de trayectoria", "Seguimiento personalizado del caso", "Honorarios claros, sin sorpresas".
5. Testimonios (3 tarjetas con estrellas): reseñas cortas centradas en resultado del caso, ej. "Me asesoraron en todo el proceso de mi despido y conseguimos una indemnización justa. — Roberto A.", "Llevaron mi sucesión de principio a fin sin que tuviera que preocuparme por nada. — Susana M.", "Rapidez y claridad en cada paso del reclamo por el accidente. — Julián F.".
6. Equipo breve: 2 tarjetas simples con iniciales en círculo (sin foto real), nombre ficticio y especialidad, ej. "M.B. — Dra. Mariana Bianchi, Derecho Laboral y Familia" / "R.C. — Dr. Rodrigo Camino, Derecho Civil y Accidentes".
7. CTA final: "¿Tenés una consulta legal?" + botón WhatsApp + texto "Respondemos en el día".
8. Footer: WhatsApp, email `contacto@bianchiasociados.com.ar`, texto legal "Tomo 45 Folio 112 — Colegio de Abogados", copyright "© 2026 Bianchi & Asociados".

- [ ] **Step 3: Verificar visualmente el archivo standalone**

Run (PowerShell): `Invoke-Item public/casos/abogados/index.html`
Expected: carga sin errores de consola, las 8 secciones se ven, paleta azul marino + dorado consistente, los links no navegan (bloqueados por el script anti-click).

- [ ] **Step 4: Commit**

```bash
git add public/casos/abogados/index.html
git commit -m "Agrega landing del caso Bianchi & Asociados (abogados)"
```

---

### Task 2: Página estática — Inmobiliaria ("Horizonte Propiedades")

**Files:**
- Create: `public/casos/inmobiliaria/index.html`

**Interfaces:**
- Produces: archivo servible en `/casos/inmobiliaria/index.html`.

- [ ] **Step 1: Crear el archivo reutilizando la arquitectura CSS de `electricidad-plomeria`**

Misma base que Task 1 Step 1, adaptando:
- `<title>`: "Horizonte Propiedades | Venta, Alquiler y Tasaciones"
- meta description: "Horizonte Propiedades: venta, alquiler y tasación gratuita de propiedades. Encontrá tu próximo hogar o inversión."
- Tokens: `--bg: #1c1815; --bg-alt: #241f1a; --bg-card: #201b17; --terracotta: #c4693a; --terracotta-dark: #a4522a; --text: #f3ece3; --text-dim: #bfb2a3; --border: rgba(196, 105, 58, 0.2);`
- CTA principal a WhatsApp (`href="https://wa.me/5493415550300"`).

- [ ] **Step 2: Escribir el contenido de las secciones**

1. Header: logo "🏠 Horizonte Propiedades", botón "💬 Hablar por WhatsApp".
2. Hero: badge "Tasación 100% gratuita", `<h1>` "Encontrá el lugar donde va a empezar tu próxima etapa", subtítulo "Venta, alquiler e inversión inmobiliaria con acompañamiento en cada paso.", botón WhatsApp + botón secundario "Tasá tu propiedad", badges: "+300 propiedades operadas", "Matrícula CUCICBA", "Tasación sin cargo en 48hs".
3. Propiedades destacadas (grid de 4 tarjetas, cada una con: bloque de gradiente CSS como imagen placeholder, badge "En venta" o "En alquiler", título tipo "Departamento 2 ambientes — Centro", precio ficticio en USD o $, íconos de ambientes/m²): ej. "Depto 2 amb. — Centro · USD 78.000 · 2 amb · 52m²", "Casa 3 dorm. — Zona Norte · USD 145.000 · 3 dorm · 180m²", "PH a estrenar — Barrio Sur · USD 92.000 · 3 amb · 95m²", "Local comercial — Av. Principal · Alquiler $450.000/mes · 60m²".
4. Servicios (4 tarjetas): Venta de propiedades, Alquileres (con garantía), Tasaciones gratuitas, Asesoramiento en inversión.
5. Por qué elegirnos (4 tarjetas): "Tasación gratuita en 48hs", "Acompañamiento en toda la operación", "Cartera de +300 propiedades", "Matriculados en CUCICBA".
6. Testimonios (3): centrados en el proceso de venta/compra, ej. "Vendieron mi departamento en menos de un mes al precio que esperaba. — Nicolás T.", "Nos ayudaron a encontrar la casa ideal para la familia sin apuro. — Familia Ledesma", "La tasación fue rápida y muy profesional. — Agustina V.".
7. CTA final: "¿Querés tasar tu propiedad?" + botón WhatsApp + texto "Sin cargo, sin compromiso".
8. Footer: WhatsApp, email `info@horizontepropiedades.com.ar`, "Matrícula CUCICBA N° 8821", copyright "© 2026 Horizonte Propiedades".

- [ ] **Step 3: Verificar visualmente el archivo standalone**

Run (PowerShell): `Invoke-Item public/casos/inmobiliaria/index.html`
Expected: carga sin errores, grid de propiedades se ve con 4 tarjetas, paleta grafito + terracota consistente, links bloqueados.

- [ ] **Step 4: Commit**

```bash
git add public/casos/inmobiliaria/index.html
git commit -m "Agrega landing del caso Horizonte Propiedades (inmobiliaria)"
```

---

### Task 3: Página estática — Veterinaria ("Vitalpet")

**Files:**
- Create: `public/casos/veterinaria/index.html`

**Interfaces:**
- Produces: archivo servible en `/casos/veterinaria/index.html`.

- [ ] **Step 1: Crear el archivo reutilizando la arquitectura CSS de `electricidad-plomeria`**

Misma base, adaptando:
- `<title>`: "Vitalpet | Veterinaria — Turnos y Urgencias"
- meta description: "Vitalpet: veterinaria con turnos online y atención de urgencias. Cuidamos a tu mascota como parte de la familia."
- Tokens: `--bg: #0f3d3e; --bg-alt: #133f40; --bg-card: #103537; --peach: #f2a679; --peach-dark: #d98858; --text: #f3ede4; --text-dim: #b9d3d2; --border: rgba(242, 166, 121, 0.22);`
- Doble CTA: botón WhatsApp para turnos (`href="https://wa.me/5493415550400"`) + botón de llamada para emergencias (`href="tel:+5493415550400"`).

- [ ] **Step 2: Escribir el contenido de las secciones**

1. Header: logo "🐾 Vitalpet", botón "💬 Sacar turno".
2. Hero: badge "Urgencias las 24hs", `<h1>` "Cuidamos a tu mascota como parte de tu familia", subtítulo "Consultas, vacunación, cirugías y atención de urgencias con turno online.", dos botones lado a lado: "💬 Sacar turno por WhatsApp" y "📞 Emergencia: (341) 555-0400", badges: "+18 años de experiencia", "Guardia de urgencias 24hs", "Veterinarios matriculados".
3. Servicios (grid de 5 tarjetas): Consultas clínicas, Vacunación y desparasitación, Cirugías, Internación, Peluquería y estética.
4. Por qué elegirnos (4 tarjetas): "Turnos online sin esperas", "Guardia de urgencias 24hs", "Equipamiento propio de diagnóstico", "Trato cercano y personalizado".
5. Testimonios (3, mencionando el nombre de la mascota): ej. "Atendieron a Rocco un domingo a la noche sin dudarlo. — Valeria S. (dueña de Rocco)", "El seguimiento post cirugía de Milo fue impecable. — Ezequiel N. (dueño de Milo)", "Siempre nos explican todo con calma antes de cada tratamiento. — Family Duarte (dueños de Cleo)".
6. Franja de emergencias 24hs (mismo patrón `.disponibilidad`): "24/7 · Guardia de urgencias todos los días", "Atendemos emergencias en el momento, sin turno previo".
7. CTA final: "¿Tu mascota necesita atención?" + botón WhatsApp + botón de llamada.
8. Footer: WhatsApp, teléfono, email `contacto@vitalpet.com.ar`, "Matrícula veterinaria N° 6023", copyright "© 2026 Vitalpet".

- [ ] **Step 3: Verificar visualmente el archivo standalone**

Run (PowerShell): `Invoke-Item public/casos/veterinaria/index.html`
Expected: carga sin errores, doble CTA visible en el hero y en el CTA final, paleta teal + durazno consistente, links bloqueados.

- [ ] **Step 4: Commit**

```bash
git add public/casos/veterinaria/index.html
git commit -m "Agrega landing del caso Vitalpet (veterinaria)"
```

---

### Task 4: Página estática — Psicólogos ("Espacio Psicológico")

**Files:**
- Create: `public/casos/psicologos/index.html`

**Interfaces:**
- Produces: archivo servible en `/casos/psicologos/index.html`.

- [ ] **Step 1: Crear el archivo con fondo claro (excepción intencional al patrón oscuro)**

Reutilizar la misma arquitectura (reset, `.container`, grids, header sticky, footer) pero invertir la paleta a fondo claro:
- `<title>`: "Espacio Psicológico | Terapia Individual Online y Presencial"
- meta description: "Espacio Psicológico: terapia individual online y presencial, primera consulta con calidez y confidencialidad."
- Tokens: `--bg: #ece3d3; --bg-alt: #e2d7c2; --bg-card: #f5efe3; --sage: #4a5a45; --sage-dark: #3a4737; --text: #2b2620; --text-dim: #5c5445; --border: rgba(74, 90, 69, 0.18);`
- Botones con texto claro sobre fondo salvia (`background: var(--sage); color: #f5efe3;`), no gradiente llamativo — tono bajo, sin sombra pronunciada.
- CTA a WhatsApp (`href="https://wa.me/5493415550500"`) con texto "Escribime" en vez de "Llamar ahora"/"Consulta por WhatsApp".

- [ ] **Step 2: Escribir el contenido de las secciones**

1. Header: logo simple "Espacio Psicológico" (sin ícono llamativo), botón "Escribime".
2. Hero: sin badge de urgencia — en su lugar, texto suave "Un espacio para vos". `<h1>` "A veces solo hace falta un espacio para pensar en voz alta", subtítulo "Terapia individual para adultos, online y presencial. Primera consulta con calidez y total confidencialidad.", un solo botón "Escribime" (sin botón secundario ni badges de "años de trayectoria" tipo venta — en su lugar, 3 líneas de texto simple: "Modalidad online y presencial", "Horarios flexibles", "Confidencialidad garantizada").
3. Enfoque / modalidades (3 tarjetas, sin íconos de emoji llamativos, solo texto): Terapia individual, Modalidad online, Modalidad presencial — cada una con 2 líneas de descripción breve.
4. Por qué elegir este espacio (4 tarjetas, tono cálido no comercial): "Escucha sin juicio", "Confidencialidad absoluta", "Horarios que se adaptan a vos", "Primera consulta para conocernos".
5. Testimonios anónimos (3, solo iniciales, sin apellido completo): ej. "Encontré un espacio donde pude poner en palabras cosas que hacía años no decía. — M.", "La modalidad online me permitió sostener la terapia incluso viajando por trabajo. — J.", "Me sentí escuchada desde la primera sesión. — L.".
6. FAQ corta (3 preguntas en formato simple pregunta/respuesta, sin acordeón JS — todo visible): "¿Cómo es la primera sesión? — Es un encuentro para conocernos, sin compromiso de continuar.", "¿Las sesiones son online? — Podés elegir online o presencial, según lo que te resulte más cómodo.", "¿Es confidencial? — Sí, todo lo que se habla en sesión queda dentro del consultorio.".
7. CTA final suave: "Si sentís que es momento de empezar, escribime" + botón "Escribime" (mismo estilo botón sage, sin banner llamativo de gradiente).
8. Footer: WhatsApp, email `contacto@espaciopsicologico.com.ar`, "Matrícula profesional N° 15234", copyright "© 2026 Espacio Psicológico".

- [ ] **Step 3: Verificar visualmente el archivo standalone**

Run (PowerShell): `Invoke-Item public/casos/psicologos/index.html`
Expected: carga sin errores, fondo claro (no oscuro como los demás casos) se ve intencional y prolijo, tono visual calmo sin urgencia, links bloqueados.

- [ ] **Step 4: Commit**

```bash
git add public/casos/psicologos/index.html
git commit -m "Agrega landing del caso Espacio Psicológico (psicólogos)"
```

---

### Task 5: Agregar los 4 casos a `portfolio.js` y verificar en localhost

**Files:**
- Modify: `src/data/portfolio.js:60-61` (agregar antes del cierre `];`)

**Interfaces:**
- Consumes: los 4 archivos `public/casos/{abogados,inmobiliaria,veterinaria,psicologos}/index.html` de las Tasks 1-4.
- Produces: 4 entradas nuevas en el array `portfolio`, consumidas por `Portfolio.jsx` → `PortfolioCard.jsx` (sin cambios en esos componentes).

- [ ] **Step 1: Agregar las 4 entradas al final del array**

En `src/data/portfolio.js`, reemplazar:

```js
    preview: "/casos/electricidad-plomeria/index.html",
  },
];
```

por:

```js
    preview: "/casos/electricidad-plomeria/index.html",
  },
  {
    numero: "07",
    industria: "Servicios Legales",
    nombre: "Bianchi & Asociados",
    descripcion:
      "Landing institucional para un estudio jurídico: áreas de práctica, primera consulta sin cargo y prueba social basada en casos resueltos.",
    gradient: "linear-gradient(135deg, #0d1b2e 0%, #060d16 100%)",
    aspectRatio: "3 / 2",
    preview: "/casos/abogados/index.html",
  },
  {
    numero: "08",
    industria: "Inmobiliaria",
    nombre: "Horizonte Propiedades",
    descripcion:
      "Sitio de marca para una inmobiliaria: catálogo de propiedades destacadas, tasación gratuita y contacto directo por WhatsApp.",
    gradient: "linear-gradient(135deg, #1c1815 0%, #0c0a08 100%)",
    aspectRatio: "3 / 2",
    preview: "/casos/inmobiliaria/index.html",
  },
  {
    numero: "09",
    industria: "Veterinaria",
    nombre: "Vitalpet",
    descripcion:
      "Landing para una clínica veterinaria: turnos online, atención de urgencias 24hs y servicios detallados por especialidad.",
    gradient: "linear-gradient(135deg, #0f3d3e 0%, #061e1f 100%)",
    aspectRatio: "3 / 2",
    preview: "/casos/veterinaria/index.html",
  },
  {
    numero: "10",
    industria: "Salud Mental",
    nombre: "Espacio Psicológico",
    descripcion:
      "Landing institucional para un consultorio de psicología: tono cálido y confidencial, modalidades online y presencial, sin urgencia comercial.",
    gradient: "linear-gradient(135deg, #ece3d3 0%, #c9bea6 100%)",
    aspectRatio: "3 / 2",
    preview: "/casos/psicologos/index.html",
  },
];
```

(Los valores de `aspectRatio: "3 / 2"` son un punto de partida; el Step 3 los ajusta a la proporción real observada en el navegador.)

- [ ] **Step 2: Verificar en el navegador con `npm run dev`**

Si el servidor de desarrollo no está corriendo, ejecutar `npm run dev` y abrir la URL local. Ir a la sección Portfolio, confirmar que las 4 cards nuevas (07-10) muestran su `<iframe>` con el gradiente correspondiente de fondo mientras carga, y que el orden visual es 01→10. Click en cada una para abrir `PortfolioPreviewModal` y confirmar que cada landing se ve completa dentro del modal, sin contenido cortado. Prestar especial atención al caso 10 (Psicólogos): debe verse claramente distinto (fondo claro) del resto, de forma intencional.

- [ ] **Step 3: Ajustar `aspectRatio` si algún hero se corta**

Para cualquier caso donde la card corte el hero de forma rara (en vez de mostrarlo completo), ajustar su `aspectRatio` en `portfolio.js` (ej. `"4 / 3"`, `"16 / 10"`) y volver a revisar en el navegador, siguiendo el mismo criterio usado en el caso 06.

- [ ] **Step 4: Verificar el build de producción**

Run: `npm run build`
Expected: build termina sin errores (exit code 0).

- [ ] **Step 5: Commit**

```bash
git add src/data/portfolio.js
git commit -m "Suma 4 casos al portfolio: Bianchi & Asociados, Horizonte Propiedades, Vitalpet y Espacio Psicológico"
```

---

## Self-Review Notes

- Cobertura de spec: los 4 casos (07-10), sus ángulos, CTAs y paletas exactas de la spec están reflejados en cada Task. La excepción de fondo claro para Psicólogos está explícita en Task 4 Step 1 y como Global Constraint.
- No hay placeholders: cada Task Step 2 especifica copy real (títulos, testimonios, servicios), no genéricos "agregar contenido apropiado".
- Consistencia: las 4 páginas reutilizan la misma arquitectura CSS de `electricidad-plomeria` (Task 1-4 Step 1), evitando reinventar el sistema de grids/botones por caso — coherente con DRY y con el criterio de "seguir patrones existentes" del codebase.
- `aspectRatio: "3 / 2"` en las 4 entradas nuevas es un punto de partida explícito, no un placeholder abierto — Task 5 Step 3 da el criterio exacto de ajuste, igual que en el plan del caso 06.

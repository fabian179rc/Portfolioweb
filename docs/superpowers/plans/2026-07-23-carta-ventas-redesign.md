# Adaptación de la Carta de Ventas (Opción A) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescribir el copy y ampliar la estructura de secciones del sitio SeronStudio (rama `redesign`) para reflejar la carta de ventas, siguiendo el spec aprobado en `docs/superpowers/specs/2026-07-23-carta-ventas-redesign-design.md`.

**Architecture:** React + Vite, un componente funcional por sección (patrón ya existente). Cada sección nueva usa el hook `useScrollReveal` + `revealClass` para el fade-in al scroll, igual que las secciones actuales. Sin nuevas dependencias. Sin cambios al sistema de diseño (tokens en `src/styles/tokens.css`).

**Tech Stack:** React 18, Vite 4, CSS plano (sin preprocesador, sin CSS-in-JS).

## Global Constraints

- No tocar `main` — todo el trabajo va en la rama `redesign` (ya creada, ya tiene 2 commits del spec).
- No agregar colores/tipografías nuevas — reutilizar exclusivamente las variables de `src/styles/tokens.css` (`--bg-primary`, `--bg-secondary`, `--text-primary`, `--accent`, `--border-subtle`, `--font-serif`, `--font-sans`).
- No tocar `PortfolioCard.jsx`, `PortfolioPreviewModal.jsx`, ni `src/data/portfolio.js`.
- No hay framework de testing en el repo (no Jest/Vitest). La verificación de cada paso es: `npm run build` (falla si hay un error de sintaxis/import) + revisión visual manual en `npm run dev`.
- Este repo no tiene un dev server corriendo persistentemente — antes de cada verificación visual, confirmar que no hay un `npm run dev` zombie en otro puerto (`netstat -ano | grep LISTEN` en bash) para no confundir qué versión se está mirando.

---

## Task 1: Servicios — agregar descripciones

**Files:**
- Modify: `src/data/servicios.js`
- Modify: `src/components/Servicios.jsx`

**Interfaces:**
- Produces: `servicios` array con forma `{ numero: string, nombre: string, descripcion: string }` (antes no tenía `descripcion`) — usado por `Servicios.jsx`.

- [ ] **Step 1: Reescribir `src/data/servicios.js`**

```js
export const servicios = [
  {
    numero: "01",
    nombre: "Landing de Captación",
    descripcion:
      "Ideal para profesionales independientes, servicios de urgencia y consultorios que dependen de consultas iniciales.",
  },
  {
    numero: "02",
    nombre: "Sitio Institucional Completo",
    descripcion:
      "Ideal para estudios jurídicos, clínicas, inmobiliarias y servicios profesionales que necesitan mostrar profundidad.",
  },
  {
    numero: "03",
    nombre: "Sitio de Marca",
    descripcion:
      "Ideal para marcas de alimentos, belleza, moda y gastronomía con identidad propia para transmitir.",
  },
  {
    numero: "04",
    nombre: "E-commerce",
    descripcion:
      "Para negocios que quieren vender online o sumar un canal digital propio a lo presencial.",
  },
  {
    numero: "05",
    nombre: "Rediseño y Optimización",
    descripcion:
      "Para negocios que ya tienen algo, pero no convierte, se ve viejo o no funciona bien en celular.",
  },
];
```

- [ ] **Step 2: Modificar `src/components/Servicios.jsx` para renderizar `descripcion`**

Reemplazar el `<li>` del `.map`:

```jsx
{servicios.map((servicio) => (
  <li key={servicio.numero} className="servicios__item">
    <span className="servicios__numero">{servicio.numero}</span>
    <div className="servicios__texto">
      <span className="servicios__nombre">{servicio.nombre}</span>
      <p className="servicios__descripcion">{servicio.descripcion}</p>
    </div>
    <span className="servicios__flecha" aria-hidden="true">
      →
    </span>
  </li>
))}
```

- [ ] **Step 3: Agregar estilos en `src/styles/global.css`**

Dentro del bloque `/* Servicios */`, reemplazar `.servicios__item` y agregar `.servicios__texto` / `.servicios__descripcion`:

```css
.servicios__item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--border-subtle);
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.servicios__texto {
  flex: 1;
}

.servicios__nombre {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  display: block;
}

.servicios__descripcion {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  opacity: 0.6;
  margin-top: 0.4rem;
}
```

(`.servicios__numero` y `.servicios__flecha` ya existen — no tocar. Quitar `font-family: var(--font-serif); font-size: 1.75rem;` del viejo `.servicios__item` porque ahora vive en `.servicios__nombre`.)

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: build exitoso, sin errores.

- [ ] **Step 5: Commit**

```bash
git add src/data/servicios.js src/components/Servicios.jsx src/styles/global.css
git commit -m "Suma descripciones a los servicios (carta de ventas)"
```

---

## Task 2: Hero — nuevo copy

**Files:**
- Modify: `src/components/Hero.jsx`

- [ ] **Step 1: Reemplazar el `<h1>` y el `<p className="hero__subtitle">`**

```jsx
<h1 className="hero__title">
  <span
    className={revealClass(isVisible, "hero__line")}
    style={{ transitionDelay: "0.1s" }}
  >
    Dejá de explicar
  </span>
  <span
    className={revealClass(isVisible, "hero__line")}
    style={{ transitionDelay: "0.25s" }}
  >
    lo mismo veinte veces.
  </span>
  <span
    className={revealClass(isVisible, "hero__line")}
    style={{ transitionDelay: "0.4s" }}
  >
    Que tu página lo haga por vos.
  </span>
</h1>
<p
  className={revealClass(isVisible, "hero__subtitle")}
  style={{ transitionDelay: "0.55s" }}
>
  Una página que explica, genera confianza y lleva al cliente a tu
  WhatsApp ya decidido. Diseño y desarrollo web a medida para negocios
  en Argentina.
</p>
```

(Los CTAs de abajo — "Ver Portfolio →" / "WhatsApp Directo →" — quedan igual, no se tocan.)

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: build exitoso.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "Actualiza el copy del Hero con el titular de la carta de ventas"
```

---

## Task 3: Ticker — nuevos one-liners

**Files:**
- Modify: `src/components/Ticker.jsx`

- [ ] **Step 1: Reemplazar `TICKER_ITEMS`**

```jsx
const TICKER_ITEMS = [
  "Tu web debería convencer antes de que abran la boca",
  "Instagram te da seguidores. Una web te da clientes",
  "No diseño páginas bonitas. Diseño páginas que convierten",
  "Hecha a mano. Pensada para vos",
];
```

(El resto del componente —duplicado del array, render— no cambia.)

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: build exitoso.

- [ ] **Step 3: Commit**

```bash
git add src/components/Ticker.jsx
git commit -m "Actualiza los one-liners del ticker con frases de la carta de ventas"
```

---

## Task 4: Sección "El Problema"

**Files:**
- Create: `src/components/Problema.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/Nav.jsx`
- Modify: `src/components/Footer.jsx`
- Modify: `src/styles/global.css`

**Interfaces:**
- Produces: componente `Problema` (default export), sección con `id="problema"` — el link de nav apunta a `#problema`.

- [ ] **Step 1: Crear `src/components/Problema.jsx`**

```jsx
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

const PILLS = [
  "Instagram no alcanza",
  "Las plantillas no convierten",
  '"El sobrino" no da soporte',
  "Las agencias grandes son impersonales",
];

export default function Problema() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="problema" className="problema" ref={ref}>
      <div className={`container ${revealClass(isVisible)}`}>
        <h2 className="section-title">
          Todos los días perdés consultas que nunca vas a ver.
        </h2>
        <p className="problema__texto">
          No es culpa del mercado ni del rubro. Es que tu presencia digital
          no está haciendo el trabajo que debería hacer. Alguien busca lo
          que ofrecés, no lo encuentra en tu web y en tres segundos decide
          irse a la competencia.
        </p>
        <ul className="problema__pills">
          {PILLS.map((pill) => (
            <li key={pill} className="problema__pill">
              {pill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Insertar en `src/App.jsx`**

El spec ubica "El Problema" **después** del Portfolio (orden: Métricas → Portfolio → El Problema → Mecanismo → ...). Agregar el import y renderizar `<Problema />` entre `<Portfolio />` y `<Servicios />`:

```jsx
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Metricas from "./components/Metricas";
import Portfolio from "./components/Portfolio";
import Problema from "./components/Problema";
import Servicios from "./components/Servicios";
import Filosofia from "./components/Filosofia";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Ticker />
      <Metricas />
      <Portfolio />
      <Problema />
      <Servicios />
      <Filosofia />
      <Contacto />
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Agregar el link "El Problema" a `src/components/Nav.jsx`**

```jsx
const LINKS = [
  { href: "#portfolio", label: "Portafolio" },
  { href: "#problema", label: "El Problema" },
  { href: "#servicios", label: "Servicios" },
  { href: "#filosofia", label: "Filosofía" },
  { href: "#consulta", label: "Consulta" },
];
```

- [ ] **Step 4: Agregar el mismo link a `FOOTER_LINKS` en `src/components/Footer.jsx`**

```jsx
const FOOTER_LINKS = [
  { href: "#portfolio", label: "Portafolio" },
  { href: "#problema", label: "El Problema" },
  { href: "#servicios", label: "Servicios" },
  { href: "#filosofia", label: "Filosofía" },
  { href: "#consulta", label: "Consulta" },
];
```

- [ ] **Step 5: Agregar estilos en `src/styles/global.css`**

Agregar al final del archivo (o después del bloque `/* Portfolio */`):

```css
/* Problema */
.problema {
  padding: 6rem 0;
  border-top: 1px solid var(--border-subtle);
}

.problema__texto {
  max-width: 62ch;
  color: var(--text-primary);
  opacity: 0.8;
  font-size: 1.08rem;
  line-height: 1.7;
  margin-top: 1.5rem;
}

.problema__pills {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 2rem 0 0;
  padding: 0;
}

.problema__pill {
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  padding: 0.5rem 1.1rem;
  font-size: 0.85rem;
  color: var(--text-primary);
  opacity: 0.75;
}
```

- [ ] **Step 6: Verificar build**

Run: `npm run build`
Expected: build exitoso.

- [ ] **Step 7: Verificación visual**

Run: `npm run dev`, abrir la URL que imprime Vite, scrollear hasta "El Problema" (o clickear el link del nav), confirmar que se ve el título, el párrafo y los 4 pills en fila (se pueden envolver en mobile). Cerrar el servidor (`Ctrl+C` o matar el proceso) al terminar.

- [ ] **Step 8: Commit**

```bash
git add src/components/Problema.jsx src/App.jsx src/components/Nav.jsx src/components/Footer.jsx src/styles/global.css
git commit -m "Agrega la sección El Problema"
```

---

## Task 5: Sección "Mecanismo Único"

**Files:**
- Create: `src/components/Mecanismo.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Crear `src/components/Mecanismo.jsx`**

```jsx
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

export default function Mecanismo() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="mecanismo" ref={ref}>
      <div className={`container mecanismo__inner ${revealClass(isVisible)}`}>
        <h2 className="section-title">La Página que Trabaja Antes que Vos</h2>
        <p>
          Una página bien construida no es un folleto online. Es un
          vendedor silencioso que trabaja las 24 horas: explica los
          servicios, genera confianza antes del primer contacto, y lleva
          al cliente directo a WhatsApp ya convencido.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Insertar en `src/App.jsx`** (después de `<Problema />`, antes de `<Servicios />`)

```jsx
import Mecanismo from "./components/Mecanismo";
// ...
      <Problema />
      <Mecanismo />
      <Servicios />
```

- [ ] **Step 3: Agregar estilos en `src/styles/global.css`**

```css
/* Mecanismo */
.mecanismo {
  padding: 6rem 0;
  border-top: 1px solid var(--border-subtle);
  background: var(--bg-secondary);
  text-align: center;
}

.mecanismo__inner {
  max-width: 54ch;
  margin: 0 auto;
}

.mecanismo__inner p {
  color: var(--text-primary);
  opacity: 0.8;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-top: 1.25rem;
}
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: build exitoso.

- [ ] **Step 5: Commit**

```bash
git add src/components/Mecanismo.jsx src/App.jsx src/styles/global.css
git commit -m "Agrega la sección Mecanismo Único"
```

---

## Task 6: Sección "Lo que pasa cuando funciona"

**Files:**
- Create: `src/components/ComoFunciona.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Crear `src/components/ComoFunciona.jsx`**

```jsx
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

export default function ComoFunciona() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="como-funciona" ref={ref}>
      <div className={`container ${revealClass(isVisible)}`}>
        <h2 className="section-title">
          Menos explicar. Más consultas convertidas.
        </h2>
        <div className="como-funciona__texto">
          <p>
            Un cliente ve una recomendación o un resultado en Google. Hace
            clic. En segundos entiende qué hacés, para quién es y por qué
            elegirte. Ve prueba de que trabajaste con negocios parecidos al
            suyo.
          </p>
          <p>
            Hace clic en WhatsApp — pero no escribe "hola, consulta".
            Escribe con una pregunta específica, ya medio convencido, con
            el problema en la cabeza y la solución en la boca.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Insertar en `src/App.jsx`** (después de `<Mecanismo />`, antes de `<Servicios />`)

```jsx
import ComoFunciona from "./components/ComoFunciona";
// ...
      <Mecanismo />
      <ComoFunciona />
      <Servicios />
```

- [ ] **Step 3: Agregar estilos en `src/styles/global.css`**

```css
/* Como funciona */
.como-funciona {
  padding: 6rem 0;
  border-top: 1px solid var(--border-subtle);
}

.como-funciona__texto {
  max-width: 62ch;
  margin-top: 1.5rem;
}

.como-funciona__texto p {
  color: var(--text-primary);
  opacity: 0.8;
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 1.2rem;
}

.como-funciona__texto p:last-child {
  margin-bottom: 0;
}
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: build exitoso.

- [ ] **Step 5: Commit**

```bash
git add src/components/ComoFunciona.jsx src/App.jsx src/styles/global.css
git commit -m "Agrega la sección Lo que pasa cuando funciona"
```

---

## Task 7: Sección "Qué incluye cada proyecto"

**Files:**
- Create: `src/components/QueIncluye.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Crear `src/components/QueIncluye.jsx`**

```jsx
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

const ITEMS = [
  "Diseño original, sin plantillas",
  "Textos orientados a la conversión",
  "Versión mobile optimizada",
  "Botón directo a WhatsApp",
  "Formulario de contacto",
  "Velocidad de carga optimizada",
  "SEO básico inicial",
  "Soporte post-lanzamiento",
];

export default function QueIncluye() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="incluye" ref={ref}>
      <div className={`container ${revealClass(isVisible)}`}>
        <h2 className="section-title">Todos los proyectos incluyen</h2>
        <ul className="incluye__grid">
          {ITEMS.map((item) => (
            <li key={item} className="incluye__item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Insertar en `src/App.jsx`** (después de `<Servicios />`, antes de `<Filosofia />`)

```jsx
import QueIncluye from "./components/QueIncluye";
// ...
      <Servicios />
      <QueIncluye />
      <Filosofia />
```

- [ ] **Step 3: Agregar estilos en `src/styles/global.css`**

```css
/* Que incluye */
.incluye {
  padding: 6rem 0;
  border-top: 1px solid var(--border-subtle);
}

.incluye__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem 2rem;
  margin: 2.5rem 0 0;
  padding: 0;
}

.incluye__item {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  color: var(--text-primary);
  opacity: 0.85;
  font-size: 0.95rem;
}

.incluye__item::before {
  content: "—";
  color: var(--accent);
}
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: build exitoso.

- [ ] **Step 5: Commit**

```bash
git add src/components/QueIncluye.jsx src/App.jsx src/styles/global.css
git commit -m "Agrega la sección Qué incluye cada proyecto"
```

---

## Task 8: Sección "Cómo trabajamos"

**Files:**
- Create: `src/components/Proceso.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Crear `src/components/Proceso.jsx`**

```jsx
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

const PASOS = [
  {
    numero: "01",
    titulo: "Diagnóstico",
    texto:
      "Conversamos sobre tu negocio, tus clientes y qué querés lograr. Defino qué tipo de página tiene más sentido para vos.",
  },
  {
    numero: "02",
    titulo: "Diseño y desarrollo",
    texto:
      "Construyo la página desde cero. Te muestro avances, incorporo feedback y ajusto hasta que quede exacto.",
  },
  {
    numero: "03",
    titulo: "Lanzamiento y soporte",
    texto:
      "Publicamos, te explico cómo funciona todo y me quedo disponible para los primeros ajustes.",
  },
];

export default function Proceso() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="proceso" ref={ref}>
      <div className={`container ${revealClass(isVisible)}`}>
        <h2 className="section-title">Cómo trabajamos</h2>
        <p className="section-subtitle">Simple, predecible, sin sorpresas.</p>
        <div className="proceso__grid">
          {PASOS.map((paso) => (
            <div key={paso.numero} className="proceso__paso">
              <span className="proceso__numero">{paso.numero}</span>
              <h3>{paso.titulo}</h3>
              <p>{paso.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Insertar en `src/App.jsx`** (después de `<QueIncluye />`, antes de `<Filosofia />`)

```jsx
import Proceso from "./components/Proceso";
// ...
      <QueIncluye />
      <Proceso />
      <Filosofia />
```

- [ ] **Step 3: Agregar estilos en `src/styles/global.css`**

```css
/* Proceso */
.proceso {
  padding: 6rem 0;
  border-top: 1px solid var(--border-subtle);
}

.proceso__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  margin-top: 1rem;
}

.proceso__numero {
  display: block;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.proceso__paso h3 {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  color: var(--text-primary);
  margin-bottom: 0.6rem;
}

.proceso__paso p {
  color: var(--text-primary);
  opacity: 0.7;
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (max-width: 820px) {
  .proceso__grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: build exitoso.

- [ ] **Step 5: Commit**

```bash
git add src/components/Proceso.jsx src/App.jsx src/styles/global.css
git commit -m "Agrega la sección Cómo trabajamos"
```

---

## Task 9: Filosofía — reescritura + "Para quién es / no es"

**Files:**
- Modify: `src/components/Filosofia.jsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Reescribir `src/components/Filosofia.jsx` completo**

```jsx
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

const ES_PARA_VOS = [
  "Tu web no existe o no te representa",
  "Dependés de Instagram o recomendaciones",
  "Explicás siempre lo mismo por WhatsApp",
  "Querés clientes que lleguen más decididos",
  "Buscás trato directo, sin intermediarios",
];

const NO_ES_PARA_VOS = [
  "Buscás la opción más barata, sin importar el resultado",
  "Querés una plantilla rápida sin estrategia",
  "No podés dedicar tiempo a dar contexto del negocio",
];

export default function Filosofia() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="filosofia" className="filosofia" ref={ref}>
      <div className={`container filosofia__grid ${revealClass(isVisible)}`}>
        <div className="filosofia__texto">
          <h2 className="section-title">La estrategia va primero.</h2>
          <p>
            No empiezo por el diseño. Empiezo por entender cómo llega tu
            cliente, qué duda tiene y qué necesita leer para confiar. Esas
            preguntas se responden antes de elegir un color o una
            tipografía. Trabajo directamente con cada cliente, sin capas
            ni intermediarios, desde la primera conversación hasta el
            lanzamiento.
          </p>
        </div>
        <div className="filosofia__paraquien">
          <div className="filosofia__col filosofia__col--si">
            <h3>Es para vos si</h3>
            <ul>
              {ES_PARA_VOS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="filosofia__col filosofia__col--no">
            <h3>No es para vos si</h3>
            <ul>
              {NO_ES_PARA_VOS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Reemplazar el bloque `/* Filosofia */` en `src/styles/global.css`**

```css
/* Filosofia */
.filosofia {
  padding: 6rem 0;
  border-top: 1px solid var(--border-subtle);
}

.filosofia__grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 4rem;
  align-items: start;
}

.filosofia__texto p {
  color: var(--text-primary);
  opacity: 0.8;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-top: 1.5rem;
}

.filosofia__paraquien {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.filosofia__col h3 {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.filosofia__col--si h3 {
  color: var(--accent);
}

.filosofia__col ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.filosofia__col li {
  padding: 0.7rem 0;
  border-bottom: 1px solid var(--border-subtle);
  color: var(--text-primary);
  opacity: 0.85;
  font-size: 0.92rem;
}

@media (max-width: 900px) {
  .filosofia__grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: build exitoso.

- [ ] **Step 4: Verificación visual**

`npm run dev`, revisar la sección Filosofía: texto a la izquierda, dos columnas "Es para vos si" / "No es para vos si" a la derecha (apiladas verticalmente entre sí, no lado a lado — ver `.filosofia__paraquien { flex-direction: column }`). En mobile (`<900px`) todo se apila en una columna.

- [ ] **Step 5: Commit**

```bash
git add src/components/Filosofia.jsx src/styles/global.css
git commit -m "Reescribe Filosofia y suma el bloque Para quién es / no es"
```

---

## Task 10: Sección "FAQ"

**Files:**
- Create: `src/components/Faq.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Crear `src/components/Faq.jsx`**

```jsx
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

const PREGUNTAS = [
  {
    pregunta: "¿Cuánto tarda?",
    respuesta:
      "Una landing de captación puede estar lista en una a dos semanas. Un sitio completo, en tres a cuatro. Todo con tiempos acordados antes de empezar.",
  },
  {
    pregunta: "¿Qué pasa si no me gusta cómo queda?",
    respuesta:
      "El proceso incluye revisiones. Ajustamos hasta que represente exactamente lo que querés comunicar. No entrego algo sin que estés conforme.",
  },
  {
    pregunta: "¿Es para mi rubro?",
    respuesta:
      "Trabajé con más de 13 rubros distintos, desde veterinarias hasta estudios jurídicos y fabricantes de alimentos.",
  },
  {
    pregunta: "¿Qué pasa después de que se lanza?",
    respuesta:
      "Soporte post-lanzamiento incluido. Si aparece algo para ajustar en los primeros días, lo resolvemos.",
  },
  {
    pregunta: "¿Lo tengo que manejar yo después?",
    respuesta:
      "Depende de cómo lo armamos. Hay versiones que podés actualizar vos mismo, y otras donde me consultás si necesitás cambios.",
  },
  {
    pregunta: "¿Tengo que saber de tecnología?",
    respuesta:
      "No. Mi trabajo es que vos te concentres en tu negocio y que yo me encargue de que la web funcione.",
  },
  {
    pregunta: "¿Es cara?",
    respuesta:
      "Comparado con una plantilla gratuita, sí cuesta más. Comparado con lo que puede generar en consultas nuevas, generalmente se paga solo.",
  },
];

export default function Faq() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="faq" className="faq" ref={ref}>
      <div className={`container ${revealClass(isVisible)}`}>
        <h2 className="section-title">Preguntas frecuentes</h2>
        <div className="faq__lista">
          {PREGUNTAS.map(({ pregunta, respuesta }) => (
            <details key={pregunta} className="faq__item">
              <summary className="faq__pregunta">{pregunta}</summary>
              <p className="faq__respuesta">{respuesta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Insertar en `src/App.jsx`** (después de `<Filosofia />`, antes de `<Contacto />`)

```jsx
import Faq from "./components/Faq";
// ...
      <Filosofia />
      <Faq />
      <Contacto />
```

- [ ] **Step 3: Agregar estilos en `src/styles/global.css`**

```css
/* FAQ */
.faq {
  padding: 6rem 0;
  border-top: 1px solid var(--border-subtle);
}

.faq__lista {
  max-width: 68ch;
  margin-top: 2.5rem;
}

.faq__item {
  border-bottom: 1px solid var(--border-subtle);
  padding: 1.25rem 0;
}

.faq__pregunta {
  cursor: pointer;
  font-family: var(--font-serif);
  font-size: 1.15rem;
  color: var(--text-primary);
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq__pregunta::-webkit-details-marker {
  display: none;
}

.faq__pregunta::after {
  content: "+";
  color: var(--accent);
  font-size: 1.3rem;
}

.faq__item[open] .faq__pregunta::after {
  content: "–";
}

.faq__respuesta {
  color: var(--text-primary);
  opacity: 0.7;
  margin-top: 0.9rem;
  font-size: 0.95rem;
  max-width: 58ch;
  line-height: 1.6;
}
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: build exitoso.

- [ ] **Step 5: Verificación visual**

`npm run dev`, confirmar que cada pregunta se puede abrir/cerrar clickeando (comportamiento nativo de `<details>`), sin JS adicional.

- [ ] **Step 6: Commit**

```bash
git add src/components/Faq.jsx src/App.jsx src/styles/global.css
git commit -m "Agrega la sección FAQ"
```

---

## Task 11: Contacto — copy y WhatsApp pre-cargado

**Files:**
- Modify: `src/components/Contacto.jsx`
- Modify: `src/data/config.js`

**Interfaces:**
- Produces: `CONTACT.whatsappUrl` sigue siendo un string completo (ya incluye `?text=` codificado) — no cambia su tipo, solo su valor.

- [ ] **Step 1: Modificar `src/data/config.js`**

```js
export const CONTACT = {
  email: "soporte.seronstudio@gmail.com",
  whatsappNumber: "5493412665657",
  whatsappUrl:
    "https://wa.me/5493412665657?text=" +
    encodeURIComponent(
      "Hola, vi SeronStudio y me gustaría consultar por una web para mi negocio."
    ),
};

export const WEB3FORMS_ACCESS_KEY = "0223b2bd-e7ea-489a-b697-f5069f5c3532";
```

- [ ] **Step 2: Modificar el título de `src/components/Contacto.jsx`**

Cambiar:

```jsx
<h2 className="section-title">Hablemos.</h2>
```

por:

```jsx
<h2 className="section-title">¿Le damos forma a tu presencia online?</h2>
```

(El resto del componente —formulario, aside con WhatsApp— no cambia; el botón de WhatsApp ya usa `CONTACT.whatsappUrl`, así que hereda el mensaje pre-cargado automáticamente.)

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: build exitoso.

- [ ] **Step 4: Verificación visual**

`npm run dev`, click en "WhatsApp Directo" (Hero) o "WhatsApp Directo" (Contacto), confirmar que la URL generada contiene `?text=Hola%2C%20vi%20SeronStudio...` (no hace falta tener WhatsApp Web logueado — alcanza con ver la URL en la barra de direcciones de la pestaña que abre, o inspeccionar el `href` del link en devtools).

- [ ] **Step 5: Commit**

```bash
git add src/components/Contacto.jsx src/data/config.js
git commit -m "Actualiza el copy de Contacto y agrega mensaje de WhatsApp pre-cargado"
```

---

## Task 12: Footer — tagline nuevo

**Files:**
- Modify: `src/components/Footer.jsx`

- [ ] **Step 1: Cambiar el tagline**

```jsx
<p className="footer__tagline">La página que trabaja antes que vos.</p>
```

(reemplaza `"Estudio Digital a Medida"`.)

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: build exitoso.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "Actualiza el tagline del footer"
```

---

## Task 13: QA visual completa

**Files:** ninguno (solo verificación)

- [ ] **Step 1: Levantar el sitio**

Run: `npm run dev`, abrir la URL impresa por Vite.

- [ ] **Step 2: Recorrer todas las secciones en desktop**

Orden esperado: Nav → Hero → Ticker → Métricas → Portfolio → El Problema → Mecanismo Único → Lo que pasa cuando funciona → Servicios (con descripciones) → Qué incluye → Cómo trabajamos → Filosofía (con Para quién es/no es) → FAQ → Contacto → Footer.

Confirmar: sin solapamientos, sin texto cortado, los `useScrollReveal` disparan al hacer scroll (fade-in), el nav sticky con blur sigue funcionando, los links del nav (`#problema`, `#servicios`, etc.) hacen scroll a la sección correcta.

- [ ] **Step 3: Repetir en viewport mobile**

DevTools → responsive mode, ~375px de ancho. Confirmar que: el nav colapsa los links (comportamiento ya existente, sin cambios), los pills de "El Problema" se envuelven en varias líneas, el grid de "Qué incluye" pasa a 1-2 columnas, "Cómo trabajamos" pasa a 1 columna, Filosofía se apila.

- [ ] **Step 4: Cerrar el dev server**

Identificar el proceso (`netstat -ano | grep LISTEN` en bash, o `Ctrl+C` si quedó en foreground) y terminarlo para no dejar procesos zombie.

- [ ] **Step 5: Confirmar estado de git**

Run: `git log --oneline main..redesign`
Expected: la lista de commits de las Tasks 1–12 (spec + implementación), nada pendiente sin commitear (`git status --short` sin salida relevante — los `bono*.png`/`lash.png` sueltos en la raíz son preexistentes y no forman parte de este trabajo).

---

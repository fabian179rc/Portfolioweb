# Caso de portfolio — Electricidad y Plomería ("Chispa & Caño 24hs")

**Fecha:** 2026-07-23
**Estado:** Aprobado por usuario, pendiente de plan de implementación

## Contexto

El portfolio (`src/data/portfolio.js`) tiene 6 casos. El caso `numero: "06"` ("La Mano Confiable", industria Servicios) es un placeholder sin vista previa real (`url: "#"`, sin `preview`). Los otros 5 casos ya fueron convertidos a vistas previas embebidas: cada uno es una página estática en `public/casos/<slug>/index.html`, mostrada en un `<iframe>` dentro de la card y del modal de preview (`PortfolioCard.jsx`, `PortfolioPreviewModal.jsx`).

El usuario pidió sumar un caso de electricidad y plomería a domicilio, generado por Claude en vez de buscar una plantilla externa, para mantener consistencia visual y de código con el resto del muestrario. Es una marca ficticia (no un cliente real), igual que "La Mano Confiable".

## Decisión de alcance

Se **reemplaza** el caso `06` in-place (no se agrega un caso 07). El resto del array no cambia.

## Concepto de contenido

- **Marca ficticia:** "Chispa & Caño 24hs" (electricidad + plomería a domicilio).
- **Ángulo de venta:** urgencias 24hs (cortes de luz, pérdidas de agua, tableros, cañerías rotas).
- **Objetivo de conversión:** llamada telefónica directa — botón "Llamar ahora" como CTA principal, repetido varias veces. Sin formulario de contacto como CTA primario.
- **Diferenciales:** respuesta en menos de 60 min, presupuesto sin cargo, técnicos matriculados, garantía escrita.

## Estructura de la landing (página única)

1. Header sticky: logo + teléfono + botón "Llamar ahora"
2. Hero: titular de urgencia 24hs, botón de llamada grande, badges de confianza (años de experiencia, matrícula, seguro)
3. Servicios en dos columnas: Electricidad (cortocircuitos, tableros, instalaciones, iluminación) / Plomería (pérdidas, destapaciones, calefones, instalaciones sanitarias)
4. "Por qué elegirnos" — 4 diferenciales
5. "Cómo funciona" — 3 pasos: llamás → diagnóstico → solución
6. Testimonios — 3 reseñas cortas con estrellas
7. Franja de disponibilidad 24/7 + zona de cobertura (genérica, sin ciudad específica, igual que "La Mano Confiable")
8. CTA final repitiendo el teléfono
9. Footer con datos de contacto y aclaración de matrícula

## Sistema de diseño

Fondo oscuro (consistente con el resto del muestrario) con dos acentos: ámbar/amarillo (eléctrico) y azul (agua/plomería). Tipografía sans-serif bold para transmitir urgencia/confianza técnica, cargada desde Google Fonts.

## Implementación técnica

- Página estática autocontenida: `public/casos/electricidad-plomeria/index.html` (HTML + CSS inline + JS vanilla mínimo, sin build ni dependencias — mismo enfoque liviano que `dentistas` en cuanto a ser un único archivo, pero escrito a mano en vez de exportado de Webflow).
- Al final del `<body>`, el mismo script de bloqueo de clicks/submits que usan los demás casos, para que el `<iframe>` de preview no navegue ni dispare envíos reales.
- En `src/data/portfolio.js`, la entrada `numero: "06"` se actualiza:
  - `nombre`: "Chispa & Caño 24hs"
  - `descripcion`: reescrita para reflejar el ángulo de urgencia 24hs y el CTA de llamada directa
  - `gradient`: nuevo gradiente oscuro con tono ámbar (ej. `linear-gradient(135deg, #2d2110 0%, #0f0b05 100%)`, ajustable)
  - `aspectRatio`: se mide después de construir la página (screenshot real), siguiendo el patrón de los demás casos
  - `preview`: `/casos/electricidad-plomeria/index.html`
  - se elimina el `url: "#"` (ya no es placeholder)
  - `industria` se mantiene como "Servicios"

## Fuera de alcance

- No se toca ningún otro caso del array.
- No se agrega backend real ni envío de formularios (es una landing de portfolio, no un sitio en producción).
- No se usa React/Vite para esta página — es HTML estático autocontenido, igual que el resto de los casos "hechos a mano".

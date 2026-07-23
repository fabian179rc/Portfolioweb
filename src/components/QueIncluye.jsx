import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

const ITEMS = [
  "Diseño original, sin plantillas",
  "Textos orientados a la conversión",
  "Versión mobile optimizada",
  "Botón directo a WhatsApp",
  "Formulario de contacto",
  "Velocidad de carga optimizada",
  "SEO básico inicial",
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

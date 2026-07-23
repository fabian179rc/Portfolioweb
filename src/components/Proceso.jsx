import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

const PASOS = [
  {
    numero: "01",
    titulo: "Diagnóstico",
    texto:
      "Conversamos sobre tu negocio, tus clientes y qué querés lograr. Definimos qué tipo de página tiene más sentido para vos.",
  },
  {
    numero: "02",
    titulo: "Diseño y desarrollo",
    texto:
      "Según lo que necesita tu negocio, diseñamos y te presentamos una primera versión para que la revises y nos indiques qué ajustar.",
  },
  {
    numero: "03",
    titulo: "Lanzamiento y soporte",
    texto:
      "Levantamos tu web con hosting incluido por un año, con opciones de CRM y mejoras a medida para que tu negocio siga creciendo.",
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

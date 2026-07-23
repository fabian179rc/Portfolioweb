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

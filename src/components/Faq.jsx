import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

const PREGUNTAS = [
  {
    pregunta: "¿Cuánto tarda?",
    respuesta:
      "Depende del tipo de web que necesite tu negocio. Landing de Captación, Sitio de Marca y Rediseño y Optimización están listos en 7 días. Un Sitio Institucional Completo, al tener más contenido, lleva un poco más de tiempo.",
  },
  {
    pregunta: "¿Qué pasa si no me gusta cómo queda?",
    respuesta:
      "El proceso incluye revisiones. Nuestro objetivo es que sientas que la web fue hecha exclusivamente para tu negocio.",
  },
  {
    pregunta: "¿Es para mi rubro?",
    respuesta:
      "Trabajamos con más de 13 rubros distintos, desde veterinarias hasta estudios jurídicos y fabricantes de alimentos.",
  },
  {
    pregunta: "¿Qué pasa después de que se lanza?",
    respuesta:
      "Soporte post-lanzamiento incluido. Si aparece algo para ajustar en los primeros días, lo resolvemos.",
  },
  {
    pregunta: "¿Lo tengo que manejar yo después?",
    respuesta:
      "Depende de cómo lo armamos. Hay versiones que podés actualizar vos mismo, y otras donde nos consultás si necesitás cambios.",
  },
  {
    pregunta: "¿Tengo que saber de tecnología?",
    respuesta:
      "No. Nuestro trabajo es que vos te concentres en tu negocio y que nosotros nos encarguemos de que la web funcione.",
  },
  {
    pregunta: "¿Es cara?",
    respuesta:
      "Comparado con una plantilla gratuita, sí cuesta más. Comparado con lo que puede generar en consultas nuevas, generalmente se paga solo.",
  },
  {
    pregunta: "¿Mi web me va a traer clientes?",
    respuesta:
      "Recordá que tu web incluye Posicionamiento SEO básico, para que aparezca en las búsquedas de Internet cuando alguien busque lo que ofrecés.",
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

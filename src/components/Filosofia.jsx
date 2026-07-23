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
            No empezamos por el diseño. Empezamos por entender cómo llega
            tu cliente, qué duda tiene y qué necesita leer para confiar.
            Esas preguntas se responden antes de elegir un color o una
            tipografía. Trabajamos directamente con cada cliente, sin
            capas ni intermediarios, desde la primera conversación hasta
            el lanzamiento.
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

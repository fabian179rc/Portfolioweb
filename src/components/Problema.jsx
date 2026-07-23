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
          No es culpa del mercado ni del rubro. Es que tu presencia digital{" "}
          <span className="text-accent">
            no está haciendo el trabajo que debería hacer.
          </span>{" "}
          Alguien busca lo que ofrecés, no lo encuentra en tu web y en tres
          segundos decide irse a la competencia.
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

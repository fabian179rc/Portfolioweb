import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

export default function Inversion() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="inversion" ref={ref}>
      <div className={`container inversion__inner ${revealClass(isVisible)}`}>
        <h2 className="section-title">Invertí en tu web. Hacé crecer tu negocio.</h2>
        <p>
          La pregunta real no es si necesitás una web — es cuánto te está
          costando no tenerla. Una página bien construida trabaja desde el
          día uno, sin horarios y sin que vos tengas que explicar nada.
        </p>
      </div>
    </section>
  );
}

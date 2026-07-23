import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

export default function SinRiesgo() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="riesgo" ref={ref}>
      <div className={`container riesgo__inner ${revealClass(isVisible)}`}>
        <h2 className="section-title">Primero hablamos. Después decidís.</h2>
        <p>
          Entiendo tu negocio, lo que necesitás y lo que tiene sentido. Si no
          somos la opción correcta el uno para el otro, te lo digo. Sin
          compromiso previo. Sin presión.
        </p>
      </div>
    </section>
  );
}

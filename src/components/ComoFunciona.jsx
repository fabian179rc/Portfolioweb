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

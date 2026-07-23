import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

export default function Mecanismo() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="mecanismo" ref={ref}>
      <div className={`container mecanismo__inner ${revealClass(isVisible)}`}>
        <h2 className="section-title">La Página que Trabaja Antes que Vos</h2>
        <p>
          Una página bien construida no es un folleto online. Es un
          vendedor silencioso que trabaja las 24 horas: explica los
          servicios, genera confianza antes del primer contacto, y lleva
          al cliente directo a WhatsApp ya convencido.
        </p>
      </div>
    </section>
  );
}

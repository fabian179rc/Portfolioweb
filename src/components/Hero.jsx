import { CONTACT } from "../data/config";
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

export default function Hero() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0 });

  return (
    <section id="top" className="hero" ref={ref}>
      <div className="container hero__inner">
        <p className={revealClass(isVisible)}>Aceptando proyectos — 2026</p>
        <h1 className="hero__title">
          <span
            className={revealClass(isVisible, "hero__line")}
            style={{ transitionDelay: "0.1s" }}
          >
            Dejá de explicar
          </span>
          <span
            className={revealClass(isVisible, "hero__line")}
            style={{ transitionDelay: "0.25s" }}
          >
            lo mismo veinte veces.
          </span>
          <span
            className={revealClass(isVisible, "hero__line")}
            style={{ transitionDelay: "0.4s" }}
          >
            Que tu página lo haga por vos.
          </span>
        </h1>
        <p
          className={revealClass(isVisible, "hero__subtitle")}
          style={{ transitionDelay: "0.55s" }}
        >
          Una página que explica, genera confianza y lleva al cliente a tu
          WhatsApp ya decidido. Diseño y desarrollo web a medida para
          negocios en Argentina.
        </p>
        <div
          className={revealClass(isVisible, "hero__ctas")}
          style={{ transitionDelay: "0.7s" }}
        >
          <a href="#portfolio" className="btn btn--primary">
            Ver Portfolio →
          </a>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            WhatsApp Directo →
          </a>
        </div>
      </div>
    </section>
  );
}

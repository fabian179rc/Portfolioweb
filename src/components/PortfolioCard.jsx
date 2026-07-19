import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

export default function PortfolioCard({ caso }) {
  const [ref, isVisible] = useScrollReveal();
  const isExternal = caso.url.startsWith("http");

  return (
    <a
      ref={ref}
      href={caso.url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={revealClass(isVisible, "portfolio-card")}
      style={{ background: caso.gradient }}
    >
      {caso.image && (
        <img
          className="portfolio-card__image"
          src={caso.image}
          alt={caso.nombre}
        />
      )}
      <span className="portfolio-card__numero" aria-hidden="true">
        {caso.numero}
      </span>
      <div className="portfolio-card__body">
        <span className="portfolio-card__industria">{caso.industria}</span>
        <h3 className="portfolio-card__nombre">{caso.nombre}</h3>
        <p className="portfolio-card__descripcion">{caso.descripcion}</p>
        <span className="portfolio-card__link">Ver Proyecto →</span>
      </div>
    </a>
  );
}

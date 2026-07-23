import { useState } from "react";
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";
import PortfolioPreviewModal from "./PortfolioPreviewModal";

export default function PortfolioCard({ caso }) {
  const [ref, isVisible] = useScrollReveal();
  const [previewOpen, setPreviewOpen] = useState(false);

  const media = (
    <div
      className="portfolio-card__media"
      style={{
        background: caso.gradient,
        aspectRatio: caso.aspectRatio || "16 / 9",
      }}
    >
      {caso.image ? (
        <img
          className="portfolio-card__image"
          src={caso.image}
          alt={caso.nombre}
          style={{ objectPosition: caso.imagePosition || "center" }}
        />
      ) : (
        caso.preview && (
          <iframe
            className="portfolio-card__preview-frame"
            src={caso.preview}
            title={caso.nombre}
            tabIndex={-1}
            aria-hidden="true"
          />
        )
      )}
    </div>
  );

  const body = (
    <div className="portfolio-card__body">
      <span className="portfolio-card__industria">{caso.industria}</span>
      <h3 className="portfolio-card__nombre">{caso.nombre}</h3>
      <p className="portfolio-card__descripcion">{caso.descripcion}</p>
      <span className="portfolio-card__link">
        {caso.preview ? "Ver Vista Previa →" : "Ver Proyecto →"}
      </span>
    </div>
  );

  if (caso.preview) {
    return (
      <>
        <button
          ref={ref}
          type="button"
          className={revealClass(isVisible, "portfolio-card portfolio-card--button")}
          onClick={() => setPreviewOpen(true)}
        >
          {media}
          {body}
        </button>
        {previewOpen && (
          <PortfolioPreviewModal
            caso={caso}
            onClose={() => setPreviewOpen(false)}
          />
        )}
      </>
    );
  }

  const isExternal = caso.url.startsWith("http");

  return (
    <a
      ref={ref}
      href={caso.url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={revealClass(isVisible, "portfolio-card")}
    >
      {media}
      {body}
    </a>
  );
}

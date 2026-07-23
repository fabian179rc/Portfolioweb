import { useEffect } from "react";

export default function PortfolioPreviewModal({ caso, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="preview-modal-overlay" onClick={onClose}>
      <div
        className="preview-modal"
        role="dialog"
        aria-modal="true"
        aria-label={caso.nombre}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="preview-modal__header">
          <span className="preview-modal__title">{caso.nombre}</span>
          <button
            type="button"
            className="preview-modal__close"
            aria-label="Cerrar vista previa"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <iframe
          className="preview-modal__frame"
          src={caso.preview}
          title={caso.nombre}
        />
      </div>
    </div>
  );
}

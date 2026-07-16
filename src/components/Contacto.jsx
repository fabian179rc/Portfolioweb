import { useState } from "react";
import { CONTACT, WEB3FORMS_ACCESS_KEY } from "../data/config";
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

const TIPOS_PROYECTO = [
  "Sitio de Marca Completo",
  "Landing Page de Captación",
  "E-commerce",
  "Rediseño y Optimización",
  "Mantenimiento y Soporte",
];

export default function Contacto() {
  const [ref, isVisible] = useScrollReveal();
  const [status, setStatus] = useState("idle");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        event.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="consulta" className="contacto" ref={ref}>
      <div className={`container contacto__grid ${revealClass(isVisible)}`}>
        <div className="contacto__intro">
          <h2 className="section-title">Hablemos.</h2>
          <p className="section-subtitle">
            Cada proyecto merece una conversación real.
          </p>

          <form className="contacto__form" onSubmit={handleSubmit}>
            <label className="contacto__campo">
              <span>01 · Nombre</span>
              <input type="text" name="name" required />
            </label>

            <label className="contacto__campo">
              <span>02 · Email</span>
              <input type="email" name="email" required />
            </label>

            <label className="contacto__campo">
              <span>03 · Tipo de Proyecto</span>
              <select name="tipo_proyecto" required defaultValue="">
                <option value="" disabled>
                  Elegí una opción
                </option>
                {TIPOS_PROYECTO.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </label>

            <label className="contacto__campo">
              <span>04 · Contame sobre tu negocio</span>
              <textarea name="mensaje" rows="4" required />
            </label>

            <button
              type="submit"
              className="btn btn--primary"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Enviando…" : "Enviar Consulta →"}
            </button>

            {status === "success" && (
              <p className="contacto__estado contacto__estado--ok">
                Recibido. Te respondo en menos de 24hs.
              </p>
            )}
            {status === "error" && (
              <p className="contacto__estado contacto__estado--error">
                Algo falló. Escribime directo a {CONTACT.email}.
              </p>
            )}
          </form>
        </div>

        <div className="contacto__aside">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            WhatsApp Directo →
          </a>
          <p className="contacto__nota">
            Respuesta personal en menos de 24hs.
          </p>
        </div>
      </div>
    </section>
  );
}

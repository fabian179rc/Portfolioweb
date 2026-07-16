import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";
import { useCounter } from "../hooks/useCounter";

const METRICAS = [
  { target: 12, suffix: "+", label: "Proyectos" },
  { target: 8, suffix: "", label: "Industrias" },
  { target: 100, suffix: "%", label: "A Medida" },
  { target: 1, suffix: ":1", label: "Atención Directa" },
];

function Metrica({ target, suffix, label, startWhen }) {
  const value = useCounter(target, { startWhen });
  return (
    <div className="metrica">
      <span className="metrica__valor">
        {value}
        {suffix}
      </span>
      <span className="metrica__label">{label}</span>
    </div>
  );
}

export default function Metricas() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="metricas" ref={ref}>
      <div className={`container metricas__grid ${revealClass(isVisible)}`}>
        {METRICAS.map((metrica) => (
          <Metrica key={metrica.label} {...metrica} startWhen={isVisible} />
        ))}
      </div>
    </section>
  );
}

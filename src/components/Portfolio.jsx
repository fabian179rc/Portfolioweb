import { portfolio } from "../data/portfolio";
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";
import PortfolioCard from "./PortfolioCard";

const CASOS = [...portfolio, ...portfolio];

export default function Portfolio() {
  const [headingRef, headingVisible] = useScrollReveal();

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div ref={headingRef} className={revealClass(headingVisible)}>
          <h2 className="section-title text-accent">
            Resultados que hablan por sí solos.
          </h2>
        </div>
      </div>
      <div className="portfolio__carousel">
        <div className="portfolio__track">
          {CASOS.map((caso, index) => (
            <div key={`${caso.numero}-${index}`} className="portfolio__track-item">
              <PortfolioCard caso={caso} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

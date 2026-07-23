import { portfolio } from "../data/portfolio";
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";
import PortfolioCard from "./PortfolioCard";

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
        <div className="portfolio__grid">
          {portfolio.map((caso) => (
            <PortfolioCard key={caso.numero} caso={caso} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { portfolio } from "../data/portfolio";
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";
import PortfolioCard from "./PortfolioCard";

export default function Portfolio() {
  const [headingRef, headingVisible] = useScrollReveal();

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div
          ref={headingRef}
          className={`portfolio__heading ${revealClass(headingVisible)}`}
        >
          <h2 className="portfolio__kicker">El Portfolio</h2>
          <p className="section-subtitle">
            Una selección de trabajos recientes.
          </p>
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

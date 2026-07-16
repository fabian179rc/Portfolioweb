const TICKER_ITEMS = [
  "Diseño a Medida",
  "Desarrollo Web",
  "SEO",
  "Mobile-First",
  "Sin Plantillas",
  "Resultados Medibles",
];

export default function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="ticker">
      <div className="ticker__track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="ticker__item">
            {item} <span className="ticker__dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

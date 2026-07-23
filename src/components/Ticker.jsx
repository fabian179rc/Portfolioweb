const TICKER_ITEMS = [
  "Tu web debería convencer antes de que abran la boca",
  "Instagram te da seguidores. Una web te da clientes",
  "No diseñamos páginas bonitas. Diseñamos páginas que convierten",
  "Hecha a mano. Pensada para vos",
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

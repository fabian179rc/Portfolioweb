const FOOTER_LINKS = [
  { href: "#portfolio", label: "Portafolio" },
  { href: "#problema", label: "El Problema" },
  { href: "#servicios", label: "Servicios" },
  { href: "#filosofia", label: "Filosofía" },
  { href: "#consulta", label: "Consulta" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__logo">SeronStudio</p>
          <p className="footer__tagline">La página que trabaja antes que vos.</p>
        </div>
        <nav className="footer__links">
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="footer__legal">
          <p>© 2026 SeronStudio. Todos los derechos reservados.</p>
          <p>Por cita únicamente.</p>
        </div>
      </div>
    </footer>
  );
}

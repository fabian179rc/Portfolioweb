import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Metricas from "./components/Metricas";
import Portfolio from "./components/Portfolio";
import Servicios from "./components/Servicios";
import Filosofia from "./components/Filosofia";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Ticker />
      <Metricas />
      <Portfolio />
      <Servicios />
      <Filosofia />
      <Contacto />
      <Footer />
    </>
  );
}

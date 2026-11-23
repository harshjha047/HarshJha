import { useEffect } from "react";
import Lenis from "lenis";
import Portfolio from "./Portfolio.jsx";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis();
    let id;
    const raf = (time) => {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return <Portfolio />;
};

export default App;

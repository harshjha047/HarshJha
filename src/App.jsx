import { useEffect } from "react";
import { initSmoothScroll } from "./smooth.js";
import Portfolio from "./Portfolio.jsx";

const App = () => {
  useEffect(() => initSmoothScroll(), []);
  return <Portfolio />;
};

export default App;

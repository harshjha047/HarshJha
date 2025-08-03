import Nav from "./Nav";
import Content from "./Content.jsx";
import Footer from './Footer.jsx'
import { useEffect } from "react";
import Lenis from "lenis";

const App = () => {
  useEffect(()=>{
  const lenis  = new Lenis()
  function raf(time){
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  },[])
  return (
    <>
      <Nav></Nav>
      <Content></Content>
      <Footer></Footer>
    </>
  );
};
export default App;

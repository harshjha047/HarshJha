import Nav from "./Nav";
import Content from "./Content.jsx";
import Footer from './Footer.jsx'
import { createContext, useEffect, useState } from "react";
import Lenis from "lenis";
export const myContext = createContext()


const App = () => {
  const [mode, setMode]=useState(false)

  useEffect(()=>{
  const lenis  = new Lenis()
  function raf(time){
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  },[])

  // transfer data using hoc
  return (
    <>
    <div className={`${mode?"bg-[#111]":""}`}>
      <myContext.Provider value={[mode, setMode]}>
      <Nav></Nav>
      <Content></Content>
      <Footer></Footer>
      </myContext.Provider>
      </div>
    </>
  );
};
export default App;

import Nav from "./Nav";
import Content from "./Content.jsx";
import Footer from './Footer.jsx'
import { createContext, useEffect, useState } from "react";
import Lenis from "lenis";
import {preloadAssets}from "./provider.js"
export const myContext = createContext()


const App = () => {
  const [mode, setMode]=useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
  const lenis  = new Lenis()
  function raf(time){
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

   preloadAssets()
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to preload:", err);
        setLoading(false); 
      });
  },[])


  if (loading) {
    return (
      <div id="loader" className="h-[100vh] bg-black text-white">
        <div id="loaderItem" className=""></div>
      </div>
    );
  }

  return (
    <>
    <div className={`  transition-all duration-200 ${mode?"bg-[#111]":""} rat`}>
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

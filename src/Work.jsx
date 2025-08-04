import React, { useContext } from 'react'
import Project from "./Project.jsx"
import { myContext } from './App.jsx'

function Work() {
  const [mode, setMode]=useContext(myContext)
 const Mode = mode?"text-[#fff]":"" 

  return (
    <>
    <div id='Work' className={`w-[91%] ${Mode}`}>
        <h1 className='font-[ClashDisplay-Semibold] text-8xl/[154px]'>Recent works</h1>
        <div className="w-full flex flex-wrap justify-between">
            <Project></Project>
        </div>
    </div>
    </>
  )
}

export default Work
import React, { useContext } from 'react'
import Project from "./Project.jsx"
import Clone from "./Clone.jsx"
import { myContext } from './App.jsx'

function Work() {
  const [mode, setMode]=useContext(myContext)
 const Mode = mode?"text-[#fff]":"" 

  return (
    <>
    <div id='Work' className={`w-[91%] ${Mode}`}>
        <h1 className='font-[ClashDisplay-Semibold] text-8xl/[154px]'>Recent works</h1>
        <div className="w-full flex flex-wrap flex-col gap-2 justify-between">
            <Project></Project>
        </div>
        <h1 className='font-[ClashDisplay-Semibold] text-8xl/[154px]'>Clones</h1>
            <div className="w-full flex flex-wrap flex-col gap-2 justify-between">
            <Clone></Clone>
        </div>
    </div>
    </>
  )
}

export default Work
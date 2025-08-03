import React from 'react'
import Project from "./Project.jsx"

function Work() {
  return (
    <>
    <div id='Work' className="w-[91%]">
        <h1 className='font-[ClashDisplay-Semibold] text-8xl/[154px]'>Recent works</h1>
        <div className="w-full flex flex-wrap justify-between">
            <Project></Project>
        </div>
    </div>
    </>
  )
}

export default Work
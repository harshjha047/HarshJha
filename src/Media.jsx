import React, { useState } from 'react'
import API from './API'

function Media() {
    const [img, setImg]=useState(API.InstaImg)
  return (
    <>
    <div className="flex w-full justify-between flex-wrap mediaWrap">
     <div className="w-[48%]  px-11 py-8 rounded-[44px] bg-gradient-to-t from-[#08437D] to-[#0882BD]">
        <div className="img w-[100%] h-[90vh] mediaImgFrame flex justify-center items-center relative"><div className=" absolute border  border-[#ffffff3f] animate-ping h-[20vh] w-[20vh] rounded-full"></div><div className=" absolute border border-[#ffffff28] animate-ping h-[30vh] w-[30vh] rounded-full"></div><img className='h-[25vh] w-[25vh] rounded-full object-cover relative my-2 z-10' src="https://media.licdn.com/dms/image/v2/D5603AQF8bYdkGLdfcA/profile-displayphoto-shrink_200_200/B56ZQ6W0nTGsAg-/0/1736145854489?e=1756944000&v=beta&t=OxxrDylxsjCszkGjKB9-vIi-aA07e5qCi221BEdKqCY" alt="" /></div>
        <div className="">
            <h1 className='font-[ClashDisplay-Semibold] text-[30px]/[36px] text-white'>Connect on Linkedin</h1>
            <p className='font-[Switzer-Regular] text-[16px]/[24px] my-4 text-white'>All work and Project related updates</p>
            <a className=' inline-block my-3' href="www.linkedin.com/in/harsh-jha0047"> <button className='bg-[#00000023] hover:shadow-2xl hover:scale-105 transition-all duration-500 rounded-full font-[Switzer-Medium] text-[16px]/[16px] px-9 py-4 flex justify-center items-center border text-white'>#harsh-jha0047 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right ml-2" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg></button> </a>
        </div>
     </div>

      <div className="w-[48%] px-11 py-8 rounded-[44px] bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]">
        <div className="img w-[100%] h-[90vh] mediaImgFrame flex justify-center items-center"><img src={img} className='w-full my-2' alt="" /></div>
        <div className="">
            <h1 className='font-[ClashDisplay-Semibold] text-[30px]/[36px] text-white'>Follow me on Instagram</h1>
            <p className='font-[Switzer-Regular] text-[16px]/[24px] my-4 text-white'>life updates</p>
            <a className=' inline-block my-3' href="https://www.instagram.com/harsh_jha0?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="> <button className='text-white rounded-full bg-[#00000023] hover:shadow-2xl hover:scale-105 transition-all duration-500 font-[Switzer-Medium] text-[16px]/[16px] px-9 py-4 flex justify-center items-center border'>@harsh_jha0 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right ml-2" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg></button> </a>
        </div>
     </div>
     </div>
    </>
  )
}

export default Media
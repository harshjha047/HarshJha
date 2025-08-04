import { useContext, useState } from "react";
import API from "./API"
import { myContext } from "./App";


const Project = () => {
    const [data, setData]=useState(API.project)
    const [mode, setMode]=useContext(myContext)
    const Mode = mode?"#fff":"#000" 
    
  return (
    <>
    
        {data.map((ref,ind)=>{
            return(<>
            <div key={ind} className="h-[45vh] workCard  w-[48%] flex items-center ">
        <div className="h-[83%]  w-[100%] rounded-[50px] flex justify-center items-center bg-[#83838327]">
          <div className="h-[70%] w-[85%]  relative">
            <div className="h-[43%] w-full  absolute top-0 flex justify-between flex-col">
              <h1 className="font-[Switzer-Medium] text-[32px]/[38px]">
                {ref.name}
              </h1>
              <p className="font-[Switzer-Medium] text-sm/[17px] text-[#949494]">
                {ref.date} / {ref.role}
              </p>
            </div>
            <div className="h-[50%] w-full  absolute bottom-0 flex justify-between">
              <div className="w-[80%] h-[100%] workCardDis flex flex-col relative"><div className="absolute bottom-0 w-full  font-[Switzer-Regular]">{ref.discription}</div></div>
              <div className="w-[18%] h-[100%] flex justify-center items-center"><a className={`h-[13vh] w-[13vh] navPro rounded-full border-[#d1d1d1] hover:border-[#858585] hover:shadow-2xl shadow-[${Mode}] hover:scale-105 transition-all duration-500 flex justify-center items-center border`} href={ref.link}><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M11.0032 3.69631L2.39663 12.3029L0.982422 10.8887L9.58901 2.2821H2.00324V0.282104H13.0032V11.2821H11.0032V3.69631Z" fill={`${Mode}`}/></svg></a></div>
            </div>
          </div>
        </div>
      </div>
            </>)})}

      
    
    </>
  );
};
export default Project;

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
           <div className={`border-b projectItem p-2 hover:border-[#858585] hover:shadow-xl shadow-[${Mode}]`}>
            <a href={ref.link} className="h-full w-full flex justify-between items-center relative" style={{color: Mode}}>
              <div className="">
                <h2 className="font-[Switzer-Medium] text-[32px]/[38px]">{ref.name}</h2>
                <div className="font-[Switzer-Medium] text-sm/[17px] text-[#949494]">{ref.date} | {ref.role}</div>
                {/* <p className="font-[Switzer-Regular] projectDisPara mt-1">{ref.discription}</p> */}
                
              </div>
              <div className={` absolute right-40 w-[25%] h-[28vh] projectImg shadow-2xl shadow-[${Mode}]`}><img src={ref.img} className="h-full w-full object-cover" alt="" /></div>
              <div className=" p-5 rounded-full "><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M11.0032 3.69631L2.39663 12.3029L0.982422 10.8887L9.58901 2.2821H2.00324V0.282104H13.0032V11.2821H11.0032V3.69631Z" fill={`${Mode}`}/></svg></div>
            </a>
           </div>
            </>)})}

      
    
    </>
  );
};
export default Project;

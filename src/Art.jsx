import { useState } from "react";
import API from "./API";
const Art = () => {
  const [dp, usedp]=useState(API.ProfileImg)
  return (
    <>
      <article className="h-[135vh]  relative flex justify-center items-center">
          <div className=" text-[112px]/[129px] font-bold font-[ClashDisplay-Semibold] flex flex-col justify-center absolute w-[90vw]">
           <div className="font-[ClashDisplay-Semibold]  flex justify-start items-center"> Hi, i'm Harsh, <span className={`bg-[url('${dp}')] bg-center bg-cover bg-no-repeat h-[22vh] w-[22vh] inline-block rounded-full border ml-5 overflow-hidden`}> <img src={dp} className="w-full object-cover" alt="" /> </span> </div>
           <div className="font-[ClashDisplay-Semibold] "> a Full-Stack Web Developer</div>
        </div>
      </article>
      {/* https://helloalmaz.com/ */}
    </>
  );
};
export default Art;

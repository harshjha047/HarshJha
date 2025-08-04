import {useContext} from "react";
import { myContext } from "./App";
import { IoSunnySharp, IoMoonSharp  } from "react-icons/io5";



function Nav() {
  const[mode, setMode]=useContext(myContext)
 const Mode = mode?"text-gray-300":"text-gray-500" 

  return (
    <>
      <div className="w-full navbar h-[10vh] flex justify-center items-center absolute top-0">
        <div className="w-[90%] navdo h-full flex gap-3 items-center relative">
          <a className={` font-[Switzer-Regular] ${Mode}`}  href="#">Home</a>
          <a className={` font-[Switzer-Regular] ${Mode}`}  href="#Work">Posts</a>
        <div className={`border w-[4vh] h-[4vh] rounded-full flex justify-center right-0 absolute items-center ${mode?"text-[#fff]":""}`} onClick={()=>{setMode(!mode)}}>{mode?<IoMoonSharp />:<IoSunnySharp/>}</div>

        </div>
      </div>
    </>
  );
}

export default Nav;

import { useContext } from "react";
import { myContext } from "./App";
import  Resume from "./media/HarshJhaResume.pdf"
const Footer =()=>{
      const [mode, setMode] = useContext(myContext);
      const Mode = mode ? "#fff" : "#000000";
    return(<>
    <div className={`h-[75vh] flex items-center w-full justify-end flex-col text-[${Mode}]`}>
        <div className="font-[Switzer-Regular] w-[91%] ">Need more Information about me ? here's my: <a href={Resume} className="font-[Switzer-Regular] hover:underline text-[#8f8f8f] transition-all duration-300 " download="HarshJhaResume"><svg className="inline-block mx-2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z" fill={`${Mode}`}></path></svg> Resume</a></div>
        <div className="w-[91%]">
            <div className="font-[ClashDisplay-Medium] text-[60px]/[80px] h-[45vh] w-[91%]  text-[#8f8f8f] flex flex-col justify-center ">GitHub: <br /><a className={`font-[ClashDisplay-Medium] text-[60px]/[80px] inline-block text-[${Mode}] hover:text-[65px]/[80px] transition-all duration-300`} href="https://github.com/harshjha047">@harshjha047</a></div>
        </div>
    </div>
    
    </>)
}
export default Footer
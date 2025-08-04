import Media from "./Media.jsx";
import { useContext } from "react";
import { myContext } from "./App";

function Profile() {
  const [mode, setMode] = useContext(myContext);
  const Mode = mode ? "text-[#fff]" : "";

  return (
    <>
      <div className={`w-[91%] ${Mode}`} >
        <h1 className="font-[ClashDisplay-Semibold] text-8xl/[154px] mt-48">
          Personal Media
        </h1>
        <Media />
      </div>
    </>
  );
}

export default Profile;

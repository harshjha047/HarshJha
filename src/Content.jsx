import Art from "./Art.jsx";
import Work from "./Work.jsx";
import Profile from "./Profile.jsx"
import {useContext} from "react";
import { myContext } from "./App";

const Content = () => {

  return (
    <>
    <div className={`w-full flex flex-col items-center `}>
      <Art />
      <Work />
      <Profile/>
      </div>
    </>
  );
};
export default Content;

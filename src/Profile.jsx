import React from "react";
import Media from "./Media.jsx";

function Profile() {
  return (
    <>
      <div className="w-[91%] ">
        <h1 className="font-[ClashDisplay-Semibold] text-8xl/[154px] mt-48">
          Personal Media
        </h1>
          <Media />
      </div>
    </>
  );
}

export default Profile;

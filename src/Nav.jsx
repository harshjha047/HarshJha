import React from "react";

function Nav() {
  return (
    <>
      <nav className="w-full h-[10vh] flex justify-center items-center absolute top-0">
        <div className="w-[90%] h-full flex gap-3 items-center ">
          <a className=" font-[Switzer-Regular] text-gray-500" href="#">Home</a>
          <a className=" font-[Switzer-Regular] text-gray-500" href="#Work">Posts</a>
        </div>
      </nav>
    </>
  );
}

export default Nav;

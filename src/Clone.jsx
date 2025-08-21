import React, { useState } from "react";
import API from "./API";

function Clone() {
  const [data, setData] = useState(API.clone);
  return <div className="flex gap-2 flex-wrap ">
    {data.map((ref,ind) => {
        return(
            <a href={ref.link} key={ind}>
            <div className="border px-4 font-[Switzer-Medium] py-1 rounded hover:shadow-lg hover:scale-110">{ref.name}</div>
            </a>
        )
    })}
    </div>;
}

export default Clone;

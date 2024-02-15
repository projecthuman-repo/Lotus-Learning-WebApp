import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const BluredText = ({text, limit}) => {

    const [openText, setOpenText] = useState(false)
    const limitedText = text.slice(0, limit);

  return (
    <>
      <div className={`${openText? '': 'fadeout_bottom' } `}>
        <p className=" text-justify">
            {openText? 
            text
            :
            limitedText
            }
        </p>
      </div>
      <div className="w-full flex justify-end">
        <p onClick={() => setOpenText(!openText)} className="sm:text-sm text-xs  flex items-center cursor-pointer text_linearGradient_ver1 hover:underline">
          {openText? "See less" : "See more"}
        </p>
      </div>
    </>
  );
};

export default BluredText;

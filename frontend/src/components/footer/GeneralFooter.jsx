import React from "react";
import Icon from "../../Images/LotusLogoW2.png";

const GeneralFooter = () => {
  return (
    <div className="w-full animated_linearGradient_ver1">
      <p className="text-white  border-b  p-3 font-semibold">
        Let's give learning a different perspective!
      </p>
      <div className="text-white  text-xs px-4 py-3 flex justify-between">
        <div className="hidden items-center space-x-1 md:flex ">
          <img src={Icon} alt="icon" className="h-[45px]" />
          <p className="text-white font-semibold text-lg">Lotus Learning</p>
        </div>
        <div className="space-x-5 flex justify-between">
          
          <div className="space-y-1">
            <p className="cursor-pointer text-end">About us</p>
            <p className="cursor-pointer text-end">Contact us</p>
            <p className="cursor-pointer text-end">FAQ</p>
            <p className="cursor-pointer text-end">Terms</p>
          </div>
         
          <img src={Icon} alt="icon" className="h-[30px]" />

        </div>
      </div>
    </div>
  );
};

export default GeneralFooter;

import React from "react";
import { MdOutlineModeComment } from "react-icons/md";
import { MdStarBorder } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import { VscEdit } from "react-icons/vsc";
import OnHoverExtraHud from "../OnHoverExtraHud";

const MyCoursesCard = () => {
  return (
    <div className="flex items-center space-x-2 border rounded-sm p-2 bg-white">
      <img
        className="md:h-[80px] h-[60px] md:w-[180px] w-[120px] object-fill rounded-md"
        src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2023/07/Subject-Complement.png"
      />
      <div className="flex w-full justify-between items-center">
        <div className="md:w-[40%]">
          <p className="text-xs font-semibold text_linearGradient_ver1">
            Course Name
          </p>
          <p className="text-sm text-stone-800">Learning Math</p>
        </div>
        <div></div>
        <div className="w-[30%] ">
          <p className="md:block hidden text-xs font-semibold text_linearGradient_ver1">
            Interactions
          </p>
          <div className="flex flex-col md:flex-row md:space-x-2 space-x-0 mt-1">
            <div className="text-stone-800 flex items-center cursor-pointer hover:underline ">
              <MdOutlineModeComment />
              <p className="text-xs mx-1">200</p>

            </div>
            <div className="text-stone-800 flex items-center cursor-pointer  hover:underline ">
              <MdStarBorder />
              <p className="text-xs mx-1">4.7</p>
            </div>
            <div className="text-stone-800 flex items-center cursor-pointer  hover:underline ">
              <HiOutlineUser />
              <p className="text-xs mx-1">200</p>

            </div>
          </div>
        </div>
        <div className="w-[10%] flex items-end justify-end px-2">
          <button
            type="button"
            className=" w-auto text-end  rounded-md text-sm py-1  hover-parent"
          >
            <VscEdit />
            <OnHoverExtraHud name='Edit'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCoursesCard;

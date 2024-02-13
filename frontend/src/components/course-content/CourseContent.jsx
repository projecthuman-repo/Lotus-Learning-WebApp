import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import {  RiFile3Line } from "react-icons/ri";
import { MdOndemandVideo } from "react-icons/md";

import { AiFillAudio } from "react-icons/ai";
import { RiGameLine } from "react-icons/ri";
import { MdOutlineDone } from "react-icons/md";

const CourseContent = () => {
  return (
    <div className="w-full  cursor-pointer no-select   space-y-[.1rem]">
      <ModuleContent moduleName={'Module 1'}/>
      <ModuleContent moduleName={'Module 2'}/>
      <ModuleContent moduleName={'Module 3'}/>
      <ModuleContent moduleName={'Module 4'}/>
      <ModuleContent moduleName={'Module 5'}/>
    </div>
  );
};

const ModuleContent = ({moduleName}) => {
  const [openModules, setOpenModules] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpenModules(!openModules)}
        className={`flex justify-between items-center h-[45px]  bg-stone-50 w-full px-3 hover:bg-stone-100 border-t border-x border-b`}
      >
        <p className="text-stone-600 text-base font-medium">{moduleName}</p>
        {openModules ?
        <IoIosArrowUp  />
        :
        <IoIosArrowDown />
        }
      </div>
      <div
        className={`w-full ${
          openModules ? "h-auto" : "h-[0px]"
        } overflow-hidden `}
      >
        <div className="pt-[0.15rem] border-x bg-white border">
          <Class type={<AiFillAudio/>} className={'Class name'} />
          <Class type={<MdOndemandVideo/>} className={'Class name'} />
          <Class type={<RiFile3Line/>} className={'Class name'} />
          <Class type={<RiFile3Line/>} className={'Class name'} />
          <Class type={<RiGameLine/>} className={'Class name'} />
          <Class type={<AiFillAudio/>} className={'Class name'} />
        </div>
      </div>
    </>
  );
};

const Class = ({type, className}) => {
  return (
    <div className="flex items-center justify-between h-[35px]  px-4">
      <div className="flex items-center space-x-2">
        {type}
        <p className="text-sm ">{className}</p>
      </div>
      <div className={`p-1  rounded-full flex items-center justify-center `}>
        <p className="text-xs">Extra details</p>    
      </div>
    </div>
  );
};

// const Lession = () => {
//     const [openClass, setOpenClass] = useState(false);

//     return (
//       <>
//         <div
//           onClick={() => setOpenClass(!openClass)}
//           className="flex justify-between items-center px-3 hover:bg-stone-50 h-[40px] border-x border-t  "
//         >
//           <p className="text-stone-600">Lesson 1</p>
//           <IoIosArrowDown />
//         </div>
//         <div
//           className={`w-full ${
//             openClass ? "h-auto" : "h-[0px]"
//           } overflow-hidden `}
//         >
//           <div className="px-4  border-x ">
//             <Class />
//             <Class />
//             <Class />
//             <Class />
//             <Class />
//           </div>
//         </div>
//       </>
//     );
//   };

export default CourseContent;

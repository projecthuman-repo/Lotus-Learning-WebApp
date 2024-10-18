import React from "react";
import styles from "../../Styles";
import { IoIosSearch } from "react-icons/io";
import MyCoursesCard from "./MyCoursesCard";
import { HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {

  const navigate = useNavigate()


  return (
    <div className="w-full min-h-[70vh]  rounded-sm p-1 no-select">
      <div className={`flex items-center justify-between mb-2`}>
        <div>
          <button onClick={() => navigate('/create-new-course/1')} className="font-semibold text-stone-600 border  rounded-md p-2 flex items-center hover:bg-stone-50 md:text-sm text-[.65rem]">Create new course <HiOutlinePlus className="mx-1"/></button>
        </div>
        <div
          className={`flex items-center justify-between w-[250px] ${styles.simple_text_input} bg-white`}
        >
          <input
            type="text"
            placeholder="Serch Course"
            className="w-full focus:outline-none text-sm"
          />
          <IoIosSearch className="ml-2" />
        </div>
      </div>
      <div className="space-y-1">
        <MyCoursesCard/>
        <MyCoursesCard/>
        <MyCoursesCard/>
        <MyCoursesCard/>
        <MyCoursesCard/>
        <MyCoursesCard/>
        <MyCoursesCard/>
        <MyCoursesCard/>
      </div>
    </div>
  );
};

export default MyCourses;

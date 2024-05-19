import React from "react";
import GeneralCourseCard from "../../../../components/course-cards/GeneralCourseCard";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

const StudentProfile = () => {
  return (
    <>
      <div className="bg-white rounded-full flex justify-between items-center py-2 px-4 mb-3">
          <p className="font-semibold text-lg">Your Courses</p>
          <div className="flex items-center space-x-3">
            <div className="cursor-pointer hover:bg-stone-100 p-2 rounded-full transition-all">
              <FaSortAlphaDownAlt className="text-stone-800" />
            </div>
            <div className="flex items-center">
              <input
                placeholder="Search by name"
                className="text-sm focus:outline-none  focus:border-b-stone-400 border-b-transparent border-b-[1.5px]  pr-2 py-1 font-medium text-stone-600 "
              />
              <IoMdSearch />
            </div>
          </div>
        </div>
      <div className="max-h-[90vh] overflow-y-auto flex flex-wrap  items-start ">
        <GeneralCourseCard />
        <GeneralCourseCard />
        <GeneralCourseCard />
        <GeneralCourseCard />
        <GeneralCourseCard />
      </div>
    </>
  );
};

export default StudentProfile;

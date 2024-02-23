import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CommentsPopUp from "../coments-pop-up/CommentsPopUp";

const RedommendedCourse = () => {
  const navigate = useNavigate();


  return (
    <>
      <div
        onClick={() => {
          navigate("/course");
        }}
        className="w-full flex hover:bg-stone-50 p-1 rounded-md cursor-pointer"
      >
        <img
          className="w-[150px] h-[80px] rounded-md"
          alt="course-img"
          src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2023/07/Subject-Complement.png"
        />
        <div className="ml-2">
          <p className="font-semibold text-sm">Course Title</p>
          <p className="font-medium  text-[.65rem] flex flex-wrap space-x-1">
            <span>#algebra</span>
            <span>#IT</span>
            <span>#Math</span>
            <span>#Math</span>
            <span>#Math</span>
            <span>#Math</span>{" "}
          </p>
          <p className="flex text-xs items-center font-medium text-stone-700">
            <FaStar className="mr-1 text-yellow-400 " />
            <span className="text-stone-500">4.2</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default RedommendedCourse;

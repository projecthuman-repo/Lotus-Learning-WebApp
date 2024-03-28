import React from "react";
import { useNavigate } from "react-router-dom";

const ComputerScience11CourseCard = () => {

  const navigate = useNavigate()


  return (
    <div onClick={() => navigate('/course')} className="cursor-pointer xl:w-[350px] lg:w-[320px] md:w-[270px]  xl:h-[250px] lg:h-[250px] md:h-[200px] sm:h-[250px] sm:w-[50vw] w-[90vw] h-[80vw]  hover:bg-stone-50 rounded-md">
      <div className="w-full h-[calc(100%-6rem)] sm:h-[calc(100%-4rem)] flex items-center justify-center p-2 ">
        <img
          className="h-full w-full object-cover rounded-sm"
          src="https://s3-us-west-2.amazonaws.com/www-cse-public/k12outreach/Banner-3.jpg"
          alt=""
        />
      </div>
      <div className="px-2 flex flex-col justify-between h-[3rem] ">
        <p className="flex justify-between text-sm font-semibold">
          {" "}
          <span>Computer Science Grade 11</span> <span className="font-medium">$50 CAD</span>{" "}
        </p>

        <p className=" font-semibold text-xs">Instructor: Timmy Lee </p>
      </div>
    </div>
  );
};

export default ComputerScience11CourseCard;

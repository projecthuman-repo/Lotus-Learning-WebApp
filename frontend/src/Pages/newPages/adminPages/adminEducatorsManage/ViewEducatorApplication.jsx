import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdOpen } from "react-icons/io";
import OnHoverExtraHud from "../../../../components/OnHoverExtraHud";
import { MdClose, MdDone } from "react-icons/md";
import { LuClapperboard } from "react-icons/lu";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const ViewEducatorApplication = () => {
  const navigate = useNavigate();

  return (
    <div className="m-auto max-w-[1200px] mt-3 min-h-[100vh]">
      <div className="bg-white rounded-full flex justify-between items-center py-2 px-4">
        <div className="flex items-center space-x-2">
          <p className="font-semibold text-lg">Check Application</p>
        </div>
        <div className=" flex space-x-2 items-center justify-end">
          <div className="p-2 hover:bg-green-200 transition-all bg-green-100 rounded-full cursor-pointer hover-parent">
            <MdDone className="text-md text-green-700 " />
            <OnHoverExtraHud name={"Accept "} />
          </div>
          <div className="p-2 hover:bg-red-200 transition-all bg-red-100 rounded-full cursor-pointer hover-parent">
            <MdClose className="text-md text-red-700 " />
            <OnHoverExtraHud name={"Reject"} />
          </div>
        </div>
      </div>
      <div className="px-4 py-2 bg-white rounded-lg my-2">
        <table className="w-full table-fixed">
          <thead className="">
            <tr className="text-lg">
              <th className="font-medium">Name</th>
              <th className="font-medium">Application Date</th>
              <th className="font-medium">Email</th>
              <th className="font-medium">Resumme</th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td className="">Hoge Hoge</td>
              <td className="">February 20</td>
              <td className="">hoge@gmail.com</td>
              <td className="cursor-pointer hover:underline flex items-center ">
                Open Resumme
                <IoMdOpen className="ml-2" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 bg-white rounded-lg my-2">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">Astronomy 9</p>
          <div className="flex items-center space-x-1">
            <div className="text-xs  linearGradient_ver1 px-2 py-1 rounded-full text-white">
              Categorie
            </div>
            <div className="text-xs  linearGradient_ver1 px-2 py-1 rounded-full text-white">
              Categorie
            </div>
            <div className="text-xs  linearGradient_ver1 px-2 py-1 rounded-full text-white">
              Categorie
            </div>
          </div>
        </div>
        <p className="text_linearGradient_ver1 font-medium text-sm">
          Medium (11-13)
        </p>
        <p className="text-sm mt-1">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, velit!
          Maiores ad dolores enim inventore iste? Debitis provident dicta quis?
          Nihil saepe reiciendis debitis placeat dolore dolorem ipsum,
          architecto dolorum?
        </p>
      </div>
      <div className="px-4 py-2 bg-white rounded-lg my-2">
        <p className="font-semibold text-lg">Course Syllabus</p>
        <div className="mt-2 flex flex-col space-y-2">
          <CourseUnit />
          <CourseUnit />
          <CourseUnit />
          <CourseUnit />
          <CourseUnit />
          <CourseUnit />
        </div>
      </div>
    </div>
  );
};

const CourseUnit = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-2 px-2 border rounded-lg flex flex-col ">
      <div
        onClick={() => setOpen(!open)}
        className="hover:bg-stone-50 rounded-full px-2 py-1 flex justify-between items-center w-full cursor-pointer "
      >
        <div className="flex items-center">
            {open ?
                <IoIosArrowDown className="mr-2"/>:
                <IoIosArrowForward className="mr-2" />
            }
          <div>Unit1</div>
        </div>
        <LuClapperboard />
      </div>
      {open && (
        <div className="mt-2 px-2">
          <div className="flex justify-between">
            <div className="relative h-[120px] w-[200px] bg-stone-200 rounded-lg cursor-pointer">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[30] h-full w-full flex items-center justify-center opacity-[0] hover:opacity-[1] transition-all ">
                <div className="bg-stone-400 px-2 rounded-full">
                  <p className="text-white font-medium text-sm">Play media</p>
                </div>
              </div>
            </div>
            <div className="w-full ml-2">
              <p className=" text-sm text-justify">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
                neque aperiam tenetur rem dolorum corrupti consequuntur
                praesentium ratione saepe! Quidem incidunt itaque labore unde?
                Voluptates omnis modi vitae porro ipsum?
              </p>
              <div className="mt-2 w-full flex items-center">
                <p className="text-sm">4 Extra Activities </p>
                <MdOutlineBookmarkAdded className="ml-2"/>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewEducatorApplication;

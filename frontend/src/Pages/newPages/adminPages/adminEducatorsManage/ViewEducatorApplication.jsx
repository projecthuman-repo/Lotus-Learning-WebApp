import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdOpen } from "react-icons/io";
import OnHoverExtraHud from "../../../../components/OnHoverExtraHud";
import { MdClose, MdDone } from "react-icons/md";
import { LuClapperboard } from "react-icons/lu";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import getCourseData from "../../../../BackendProxy/courseProxy/getCourseData";
import AcceptRejectPetition from "../../../../components/accept-reject-classpetition/AcceptRejectPetition";

const ViewEducatorApplication = () => {

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState()
  const [loading, setLoading] = useState(true)
  const [doubleValidating, setDoubleValidating] = useState(false)
  const [acceptPetition, setAcceptPetition] = useState(true)
  useEffect(() => {
    getCourseInfo(id)
  },[id])
  const getCourseInfo = async (id) => {
    try {
      const data = await getCourseData(id) 
      setCourseData(data.data);
      setLoading(false)
      return data.data
    } catch (error) {
      console.error('error fetching course data')
    }
  }

  const triggerValidation = (accept) => {
    setAcceptPetition(accept)
    setDoubleValidating(true)
  }


  return (
    <div className="m-auto max-w-[1200px] mt-3 min-h-[100vh]">
      {doubleValidating &&
        <AcceptRejectPetition setOpen={setDoubleValidating} open={doubleValidating} accept={acceptPetition} id={id} course={courseData}/>
      }
      {loading? 
      <div>dd</div>
      :
      <>
            <div className="bg-white rounded-full flex justify-between items-center py-2 px-4">
        <div className="flex items-center space-x-2">
          <p className="font-semibold text-lg">Check Application</p>
        </div>
        <div className=" flex space-x-2 items-center justify-end">
          <div
          onClick={() => triggerValidation(true)}
          className="p-2 hover:bg-green-200 transition-all bg-green-100 rounded-full cursor-pointer hover-parent">
            <MdDone className="text-md text-green-700 " />
            <OnHoverExtraHud name={"Accept "} />
          </div>
          <div 
          onClick={() => triggerValidation(false)}
          className="p-2 hover:bg-red-200 transition-all bg-red-100 rounded-full cursor-pointer hover-parent">
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
              <td className="">{courseData && courseData.creator.username}</td>
              <td className="">February 20</td>
              <td className="">{courseData && courseData.creator.email}</td>
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
          <p className="font-semibold text-lg">{courseData && courseData.title}</p>
          <div className="flex items-center space-x-1">
            {courseData && courseData.categories.map((item, i) => {
              return (
                <div key={i} className="text-xs  linearGradient_ver1 px-2 py-1 rounded-full text-white">
                {item}
               </div>
              )
            })}
          </div>
        </div>
        <p className="text_linearGradient_ver1 font-medium text-sm">
          {courseData && courseData.age}
        </p>
        <p className="text-sm mt-1">
          {courseData && courseData.description}
        </p>
      </div>
      <div className="px-4 py-2 bg-white rounded-lg my-2">
        <p className="font-semibold text-lg">Course Syllabus</p>
        <div className="mt-2 flex flex-col space-y-2">
          {courseData && courseData.lessons.map((item, id) => {
            return (
              <CourseUnit  item={item} />
            )
          })}
        </div>
      </div>
      </>
      }

    </div>
  );
};

const CourseUnit = ({item}) => {
  const [open, setOpen] = useState(false);

  return (
    <div key={item._id} className="py-2 px-2 border rounded-lg flex flex-col ">
      <div
        onClick={() => setOpen(!open)}
        className="hover:bg-stone-50 rounded-full px-2 py-1 flex justify-between items-center w-full cursor-pointer "
      >
        <div className="flex items-center">
            {open ?
                <IoIosArrowDown className="mr-2"/>:
                <IoIosArrowForward className="mr-2" />
            }
          <div>{item.title}</div>
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
                {item.description}
              </p>
              <div className="mt-2 w-full flex items-center">
                <p className="text-sm">{item.extraActivities.length} Extra Activities </p>
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

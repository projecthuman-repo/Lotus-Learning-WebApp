import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GeneralNavbar from "../../../../components/navbar/GeneralNavbar";
import BlobComposition from "../../../../components/backgrounds/BlobComposition/BlobComposition";
import { IoMdSearch } from "react-icons/io";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaSortAlphaUp } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import OnHoverExtraHud from "../../../../components/OnHoverExtraHud";
import { IoIosAdd } from "react-icons/io";
import getCourses from "../../../../BackendProxy/courseProxy/getCourses";
import SpinnerLoader from "../../../../components/loaders/SpinnerLoader";

const AdminManageCourses = () => {
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false);
  const [courses, setCourses] = useState([]);

  const getAllCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data);
      setLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {console.log(courses)},[courses])

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div>
      <GeneralNavbar />
      <BlobComposition
        blobsData={[
          { top: "10%", left: "-20%", size: "700px" },
          { top: "-30%", left: "70%", size: "400px" },
          { top: "40%", left: "50%", size: "300px" },
        ]}
      />
      <div className="m-auto max-w-[1200px] mt-3 min-h-[100vh]">
        <div className="bg-white rounded-full flex justify-between items-center py-2 px-4">
          <p className="font-semibold text-lg">Courses List</p>
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
        <div className="flex justify-end items-center mt-2">
          <button
            onClick={() => navigate("/create-new-course/1")}
            className="linearGradient_ver1 text-white text-sm px-[.4rem] py-[.25rem] rounded-full font-medium flex items-center hover:px-[.5rem] hover:py-[.3rem] transition-all"
          >
            <IoIosAdd className="mr-1 text-lg" />
            Create new course
          </button>
        </div>
        <div className="bg-white py-2 px-4 mt-3 rounded-lg">
          {loaded ? (
            <table className="table-auto w-full">
              <thead className="">
                <tr>
                  <th>Course Name</th>
                  <th>Created by</th>
                  <th>Created at</th>
                  <th>Complexity</th>
                  <th className="text-end">Options</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course)=> {
                  return(
                      <CourseCard course={course}/>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center">
              <SpinnerLoader/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({course}) => {
  const navigate = useNavigate();

  return (
    <tr key={course._id} className="text-sm border-5 border-transparent">
      <td className="">{course.title}</td>
      <td>Hoge hoge</td>
      <td>Feb 20 - 2020</td>
      <td>{course.age}</td>
      <td className=" flex space-x-2 items-center justify-end">
        <div
          onClick={() =>
            navigate(`/course-editor/homePage/${course._id}`)
          }
          className="p-2 hover:bg-blue-200 transition-all bg-blue-100 rounded-full cursor-pointer hover-parent"
        >
          <RiEdit2Fill className="text-md text-blue-700 " />
          <OnHoverExtraHud name={"Edit"} />
        </div>
        <div className="p-2 hover:bg-red-200 transition-all bg-red-100 rounded-full cursor-pointer hover-parent">
          <RiDeleteBin7Fill className="text-md text-red-600 " />
          <OnHoverExtraHud name={"Delete"} />
        </div>
      </td>
    </tr>
  );
};
export default AdminManageCourses;

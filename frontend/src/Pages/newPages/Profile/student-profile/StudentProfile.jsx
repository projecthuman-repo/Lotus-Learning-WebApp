import React from "react";
import GeneralCourseCard from "../../../../components/course-cards/GeneralCourseCard";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import getEnrolledCourses from "../../../../BackendProxy/courseProxy/getEnrolledCourses";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StudentProfile = () => {
  const authUser = useSelector((state) => state.user);

  const [loaded, setLoaded] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const res = await getEnrolledCourses(authUser._id);
      console.log("the id of current user is "+ authUser._id )
      setEnrolledCourses(res.res);
      setLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

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
              className="text-sm focus:outline-none focus:border-b-stone-400 border-b-transparent border-b-[1.5px] pr-2 py-1 font-medium text-stone-600"
            />
            <IoMdSearch />
          </div>
        </div>
      </div>
  
      <div className="max-h-[90vh] overflow-y-auto flex flex-wrap items-start">
        {loaded && enrolledCourses.length > 0 && enrolledCourses.map((item2, i) => (
          <div key={i}>
            
            <GeneralCourseCard 
              item={{ 
                _id: item2.course._id, // Using the actual course ID
                title: item2.course.title, 
                creator: { username: item2.course.creatorName } 
              }} 
            />
          </div>
        ))}
        <GeneralCourseCard/>
        <GeneralCourseCard/>
        <GeneralCourseCard/>
        <GeneralCourseCard/>
        <GeneralCourseCard/>

      </div>
    </>
  );
 
};
export default StudentProfile; 

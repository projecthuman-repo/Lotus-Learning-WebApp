import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LowProfileNavbar from "../../../../components/navbar/LowProfileNavbar";
import GeneralFooter from "../../../../components/footer/GeneralFooter";
import updateCourseDataProxy from "../../../../BackendProxy/courseProxy/updateCourseData";

const CoursePreface = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { courseTitle, courseId, creatorName, dateCreated,courseStarted,item } = location.state;

  const handleStartCourse = () => {
    item.courseStarted = true; 
    updateCourseDataProxy(item);
    navigate(`/course/learn?id=${courseId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <LowProfileNavbar />
      <div className="flex-grow flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to {courseTitle}</h2>
        <p className="mb-2">Created by {creatorName} on {new Date(dateCreated).toDateString()}</p>
        <p className="mb-4">You're about to start an exciting journey!</p>
        <button
          onClick={handleStartCourse}
         className="-mt-4 font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 text-base px-6 py-2 rounded-md transition-transform transform hover:scale-105 hover:from-pink-600 hover:to-orange-600"
        >
         {courseStarted? 'Resume Course' : 'Start Course'}
        </button>
      </div>
      <GeneralFooter />
    </div>
  );
};

export default CoursePreface;

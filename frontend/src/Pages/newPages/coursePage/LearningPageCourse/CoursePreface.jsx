import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LowProfileNavbar from "../../../../components/navbar/LowProfileNavbar";
import GeneralFooter from "../../../../components/footer/GeneralFooter";
import getEnrollmentData from "../../../../BackendProxy/courseProxy/getEnrollmentData";
import updateEnrollment from "../../../../BackendProxy/courseProxy/updateEnrollment";

const CoursePreface = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { courseTitle, courseId, creatorName, dateCreated, userId } = location.state;

  const [enrollment, setEnrollment] = useState(null);
  const [courseStarted, setCourseStarted] = useState(false);

  useEffect(() => {
    console.log(dateCreated);
    const fetchEnrollment = async () => {
      try {
        const { enrollment } = await getEnrollmentData(userId, courseId);
        setEnrollment(enrollment);
        if (enrollment && enrollment.courseStarted) {
          setCourseStarted(enrollment.courseStarted);
        }
      } catch (error) {
        console.error("Error fetching enrollment data:", error);
      }
    };

    fetchEnrollment();
  }, [userId, courseId]);

  const handleStartCourse = async () => {
    if (enrollment) {
      try {
        await updateEnrollment(enrollment._id, {
          courseStarted: true,
        });
        navigate(`/course/learn?id=${courseId}`);
      } catch (error) {
        console.error("Error starting the course:", error);
      }
    }
  };

  // Don't render anything until enrollment data is loaded
  if (!enrollment) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <LowProfileNavbar />
      <div className="flex-grow flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to {courseTitle}</h2>
        <p className="mb-2">
          Created by {creatorName} on {new Date(dateCreated).toDateString()}
        </p>
        <p className="mb-4">You're about to start an exciting journey!</p>

        <button
          onClick={handleStartCourse}
          className="-mt-4 font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 text-base px-6 py-2 rounded-md transition-transform transform hover:scale-105 hover:from-pink-600 hover:to-orange-600"
        >
          {courseStarted ? "Resume Course" : "Start Course"}
        </button>
      </div>
      <GeneralFooter />
    </div>
  );
};

export default CoursePreface;

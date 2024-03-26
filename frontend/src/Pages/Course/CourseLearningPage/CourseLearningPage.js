import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DisplayPdf from "../../../components/DisplayPdf/DisplayPdf";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import NoiseAwareOutlinedIcon from "@mui/icons-material/NoiseAwareOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DisplayVideoClass from "../../../components/DisplayVideoClass/DisplayVideoClass";
import { IoMdClose } from "react-icons/io";
import { GrMenu } from "react-icons/gr";
import { IoArrowForward } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";

// Test Media
import TestPdf from "./testPdf.pdf";
import TestVideo from "./testVideo.mp4";
import TestAudio from "./testAudio.mp3";

import CheckIcon from "@mui/icons-material/Check";
import "./CourseLearningPage.css";
import DisplayAudio from "../../../components/DisplayAudioClass/DisplayAudio";

// Main component for the course learning page
const CourseLearningPage = () => {
  // Sample data for lessons
  const lessons = [
    // Each lesson has an id, title, type, completion status, and description
    {
      id: "00",
      title: "Introduction",
      type: "text",
      completed: true,
      description: "...", // Sample description
    },
    {
      id: "01",
      title: "Lesson",
      type: "video",
      completed: false,
      description: "...", // Sample description
    },
    {
      id: "02",
      title: "Lesson",
      type: "audio",
      completed: false,
      description: "...", // Sample description
    },
    {
      id: "03",
      title: "Lesson",
      type: "game",
      completed: false,
      description: "...", // Sample description
    },
  ];

  // React router hooks for location and navigation
  const location = useLocation();
  const navigate = useNavigate();

  // Refs for scroll container and auto-scrolling div
  const scrollContainerRef = useRef(null);
  const autoScrollDiv = useRef(null);

  // State for extra visibility and current class
  const [sideMenuOn, setsideMenuOn] = useState(true);
  const [currentClass, setCurrentClass] = useState(null);

  // Function to scroll to the auto-scrolling div
  const scrollToDiv = () => {
    autoScrollDiv.current.scrollIntoView({ behavior: "smooth" });
  };

  // Function to fetch course data based on the course ID
  const fetchCourseData = (id) => {
    console.log(id);
    // Connect to the backend => function to fetch course info from the DB
  };

  // Function to check if a given class is the current class
  const checkCurrent = (currentClass, listClass) => {
    if (currentClass && listClass && currentClass.id === listClass.id) {
      return true;
    }
    return false;
  };

  // Function to get the index of the current class
  const getCurrentClass = (lessons) => {
    const studying = true; // Placeholder condition, modify accordingly
    let i = 0;
    while (studying) {
      if (i >= lessons.length) {
        return i;
      }
      if (!lessons[i].completed) {
        return i;
      }
      i++;
    }
  };
  // Function to navigate to the previous class
  const goPrevClass = () => {
    if (!currentClass) {
      return;
    }
    const current = lessons.findIndex((obj) => obj.id === currentClass.id);
    if (current === 0) {
      return;
    } else {
      setCurrentClass(lessons[current - 1]);
    }
  };

  // Function to navigate to the next class
  const goNextClass = () => {
    if (!currentClass) {
      return;
    }
    const current = lessons.findIndex((obj) => obj.id === currentClass.id);
    if (current === lessons.length - 1) {
      return;
    } else {
      setCurrentClass(lessons[current + 1]);
    }
  };

  // Effect hook to fetch course data when the component mounts
  useEffect(() => {
    // Gets the id from the url => /course?id='courseId'
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("id");

    if (courseId) {
      fetchCourseData(courseId);
    } else {
      navigate("/courses");
    }
  }, []);

  // Auto scroll effect hook
  useEffect(() => {
    scrollToDiv();
    setCurrentClass(lessons[getCurrentClass(lessons)]);
  }, []);

  // JSX for the main component
  return (
    <div className="flex relative">
      {/* Sidebar with class list */}
      <div
        ref={autoScrollDiv}
        className={`absolute transition-all z-30 lg:static lg:w-[400px] md:w-[80%] w-[90vw] h-screen border-r bg-white ${
          sideMenuOn ? "left-0" : "left-[-150%]"
        }`}
      >
        {/* Class Title */}
        <div className="h-[45px] w-full  flex items-center justify-center border-b ">
          <p className="text-left w-full py-3 px-3 font-medium text-stone-600 max-w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
            Course Title
          </p>
          <div
            onClick={() => {
              setsideMenuOn(false);
            }}
            className="px-3 text-2xl bg-white lg:hidden block"
          >
            <IoMdClose />
          </div>
        </div>

        {/* Class content */}
        <div className="h-[calc(100vh-45px)] overflow-auto classes-container ">
          {lessons.map((item, i) => {
            return (
              <div key={i + item.title}>
                <LessonDropDown
                  setCurrentClass={setCurrentClass}
                  lesson={item}
                  index={i}
                  current={checkCurrent(currentClass, item)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div
        onClick={() => setsideMenuOn(true)}
        className={`border transition-all fixed lg:hidden block top-5 left-5 z-20 bg-white p-2 rounded-full text-xl ${
          sideMenuOn ? "left-[-150%] " : "left-0"
        }`}
      >
        <GrMenu />
      </div>
      {/* Main content area */}
      <div className="lg:w-[calc(100vw-400px)] w-[100vw]  ">
        {currentClass && <LessonRender lesson={currentClass} />}
        {/* Navigation and class information */}
        <div className="flex items-center justify-between px-4  mx-auto border-b py-3 w-full">
          <p className="font-semibold text-sm md:text-lg text-stone-700 ">Class Name</p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => goPrevClass()}
              className=" font-semibold px-3 py-2  border rounded-md text-stone-800 hover:bg-stone-50"
            >
              <IoArrowBackOutline />
            </button>
            <button
              onClick={() => goNextClass()}
              className=" font-semibold px-3 py-2  border rounded-md text-stone-800 hover:bg-stone-50"
            >
              <IoArrowForward />
            </button>
          </div>
        </div>
        {/* Class description */}
        <div className="px-4 mt-4">
          <p className="font-medium text-stone-700">About this lesson</p>
          <p className="text-xs  text-stone-600 text-justify">
            {currentClass && currentClass.description}
          </p>
        </div>
      </div>
    </div>
  );
};

// Component to render the content of a lesson
const LessonRender = ({ lesson }) => {
  const renderLesson = () => {
    switch (lesson.type) {
      case "text":
        return <DisplayPdf pdf={TestPdf} />;
      case "video":
        return <DisplayVideoClass video={TestVideo} />;
      case "game":
        return <div>GAME (to define)</div>;
      case "audio":
        return <DisplayAudio audio={TestAudio} />;
      default:
        return <div>no results</div>;
    }
  };

  return <>{renderLesson()}</>;
};

// Component to render an individual lesson in the sidebar
const LessonDropDown = ({ lesson, index, current, setCurrentClass }) => {
  const authUser = useSelector((state) => state.user);

  // Function to determine the icon based on lesson type
  const checkTypeIcon = (type) => {
    switch (type) {
      case "text":
        return <InsertDriveFileOutlinedIcon sx={{ fontSize: 19 }} />;
      case "video":
        return <MovieCreationOutlinedIcon sx={{ fontSize: 19 }} />;
      case "game":
        return <ExtensionOutlinedIcon sx={{ fontSize: 19 }} />;
      case "audio":
        return <NoiseAwareOutlinedIcon sx={{ fontSize: 19 }} />;
      default:
        return <InsertDriveFileIcon sx={{ fontSize: 19 }} />;
    }
  };

  return (
    <div
      onClick={() => setCurrentClass(lesson)}
      className={`overflow-hidden hover:bg-stone-50 ${
        current ? "text-blue-400" : ""
      }`}
    >
      <div
        className={`border-b  py-2 px-3  flex justify-between cursor-pointer `}
        style={{ userSelect: "none" }}
      >
        <div className="flex justify-center items-center space-x-2">
          {/* Lesson Type */}
          <div
            className={`text-sm flex justify-center items-center text-center font-medium  ${
              lesson.completed
                ? current
                  ? "text-blue-400"
                  : "line-through text-neutral-400"
                : current
                ? "text-blue-400"
                : "text-stone-600"
            } `}
          >
            {checkTypeIcon(lesson.type)}
          </div>
          {/* Lesson title */}
          <p
            className={`text-sm  text-center font-medium ${
              lesson.completed ? "line-through text-neutral-400" : ""
            }`}
          >
            {lesson.title}
          </p>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <CheckIcon
            sx={{ fontSize: 19 }}
            className={lesson.completed ? "text-stone-500" : "text-stone-200"}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseLearningPage;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import NoiseAwareOutlinedIcon from '@mui/icons-material/NoiseAwareOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import "./CourseSuscriptionPage.css";

const CourseSuscriptionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const fetchCourseData = (id) => {
    console.log(id);
    // Connect to the backend => function to fetch course info from the DB
  };

  const getGraphicWinrate = (completed, classes) => {
    return Math.floor((((completed * 100) / classes) * 220) / 100);
  };

  useEffect(() => {
    // gets the id from the url  =>  /course?id='courseId'
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("id");

    if (courseId) {
      fetchCourseData(courseId);
    } else {
      navigate("/courses");
    }
  }, []);

  const lessions = [
    {
      title: "Introduction",
      type: "text",
      completed: true,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Lesson",
      type: "video",
      completed: true,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Lesson",
      type: "game",
      completed: false,
      description:
        "Lorem et dolore commodo consequat. Duis auteulla pariaturlit anim id est laborum.",
    },
    {
      title: "Lesson",
      type: "audio",
      completed: false,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Lesson",
      type: "video",
      completed: false,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Lesson",
      type: "audio",
      completed: false,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Lesson",
      type: "video",
      completed: false,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  return (
    <div>
      <div className="max-w-[1000px] m-auto py-3">
        {/* Course Tiltle */}
        <div className="flex justify-between items-center px-3 md:px-0">
          <p className="text-xl md:text-3xl font-semibold ">History of Art</p>
          {/* PROGRESS CIRCLE  */}
          <div className="relative cursor-pointer hoverClass">
            <svg
              className="progress-circle w-[60px] h-[60px]"
              viewBox="0 0 100 100"
            >
              <circle
                className="progress-background"
                cx="50"
                cy="50"
                r="35"
              ></circle>
              <circle
                className="progress"
                cx="50"
                cy="50"
                r="35"
                style={{
                  strokeDasharray: `${220 - getGraphicWinrate(30, 100)} 220`,
                }}
              ></circle>
            </svg>
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <MilitaryTechIcon className="text-neutral-400" />
            </div>
            <div className="displayOnHover absolute transition ease-in-out duration-300 transform -translate-x-1/2  left-1/2 bg-neutral-600 text-white w-[80px] rounded-md px-3 py-1 ">
              <p className="text-xs text-center w-full">30/100</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1 mt-3">
          {lessions.map((item, index) => {
            return (
              <div key={index + item.title}>
                <LessionDropDown lession={item} index={index} />
              </div>
            );
          })}
        </div>
        {/* Instructot card */}
        <div className="flex items-end justify-between p-3 mt-2">
          <div className="">
            <p className="text-neutral-800 text-lg font-normal hover:underline cursor-pointer">
              Nil Ojeda
            </p>
            <p className="text-blue-400 text-sm font-semibold ">
              phd in physics
            </p>
            {/* Intructor data */}
            <div className="mt-2 flex items-center justify-center space-x-1">
              <p className="text-neutral-800 text-sm font-normal">
                <GroupIcon className="text-neutral-600" />{" "}
                <span className="mx-1">1080 Students</span>
              </p>
              <p className="text-neutral-800 text-sm font-normal">
                <CategoryIcon className="text-neutral-600" />{" "}
                <span className="mx-1">10 Courses</span>
              </p>
            </div>
          </div>

          <div className="h-[90px] md:h-[120px] w-[90px] md:w-[120px] rounded-full overflow-hidden">
            <img
              className="h-full w-full"
              src="https://pbs.twimg.com/media/DiAZ4U4WsAEBNBd.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const LessionDropDown = ({ lession, index }) => {
  const authUser = useSelector((state) => state.user);

  const [displayLessions, setDisplayLessions] = useState(false);

  const checkTypeIcon = (type) =>{
    switch (type) {
      case 'text':
        return <InsertDriveFileOutlinedIcon/>
      case 'video':
        return <MovieCreationOutlinedIcon/>
      case 'game':
        return <ExtensionOutlinedIcon/>
      case 'audio':
        return <NoiseAwareOutlinedIcon/>
      default:
        return <InsertDriveFileIcon/>
    }
  }

  return (
    <div className="overflow-hidden">
      <div
        onClick={() => {
          setDisplayLessions(!displayLessions);
        }}
        className={`border p-3 rounded-sm flex justify-between cursor-pointer `}
        style={{ userSelect: "none" }}
      >
        <div className="flex justify-center items-center space-x-1">
          <div>
            <KeyboardArrowDownIcon
              style={{
                transform: displayLessions ? "rotate(0deg)" : "rotate(-90deg)",
                transition: "transform 0.2s ease-in-out",
              }}
            />
          </div>
          <p className="mx-3 text-center bg-blue-400 px-2 py-1 text-white min-w-[30px] rounded-md font-semibold">{index + 1}</p>
          <p className="text-base md:text-lg text-center">{lession.title}</p>
        </div>
        <div className="flex space-x-3">
          <div className="text-neutral-400">
            {checkTypeIcon(lession.type)}
          </div>
          <CheckCircleOutlineOutlinedIcon className={`${lession.completed? 'text-green-400': 'text-neutral-400'}`}/>
        </div>
      </div>
      <div
        className={`w-full border-x  bg-stone-50 transition-all duration-50 ease-in-out ${
          displayLessions ? "displayLessions" : "hideLessions"
        }`}
      >
        <div className="p-3 flex sm:flex-row flex-col  items-center justify-start ">
          <div>
            <div className="flex my-2 space-x-2 items-center justify-start text-blue-400 text-sm" >
              {checkTypeIcon(lession.type)}
              <p className="font-ligth">Lesson type {lession.type}</p>
            </div>
            <p className="text-xs ml-3 text-justify">{lession.description}</p>
          </div>
        </div>
        <div className="w-full px-4 flex items-center justify-end">
          {/* Start Lesson */}
          <button className="font-medium rounded-full bg-blue-400 hover:bg-blue-500 px-3 py-1 text-sm text-white my-2 ">
            Start lesson
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseSuscriptionPage;

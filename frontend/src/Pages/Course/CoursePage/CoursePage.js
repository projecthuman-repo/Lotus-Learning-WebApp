import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// MUI
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import HeadsetIcon from "@mui/icons-material/Headset";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';

import "./CoursePage.css";
import { useDispatch, useSelector } from "react-redux";

const CoursePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //redux
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user);

  const fetchCourseData = (id) => {
    console.log(id);
    // Connect to the backend => function to fetch course info from the DB
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

  const pins = [
    {
      name: "math",
    },
    {
      name: "history",
    },
    {
      name: "science",
    },
    {
      name: "biology",
    },
    {
      name: "biology",
    },
  ];
  const lessions = [
    {
      title: "Introduction",
      type: "text",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Lesson",
      type: "video",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Lesson",
      type: "game",
      description:
        "Lorem et dolore commodo consequat. Duis auteulla pariaturlit anim id est laborum.",
    },
    {
      title: "Lesson",
      type: "audio",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  return (
    <div className="pb-10">
      {/* HEADER */}
      <div className="w-full md:py-5 pb-5 relative overflow-hidden ">
        {/* BLURED BACKGROUND */}
        <div className="absolute w-[120%] h-[120%] inset-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 filter-bg">
          <img
            className="h-full w-full object-cover"
            src={
              "https://www.digitaltrends.com/wp-content/uploads/2020/09/dark-souls-iii_20200925131848-scaled.jpg?p=1"
            }
          />
        </div>
        {/* CONTENT */}
        <div className="max-w-[1000px] h-full m-auto flex md:flex-row flex-col">
          {/* IMAGE */}
          <div className="h-[230px] max-w-[500px] md:min-w-[425px] m-auto sm:block hidden">
            <img
              className="h-full w-full object-cover"
              src={
                "https://www.digitaltrends.com/wp-content/uploads/2020/09/dark-souls-iii_20200925131848-scaled.jpg?p=1"
              }
            />
          </div>
          <div></div>
          {/* TITLE - DESC - AUTHOR */}
          <div className="md:ml-4 m-0 px-4 md:px-0 pt-4 md:py-0 md:h-[230px] h-auto flex flex-col md:justify-end justify-center md:my-auto">
            {/* TITLE */}
            <p className="text-white font-semibold text-3xl">Course Title</p>
            {/* CREATED BY */}
            <div className="flex items-center space-x-3 mb-1">
              <p className="text-neutral-400 text-xs my-1">
                Created by:{" "}
                <span className="text-neutral-100 cursor-pointer hover:underline">
                  Lorem Ipsum
                </span>
              </p>
              <div className="flex items-center justify-center ">
                <StarIcon fontSize="small" style={{ color: "#FFB42A" }} />
                <p className="text-xs text-neutral-100 ml-1">4.7</p>
              </div>
            </div>
            {/* DESCRIPTION */}
            <p className="text-neutral-100 font-normal text-xs">
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before final copy is available.
            </p>
          </div>
        </div>
      </div>
      {/* BODY */}
      <div className="max-w-[1000px] m-auto ">
        <div className="flex md:flex-row flex-col justify-between items-center my-2">
          <div className="flex flex-wrap items-center justify-center space-x-2 ">
            {pins.map((items, index) => {
              return (
                <div
                  key={index + items.name}
                  className="text-xs rounded-full border-black font-semibold  border-[1px] sm:px-3 px-2 py-1 cursor-pointer md:my-0 my-1"
                >
                  {items.name}
                </div>
              );
            })}
          </div>
          <button className="font-semibold rounded-full bg-blue-400 hover:bg-blue-500 px-4 py-1 text-sm text-white my-2 md:my-0">
            suscribe
          </button>
        </div>


        {/* LESSIONS */}
        <div className="flex justify-between md:flex-row flex-col-reverse">
          {/* left side */}
          <div className="flex flex-col md:w-[65%] w-[90%]  md:mx-0 mx-auto mt-4">
          <p className="text-2xl font-semibold mb-3 text-neutral-800 ">
          Course Content
        </p>
            {lessions.map((item, index) => {
              return (
                <div key={index + item.title}>
                  <LessionDropDown lession={item} index={index} />
                </div>
              );
            })}
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
                    <GroupIcon className="text-neutral-600"/> <span className="mx-1">1080 Students</span>
                  </p>
                  <p className="text-neutral-800 text-sm font-normal">
                    <CategoryIcon className="text-neutral-600"/> <span className="mx-1">10 Courses</span>
                  </p>
                </div>
              </div>

              <div className="h-[120px] w-[120px] rounded-full overflow-hidden">
                <img
                  className="h-full w-full"
                  src="https://pbs.twimg.com/media/DiAZ4U4WsAEBNBd.jpg"
                />
              </div>
            </div>
          </div>

          {/* Rigth Side */}
          <div className="md:w-[30%] w-[90%]  md:mx-0 mx-auto  p-3 flex flex-col md:items-end items-center space-y-3  text-sm rounded-sm">
            <p className="text-neutral-800 text-xl font-semibold ">
              Course Media
            </p>
            <div className="flex items-center space-x-4">
              <p>5 video classes</p>
              <VideoCameraBackIcon className="text-blue-400" />
            </div>
            <div className="flex items-center space-x-4">
              <p>5 written classes</p>
              <InsertDriveFileIcon className="text-blue-400" />
            </div>
            <div className="flex items-center space-x-4">
              <p>5 interactive games</p>
              <SportsEsportsIcon className="text-blue-400" />
            </div>
            <div className="flex items-center space-x-4">
              <p>5 audio games</p>
              <HeadsetIcon className="text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LessionDropDown = ({ lession, index }) => {
  const authUser = useSelector((state) => state.user);

  const [displayLessions, setDisplayLessions] = useState(false);

  const checkAuth = () => {
    if(authUser){
      return true 
    }
    if(index === 0 ){
      return true
    }
    return false
  }

  return (
    <div className="overflow-hidden">
      <div
        onClick={() => {
          checkAuth() ? setDisplayLessions(!displayLessions) : () => {return}
        }}
        className={`border py-2 px-3 rounded-sm flex justify-between cursor-pointer ${(checkAuth()) ?  '' : 'bg-neutral-200'}`}
        style={{ userSelect: "none" }}
      >
        <div className="flex justify-center items-center space-x-1">
          <p className="mx-4 text-center">{index + 1}</p>
          <p className="text-center">{lession.title}</p>
        </div>
        <div>
          {/* When the user is not loged the message try for free appears */}
          <span className="text-sm  text-green-500 mr-2">
            {(!authUser && index === 0) ? "Try for Free" : ""}
          </span>
          {(checkAuth()) && 
          <KeyboardArrowDownIcon
            style={{
              transform: displayLessions ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.2s ease-in-out",
            }}
          />}

        </div>
      </div>
      <div
        className={`w-full border-x  bg-neutral-100 transition-all duration-50 ease-in-out ${
          displayLessions ? "displayLessions" : "hideLessions"
        }`}
      >
        <div className="p-3 flex sm:flex-row flex-col  items-center justify-center ">
          <img
            className="h-[120px] max-w-[200px] object-cover mb-2"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png"
          />
          <p className="text-xs ml-3 text-justify">{lession.description}</p>
        </div>
        <div className="w-full px-4 flex items-center justify-end">
          {/* Go to Lesson */}
          <button className="font-medium rounded-full bg-blue-400 hover:bg-blue-500 px-3 py-1 text-sm text-white my-2 ">
            Check lesson
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;

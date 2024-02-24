import React, { useEffect, useState } from "react";
import { checkScreen } from "./Navigation";
import { useParams, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";

const CreateEditCourse = () => {
  const navigate = useNavigate();
  const { courseid } = useParams();
  const { secondscreen } = useParams();

  const [isFixed, setIsFixed] = useState(false);
  const [openSibeBar, setOpenSideBar] = useState(false);

  const [creatingCourse, setCreatingCourse] = useState(false);

  // Function to switch screens
  const switchScreen = (switchTo) => {
    navigate("/profile/course-editor/" + switchTo);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !isFixed) {
        setIsFixed(true);
      } else if (window.scrollY === 0 && isFixed) {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFixed]);
  //   useEffect to handle initial screen setup
  useEffect(() => {
    if (!secondscreen) {
      navigate("/profile/course-editor/homePage");
    }
    console.log(courseid);
    // fetch from the url  /profile/course-editor?courseid=ID => courseid
    // if there is a courseid in the url the CreateEditCourse will be to edit an existing course
    // if there is no courseid in the url, CreateEditCourse will be to create a new course

    if (courseid === undefined) {
      //the component will work to create a course from zero
      setCreatingCourse(false);
    } else {
      setCreatingCourse(true);
      // fetch from db the existent course to proceed with the editing
    }
  }, []);
  // this state will work to determine the componen to work as a course editor or creator (True <= creator) (False <= editor)

  return (
    <div className="">
      {/* Sidebar */}
      <div className="flex items-start justify-between mx-auto lg:px-20 px-0">
        <div onClick={() => setOpenSideBar(true)} className={` h-screen bg-white w-10 z-20 relative lg:hidden block`}>
            <div className={`${isFixed ? "fixed top-0" : "absolute"} flex justify-center  mt-2 z-10`}>
                <div className="p-2 bg-white border rounded-full">
                    <SlOptionsVertical className="text-xl"/>
                </div>
            </div>
        </div>
        <div
          style={{ userSelect: "none" }}
          // ""
          id="sideBar"
          className={` ${
            openSibeBar ? "left-0" : "-left-[100%]"
          } z-30 top-10 lg:w-[300px] md:w-[40vw] sm:w-[55vw] w-[75vw] flex flex-col justify-between fixed  lg:min-h-[90vh] min-h-screen py-10 transition-all lg:static  bg-white  border-r lg:border-r-transparent  pl-4`}
        >
          {/* First Impressions Section */}
          <div>
            <div className="">
              <div className="pb-3 flex items-center justify-between">
                <p className="font-semibold text_linearGradient_ver1">
                  First Impressions
                </p>
                <IoClose onClick={() => setOpenSideBar(false)} className="mr-4 opacity-1 lg:opacity-0" />
              </div>
              <div className="text-stone-600 font-light flex flex-col space-y-2">
                <p
                  onClick={() => switchScreen("homePage")}
                  className={`border-l-4 ${
                    secondscreen === "homePage"
                      ? "border-stone-500"
                      : "border-transparent hover:border-stone-300"
                  } pl-2 cursor-pointer`}
                >
                  Course Homepage
                </p>
                <p
                  onClick={() => switchScreen("objectives")}
                  className={`border-l-4 ${
                    secondscreen === "objectives"
                      ? "border-stone-500"
                      : "border-transparent hover:border-stone-300"
                  } pl-2 cursor-pointer`}
                >
                  Objectives
                </p>
              </div>
            </div>
            {/* Course Content Section */}
            <div className="mt-3">
              <div className="pb-3">
                <p className="font-semibold text_linearGradient_ver1">
                  Course Content
                </p>
              </div>
              <div className="text-stone-600 font-light flex flex-col space-y-2">
                <p
                  onClick={() => switchScreen("programme")}
                  className={`border-l-4 ${
                    secondscreen === "programme"
                      ? "border-stone-500"
                      : "border-transparent hover:border-stone-300"
                  } pl-2 cursor-pointer`}
                >
                  Course programme
                </p>
                <p
                  onClick={() => switchScreen("prices")}
                  className={`border-l-4 ${
                    secondscreen === "prices"
                      ? "border-stone-500"
                      : "border-transparent hover:border-stone-300"
                  } pl-2 cursor-pointer`}
                >
                  Prices
                </p>
              </div>
            </div>
          </div>

          {/* Progress and Save Section */}
          <div className="w-[80%] my-3 ">
            <div className="text_linearGradient_ver1 font-semibold flex justify-between ">
              <p className="">Complete</p>
              <p>50%</p>
            </div>
            <div className="w-full h-1 bg-stone-300 rounded-full">
              <div className="w-[50%] h-full linearGradient_ver1 rounded-full"></div>
            </div>
            <div className="mt-4">
              <button className="linearGradient_ver1  min-w-[80%] text-white font-semibold p-1 rounded-sm">
                Save Course
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:w-[calc(100vw-300px)] w-[100vw]  min-h-[100vh]  lg:p-8 p-1">
          <div className="bg-white min-h-[90vh] w-full shadow-md border">
            {checkScreen(secondscreen)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEditCourse;

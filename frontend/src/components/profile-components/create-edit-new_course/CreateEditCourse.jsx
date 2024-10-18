import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { useParams, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import getCourseData from "../../../BackendProxy/courseProxy/getCourseData";
import SpinnerLoader from "../../loaders/SpinnerLoader";
import { RiErrorWarningFill } from "react-icons/ri";
import OnHoverExtraHud from "../../OnHoverExtraHud";
import updateCourseDataProxy from "../../../BackendProxy/courseProxy/updateCourseData";
import GeneralNavbar from "../../navbar/GeneralNavbar";

const CreateEditCourse = () => {
  const navigate = useNavigate();
  const { courseid } = useParams();
  const { secondscreen } = useParams();

  const [isMenuFixed, setIsMenuFixed] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const [clonedCourse, setClonedCourse] = useState(null)
  const [updating, setUpdating] = useState(false)
  const [sendingData,  setSendingData]  = useState(false)

  const switchScreen = (switchTo) => {
    navigate("/course-editor/" + switchTo + "/" + courseid);
  };

  const goToEditCoursePrograme = () => {
    navigate("/course-program/"+courseid)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !isMenuFixed) {
        setIsMenuFixed(true);
      } else if (window.scrollY <= 10 && isMenuFixed) {
        setIsMenuFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuFixed]);

  useEffect(() => {
    if(courseData === clonedCourse){
      setUpdating(false)
    }else{
      if(checkForMissingValues(courseData.lessons)){
        setUpdating(false)
      }
      else{
        setUpdating(true)
      }
    }
  },[courseData])

  const fetchCourseData = async (id) => {
    try {
      const coursedata = await getCourseData(id);
      setLoading(false);
      setCourseData(coursedata.data);
      setClonedCourse(coursedata.data)
    } catch (e) {
      setLoading(false);
      console.log(e);
      // navigate('/')
    }
  };

  useEffect(() => {
    if (!secondscreen) {
      navigate("/course-editor/homePage");
    }
    fetchCourseData(courseid);
  }, []);

  const checkForMissingValues = (arr) => {
    for (const obj of arr) {
      for (const value of Object.values(obj)) {
        if (value === null || value === undefined || value === "") {
          return true;
        }
      }
    }
    return false;
  };

  const discardChanges = () => {
      navigate('/profile/courses')
  }

  const saveChanges = async () => { 
    if (sendingData) return 
    setSendingData(true);
    try {
      await updateCourseDataProxy(courseData);
      setSendingData(false);
    } catch (error) {
      console.error(error);
      setSendingData(false);
    }
    updateCourseDataProxy(courseData)
  }


  return (
    <div className="h-[101vh]">
      <GeneralNavbar/>
      {/* Sidebar */}
      <div className="flex items-start justify-between mx-auto lg:px-20 px-0">
        <div
          onClick={() => setOpenSideBar(true)}
          className={`h-screen bg-white w-10 z-10 relative lg:hidden block`}
        >
          <div
            className={`${
              isMenuFixed ? "fixed top-0 left-0 right-0" : "absolute"
            } flex justify-center mt-2 z-10`}
          >
            <div className="p-2 bg-white border rounded-full">
              <SlOptionsVertical className="text-xl" />
            </div>
          </div>
        </div>
        <div
          style={{ userSelect: "none" }}
          id="sideBar"
          className={`${
            openSideBar ? "left-0" : "-left-[100%]"
          } z-30 top-10  lg:w-[300px] md:w-[40vw] sm:w-[55vw] w-[75vw] flex flex-col justify-between fixed  lg:min-h-[90vh] min-h-screen py-10 transition-all lg:static  bg-white  border-r lg:border-r-transparent  pl-4`}
        >
          {/* First Impressions Section */}
          <div>
            <div className="">
              <div className="pb-3 flex items-center justify-between">
                <p className="font-semibold text_linearGradient_ver1">
                  First Impressions
                </p>
                <IoClose
                  onClick={() => setOpenSideBar(false)}
                  className="mr-4 opacity-1 lg:opacity-0"
                />
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
                  onClick={() => goToEditCoursePrograme()}
                  className={`border-l-4 ${
                    secondscreen === "programme"
                      ? "border-stone-500"
                      : "border-transparent hover:border-stone-300"
                  } pl-2 cursor-pointer flex items-center  ${
                    courseData &&
                    courseData.lessons &&
                    courseData.lessons.length &&
                    checkForMissingValues(courseData.lessons) &&
                    "hover-parent "
                  }`}
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
            <div className="mt-4 flex flex-col space-y-2">
              <button
              onClick={() => discardChanges()}
              className="min-w-[80%] text-stone-600 border hover:bg-stone-50 font-medium p-1 rounded-sm">
                Discard changes
              </button>
              <button
              onClick={() => !sendingData && saveChanges()}
              className={`min-w-[80%]  font-semibold p-1 rounded-sm flex items-center justify-center ${sendingData? 'border rounded-md text-stone-400' : updating ? 'linearGradient_ver1 text-white' : 'border rounded-md text-stone-400'}`}>
                {sendingData?
                <SpinnerLoader/>
                :
                updating?
                "Save my changes"
                :
                "Waiting for changes"
                }
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:w-[calc(100vw-300px)] w-[100vw]  min-h-[100vh]  lg:p-8 p-1">
          <div className="bg-white min-h-[90vh] w-full shadow-md border">
            {!loading && courseData ? (
              <Navigation
                screen={secondscreen}
                courseData={courseData}
                setCourseData={setCourseData}
              />
            ) : (
              <div className="h-[90vh] w-full flex items-center justify-center">
                <SpinnerLoader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEditCourse;

import React, { useEffect, useState } from "react";
import GeneralNavbar from "../../../components/navbar/GeneralNavbar";
import { IoIosSettings } from "react-icons/io";
import Courses from "../../../components/profile-components/Courses";
import GeneralFooter from "../../../components/footer/GeneralFooter";
import { useNavigate, useParams } from "react-router-dom";
import MyCourses from "../../../components/profile-components/MyCourses";
import Games from "../../../components/profile-components/Games";
import Settings from "../../../components/profile-components/Settings";
import CreateEditCourse from "../../../components/profile-components/create-edit-new_course/CreateEditCourse";

const Profile = () => {
  const { screen } = useParams();
  const navigate = useNavigate();

  const [displayScreen, setDisplayScreen] = useState("");




  const changeScreen = (value) => {
    switch (value) {
      case "courses":
        return <Courses />;
      case "my-courses":
        return <MyCourses />;
      case "games":
        return <Games />;
      case "profile-settings":
        return <Settings />;
      default:
        return <Courses />;
    }
  };
  const checkScreen = (value) => {
    if (value === screen) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!screen) {
      navigate("/profile/courses");
    } else {
      setDisplayScreen(screen);
    }
    if (document.documentElement.scrollTop) {
      document.documentElement.scrollTop = 0;
    } else {
      document.body.scrollTop = 0;
    }
  }, [screen]);

  return (
    <div className="h-full w-full">
      <GeneralNavbar />
      {screen === "profile-settings" || screen === "course-editor" ? (
        <>
          {screen === "profile-settings" && <Settings />}
          {screen === "course-editor" && <CreateEditCourse />}
        </>
      ) : (
        <>
          <div className="flex items-center mx-auto  max-w-[1400px] my-3">
            <div className="flex items-center space-x-3 px-2 md:px-0">
              <div className="md:h-[150px] md:w-[150px] sm:h-[100px] sm:w-[100px] h-[75px] w-[75px] bg-black rounded-full flex items-center justify-center">
                <p className="text-white md:text-5xl text-2xl font-bold">PP</p>
              </div>
              <div className="flex flex-col">
                <p className="text-stone-700 font-semibold md:text-2xl text-xl flex items-center ">
                  Username{" "}
                  <IoIosSettings
                    onClick={() => navigate("/profile/profile-settings")}
                    className="mx-2 cursor-pointer"
                  />
                </p>
                <p className="text-stone-600 md:text-base text-xs font-ligth ">
                  Username@gmail.com
                </p>
              </div>
            </div>
          </div>
          <div className="w-full  mt-3 border-b no-select">
            <div className="max-w-[1400px] flex items-center mx-auto space-x-5">
              <div
                onClick={() => navigate("/profile/courses")}
                className={`border-b-2  cursor-pointer px-2 ${
                  checkScreen("courses")
                    ? "border-red-300 text_linearGradient_ver1"
                    : "border-stone-400 text-stone-400"
                }`}
              >
                <p className="font-semibold text-sm md:text-base">Courses</p>
              </div>
              <div
                onClick={() => navigate("/profile/my-courses")}
                className={`border-b-2  cursor-pointer px-2 ${
                  checkScreen("my-courses")
                    ? "border-red-300 text_linearGradient_ver1"
                    : "border-stone-400 text-stone-400"
                }`}
              >
                <p className="font-semibold text-sm md:text-base">My Courses</p>
              </div>
              <div
                onClick={() => navigate("/profile/games")}
                className={`border-b-2  cursor-pointer px-2 ${
                  checkScreen("games")
                    ? "border-red-300 text_linearGradient_ver1"
                    : "border-stone-400 text-stone-400"
                }`}
              >
                <p className="font-semibold text-sm md:text-base">Games</p>
              </div>
            </div>
          </div>
          <div className="max-w-[1400px] flex items-center mx-auto pt-2">
            {changeScreen(screen)}
          </div>
        </>
      )}

      <GeneralFooter />
    </div>
  );
};

export default Profile;

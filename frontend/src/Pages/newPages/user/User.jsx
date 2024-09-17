import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import logoText from "../../../Images/lotusletters.webp";

import { IoMdBookmarks, IoMdNotifications } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
import { MdAccountTree, MdAdminPanelSettings } from "react-icons/md";

import { noPfpGenerator } from "../../../components/navbar/GeneralNavbar";
import deleteUserOnCookies from "../../../BackendProxy/cookiesProxy/deleteUserCookies";
import BlobComposition from "../../../components/backgrounds/BlobComposition/BlobComposition";
import TeacherProfile from "../Profile/teacher-profile/TeacherProfile";
import NotificationsProfile from "../Profile/NotificationsProfile";
import SettingsProfile from "../Profile/SettingsProfile";
import StudentProfile from "../Profile/student-profile/StudentProfile";

const User = () => {
  const { screen } = useParams();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.user);
  const [educator, setEducator] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!screen) {
      navigate("/user/courses");
    }

    if (authUser.accountType === "admin" || authUser.accountType === "instructor") {
      setEducator(true);
    }
  }, [screen, navigate, authUser.accountType]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const checkScreen = (screen, option) => {
    return screen === option;
  };

  const screenContentCheck = (key) => {
    switch (key) {
      case "courses":
        return educator ? <TeacherProfile /> : <StudentProfile />;
      case "notifications":
        return <NotificationsProfile />;
      case "settings":
        return <SettingsProfile />;
      default:
        return <div>Default Content</div>;
    }
  };

  const logout = async () => {
    deleteUserOnCookies();
    navigate("/registration");
    window.location.reload();
  };

  return (
    <div className="h-full w-full flex">
      <div

        className={`bg-stone-700 w-[350px] h-full border-r flex flex-col items-start justify-between p-4 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >

        <div className="w-full">
          <div
            onClick={() => navigate("/home")}
            className="mt-2 mb-4 flex items-center justify-center cursor-pointer no-select"
          >
            <img className="h-[30px]" src={logoText} alt="Logo" />
          </div>
          <div className="mt-1 mb-3 flex items-center justify-start w-full cursor-default">
            {authUser.profilePic ? (
              <img
                className="rounded-full h-[70px] w-[70px] no-select"

                src={authUser.profilePic}

                alt="Profile"
              />
            ) : (
              <div className="bg-black h-[50px] w-[50px] flex items-center justify-center rounded-full">
                <p className="text-sm font-bold text-white">
                  {noPfpGenerator(authUser.username)}
                </p>
              </div>
            )}
            <div className="ml-2 flex flex-col">
              <p className="font-semibold text-stone-50 w-full break-all">
                {authUser.username}
              </p>
              <p className="text-xs text-stone-50 w-full">{authUser.email}</p>
            </div>
          </div>


          <div className="w-full flex flex-col space-y-3 no-select mt-8">
            <button
              onClick={() => navigate("/user/courses")}
              className={`my-2 flex items-center text-stone-400 font-medium text-left py-1 border-l-2 hover:bg-stone-600 hover:text-stone-200 ${

                checkScreen(screen, "courses")
                  ? "pl-5 bg-stone-600 text-stone-200"
                  : "pl-3 hover:pl-5 hover:border-l-4"
              } transition-all`}
            >
              <IoMdBookmarks className="mr-2" />
              {educator ? "Created Courses" : "My Courses"}
            </button>

            <button
              onClick={() => navigate("/user/notifications")}
              className={`my-2 flex items-center text-stone-400 font-medium text-left py-1 border-l-2 hover:bg-stone-600 hover:text-stone-200 ${

                checkScreen(screen, "notifications")
                  ? "pl-5 bg-stone-600 text-stone-200"
                  : "pl-3 hover:pl-5 hover:border-l-4"
              } transition-all`}
            >
              <IoMdNotifications className="mr-2" />
              Notifications
            </button>
            <button
              onClick={() => navigate("/user/settings")}

              className={`my-2 flex items-center text-stone-400 font-medium text-left py-1 border-l-2 hover:bg-stone-600 hover:text-stone-200 ${

                checkScreen(screen, "settings")
                  ? "pl-5 bg-stone-600 text-stone-200"
                  : "pl-3 hover:pl-5 hover:border-l-4"
              } transition-all`}
            >
              <IoIosSettings className="mr-2" />
              Settings
            </button>

          </div>
        </div>

        <div className="w-full flex flex-col space-y-3 no-select">
            {(authUser.accountType === "admin") &&
             (
               <button
                 onClick={() => navigate("/admin")}
                 className={`my-2 flex  items-center text-white rounded-sm font-medium  text-center border-l-2  text-sm py-2 linearGradient_ver1   transition-all pl-3 hover:pl-5 hover:border-l-4`}
               >
                 <MdAdminPanelSettings className="mr-2" />
                 Admin Institution 
               </button>
             )}
          <div className="w-full flex items-center justify-between">
            <p className="text-xs text-stone-300 cursor-default flex items-center">
              <MdAccountTree className="mr-1" />
              <span>{authUser.accountType}</span>
            </p>
            <button
              onClick={logout}
              className="font-semibold flex items-center text-stone-400 hover:text-stone-200 transition-all"

            >
              <FaPowerOff className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full h-[100vh] ft-0 relative">
        <BlobComposition
          blobsData={[
            { top: "10%", left: "10%", size: "500px" },
            { top: "70%", left: "50%", size: "400px" },
            { top: "-30%", left: "70%", size: "400px" },
          ]}
        />

        <div className="w-[100%] ml-0 px-3">
          {screenContentCheck(screen)}
        </div>
        <button
          onClick={toggleSidebar}
          className="fixed md:hidden top-0 left-0 z-50 bg-gray-800 text-white p-2 rounded-md focus:outline-none"
        >
          {sidebarOpen ? "Close" : "Open"}

        </button>
      </div>
    </div>
  );
};

export default User;
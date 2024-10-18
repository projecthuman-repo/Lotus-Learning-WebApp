import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import deleteUserOnCookies from "../../../BackendProxy/cookiesProxy/deleteUserCookies";

const ProfileDropDown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user);

  const logout = async () => {
    // Clear user data on logout and navigate to registration page
    deleteUserOnCookies();
    navigate('/registration');
    //window.location.reload();
  };

  const noPfpGenerator = (name) => {
    const firstSplit = name.split(' ');
    if (firstSplit.length > 1) {
      const secondSplitA = firstSplit[0].split('');
      const secondSplitB = firstSplit[1].split('');
      return (secondSplitA[0] + secondSplitB[0]).toUpperCase();
    } else {
      const secondSplit = name.split('');
      if (secondSplit.length <= 1) {
        return secondSplit[0].toUpperCase();
      }
      return (secondSplit[0] + secondSplit[1]).toUpperCase();
    }
  };

  // Check if the user is a student (assuming authUser.role determines if it's an admin or student)
  const isStudent = authUser.accountType === "student"; // Adjust according to your role field

  return (
    <>
     
        <div className="w-[300px] border rounded-sm bg-white">
       
          <div
            onClick={isStudent ? () => navigate('/profile/courses') : undefined}
            className="p-2 border-b flex items-center space-x-2 cursor-pointer hover:bg-stone-50"
          >
            <div className="h-[35px] w-[35px] bg-stone-800 rounded-full flex items-center justify-center cursor-pointer no-select overflow-hidden">
              {authUser.profilePic ? (
                <img
                  src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg"
                  alt="profile pic"
                  className="h-full w-full object-cover"
                />
              ) : (
                <p className="text-sm font-bold text-white">
                  {noPfpGenerator(authUser.username)}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm text-stone-800">{authUser.name}</p>
              <p className="text-xs text-stone-500">{authUser.email}</p>
            </div>
          </div>
          <div className="">
            <div className="h-full w-full flex flex-col space-y-2 py-2 ">
              <p
                onClick={() => navigate('/user/courses')}
                className="text-sm cursor-pointer px-2 hover:text-red-300"
              >
                Profile
              </p>
              <p className="text-sm cursor-pointer px-2 hover:text-red-300">Wish List</p>
              <p className="text-sm cursor-pointer px-2 hover:text-red-300">
                Notifications
              </p>
              {/*
              <p  onClick={() => navigate('/user/courses')}
              className="text-sm cursor-pointer px-2 hover:text-red-300 border-b pb-2">
                My Courses
              </p>
              */}
              <p className="text-sm cursor-pointer px-2 hover:text-red-300">Help</p>
              <p
                onClick={logout}
                className="text-sm cursor-pointer px-2 text-red-500 hover:text-red-400"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default ProfileDropDown;

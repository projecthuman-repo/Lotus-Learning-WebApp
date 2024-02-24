import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileDropDown = () => {

  const navigate = useNavigate()

  return (
    <div className="w-[300px] border rounded-sm bg-white">
      <div className="p-2 border-b flex items-center space-x-2 cursor-pointer hover:bg-stone-50">
        <div className="h-[35px] w-[35px] bg-stone-800 rounded-full flex items-center justify-center cursor-pointer no-select">
          <p className="text-sm font-bold text-white">PP</p>
        </div>
        <div>
          <p className="text-sm text-stone-800">User Name</p>
          <p className="text-xs text-stone-500">Additional Data</p>
        </div>
      </div>
      <div className="">
        <div className="h-full w-full flex flex-col space-y-2 py-2 ">
        <p onClick={() => navigate('/profile/courses')} className="text-sm cursor-pointer px-2 hover:text-red-300">Profile</p>
        <p className="text-sm cursor-pointer px-2 hover:text-red-300">Wish List</p>
        <p className="text-sm cursor-pointer px-2 hover:text-red-300">Notifications</p>
        <p className="text-sm cursor-pointer px-2 hover:text-red-300 border-b pb-2">My Courses</p>
        <p className="text-sm cursor-pointer px-2 hover:text-red-300">Help</p>
        <p className="text-sm cursor-pointer px-2 text-red-500 hover:text-red-400">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropDown;

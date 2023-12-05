import React from "react";

// MUI ICONS
import StarIcon from "@mui/icons-material/Star";
import EditNoteIcon from '@mui/icons-material/EditNote';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import "./AdminCourseCard.css";
import TruncatedText from "../TruncatedText/TruncatedText";

const AdmninCourseCard = ({item}) => {
  return (
    <div className="w-full flex justify-evenly items-center  cursor-pointer space-x-6 border-t py-3 relative hoverClass hover:bg-[#f8f8f8]">
      <div className=" flex sm:items-center items-start sm:flex-row flex-col-reverse  sm:space-x-5 relative ">
        <div className="absolute z-10 w-full h-full bg-[#f8f8f8] displayOnHover  justify-between flex-col">
            <p className="font-semibold sm:font-normal text-sm sm:text-base hover:underline ">
              {item.title}
            </p>
            <p className="text-xs text-gray-700">
            <TruncatedText text={item.description} />

            </p>

            <div className="space-x-4 flex">
              <div className="relative hoverClass-sm">
                <div className="absolute top-full  left-1/2 transform -translate-x-1/2 displayOnHover-sm">
                  <p className="p-1 rounded-md bg-gray-600 text-white text-xs ">Edit</p>
                </div>
                <EditNoteIcon className="text-gray-400 hover:text-gray-800"/>
              </div>
              <div className="relative hoverClass-sm">
                <div className="absolute top-full  left-1/2 transform -translate-x-1/2 displayOnHover-sm">
                  <p className="p-1 rounded-md bg-gray-600 text-white text-xs ">Analytics</p>
                </div>
                <ShowChartIcon className="text-gray-400 hover:text-gray-800"/>

              </div>
            </div>
        </div>
        {/* Icon */}
        <div className="h-[70px] min-w-[100px]">
          <img
            className="h-full"
            src="https://i9.ytimg.com/vi/zgvGNBPZt1U/mqdefault.jpg?sqp=CLjFo6sG-oaymwEmCMACELQB8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgTChFMA8=&rs=AOn4CLC7hbnFyVzMDkrpM3NHZ4TfrDY-QQ"
          />
        </div>
        {/* title - description */}
        <div className=" cursor-pointer text-start  ">
          <p className="font-semibold sm:font-normal text-sm sm:text-base hover:underline ">
            {item.title}
          </p>
          <p className="hidden md:block text-xs text-gray-600">
            <TruncatedText text={item.description} />
          </p>
        </div>
      </div>

      {/* students  */}
      <div className="w-[10%]  text-center">
        <p className="text-xs text-gray-600">Students</p>
        <p className="sm:text-sm text-xs text-center hover:underline">100000</p>
      </div>
      {/* uploaded  */}
      <div className="w-[10%]  text-start hidden sm:block">
        <p className="text-xs text-gray-600">Uploaded</p>
        <p className="sm:text-sm text-xs hover:underline">10/10/20</p>
      </div>
      {/* userResponse */}
      <div className="w-[10%]  text-start flex flex-col justify-center  items-center">
        <p className="text-xs text-gray-600 hidden md:block">Comments</p>
        <div className=" block md:hidden">
          <ChatBubbleOutlineIcon style={{ color: "#878787" }} />
        </div>
        <p className="sm:text-sm text-xs hover:underline">100</p>
      </div>
      {/* stars */}
      <div className="w-[5%]  text-center hover:underline">
        <StarIcon style={{ color: "#FFDD00" }} />
        <p className="text-xs ">{item.rating}</p>
      </div>
    </div>
  );
};


export default AdmninCourseCard;

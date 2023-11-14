import React, { useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import "./sideDashboard.css";

// Side dashboard for profile section

const SideDashboard = ({ sideDashboardOptions, setCurrentScreen }) => {
  const [opened, setOpened] = useState(true);
  const [highlightedOption, setHighlightedOption] = useState(-1);

  return (
    //need to make bootstrap offcanvas fo r mobile view
    <>
      <div onClick={() => setOpened(!opened)} className="fixed z-20 cursor-pointer c-darkBlue top-5 left-2 md:hidden block ">
          {opened?
          <CloseIcon />
          :
          <MenuIcon/>
        }
          
        </div>
      <div
        className={`
    ${opened ? " left-0" : " -left-full"}
    smooth-transition min-h-[100%] border-r-[0.05rem] border-zinc-300 bg-white md:flex   py-5 px-md-3 px-lg-5 w-[50%] sm:w-[40%] md:w-[25%] md:static fixed z-10`}
      >
  
        <div className="mt-5 bg-white ">
          <p className="fs-20 c-darkBlue fw-500 ">Dashboard</p>
          <div>
            {sideDashboardOptions.map((option, index) => {
              return (
                <div
                  style={{userSelect: 'none'}}
                  className={`flex items-center justify-start rounded-lg py-2 my-3 px-2 cursor-pointer ${
                    highlightedOption === index ? "bg-zinc-300" : ""
                  } `}
                  key={index + option}
                  onClick={() => {
                    setCurrentScreen(option.component);
                    setHighlightedOption(index);
                  }}
                >
                  <div className=" ">{option.icon}</div>
                  <p className="text-xs md:text-sm lg:text-sm xl:text-base c-darkBlue ms-3">
                    {option.title}
                  </p>
                </div>
              );
            })}
          </div>
          <div>
            <div>
              <div className="flex items-center justify-start rounded-lg py-2 my-3 px-2 cursor-pointer">
                  <IoLogOutOutline className="c-blue" size={25} />
                <p className="text-xs md:text-sm lg:text-sm xl:text-base c-darkBlue ms-3">
                  Sign Out
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDashboard;

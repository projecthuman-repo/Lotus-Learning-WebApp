import React, { useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
//PARAMS
import { Link, useParams } from 'react-router-dom';
//STYLES
import "./sideDashboard.css";
// Side dashboard for profile section
//REDUX
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/slice/user/userSlice";

//COOKIES
import { deleteUserCookies } from "../../cookie-handler/cookieHandler";

const SideDashboard = ({ sideDashboardOptions, setCurrentScreen }) => {

  const { screen } = useParams();


  const [opened, setOpened] = useState(true);


  const dispatch = useDispatch();

  
  const LogOut = () =>{
    deleteUserCookies();
    dispatch(clearUser());
    window.location.href = '/';

  }

  return (
    //need to make bootstrap offcanvas fo r mobile view
    <>
      <div onClick={() => setOpened(!opened)} className={`fixed z-20 cursor-pointer c-darkBlue top-5 left-2 md:hidden  w-[40px] h-[40px] bg-white flex items-center justify-center ${!opened&& 'border'}  p-3 rounded-full`}>
          {opened?
          <CloseIcon sx={{color: 'gray'}}/>
          :
          <MenuIcon sx={{color: 'gray'}}/>
        }
          
        </div>
      <div
        className={`
    ${opened ? " left-0" : " -left-full"}
    top-0 smooth-transition min-h-[100%] border-r-[0.05rem] border-zinc-300 bg-white md:flex   py-5 px-md-3 px-lg-5 w-[50%] sm:w-[40%] md:w-[25%] md:static fixed z-10`}
      >
  
        <div className="mt-5 bg-white ">
          <p className="fs-20 c-darkBlue fw-500 ">Dashboard</p>
          <div>
            {sideDashboardOptions.map((option, index) => {
              return (
                <Link
                to={`/profile/${(option.route === undefined)? '': option.route}`}

                  style={{userSelect: 'none'}}
                  className={`flex items-center justify-start rounded-lg py-2 my-3 px-2 cursor-pointer ${
                    screen === option.route ? "bg-zinc-300" : ""
                  } `}
                  key={index + option}
                  onClick={() => {
                    setCurrentScreen(option.component);
                  }}
                >
                  <div className=" ">{option.icon}</div>
                  <p className="text-xs md:text-sm lg:text-sm xl:text-base c-darkBlue ms-3">
                    {option.title}
                  </p>
                </Link>
              );
            })}
          </div>
          <div>
            <div>
              <div 
              onClick={() => LogOut()}
              className="flex items-center justify-start rounded-lg py-2 my-3 px-2 cursor-pointer">
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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WishListDropDown from "./wishList-dropdown/WishListDropDown";
import NotificationsDropDown from "./notifications-dropdown/NotificationsDropDown";
import ProfileDropDown from "./profile-dropdown/ProfileDropDown";
import logo from "../../Images/LotusLogoColour.webp";
import logoText from "../../Images/lotusletters.webp";
import styles from "../../Styles";
import { CiHeart } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { SlMenu } from "react-icons/sl";
import { MdOutlineSearch } from "react-icons/md";
import { CgClose } from "react-icons/cg";

const LearningNavbar = () => {
  const [notificationsDropDown, setNotificationsDropDown] = useState(false);
  const [wishListDropDown, setWishListDropDown] = useState(false);
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const navigate = useNavigate();


  return (
    <div
      className={` w-full h-[4rem] mb-[0.25rem] box-shadow bg-white  z-50`}
    >
      <div
        className={`absolute z-[1111110] ${
          openSideMenu ? "left-0" : "-left-[100%]"
        } h-screen top-0 w-[400px] bg-white border-r transition-all`}
      >
        <div className="w-full h-[50px]  flex items-center justify-end px-4 ">

          <div
            onClick={() => setOpenSideMenu(false)}
            className="p-2 flex items-center justify-center hover:bg-stone-50 rounded-full cursor-pointer  "
          >
            <CgClose className="" />
          </div>
        </div>
        <img
            onClick={() => navigate("/")}
            src={logo}
            alt="logo"
            className="h-full p-[.8rem] cursor-pointer md:hidden block "
          />
      </div>

      <div className="max-w-[1450px] mx-auto h-full flex justify-between items-center relative">
        <div className="flex items-center mx-2">
          <SlMenu
            onClick={() => setOpenSideMenu(true)}
            className="text-xl cursor-pointer"
          />
          <div className="h-[55px] ml-1  sm:ml-3">
            <img
              onClick={() => navigate("/")}
              src={logoText}
              alt="logo"
              className=" p-[.8rem] cursor-pointer md:block hidden h-full"
            />
            <img
              onClick={() => navigate("/")}
              src={logo}
              alt="logo"
              className="h-full p-[.8rem] cursor-pointer md:hidden block"
            />
          </div>
        </div>

        {/* <div
            className={`${styles.simple_text_input} rounded-sm flex justify-between items-center w-[400px]`}
          >
            <input
              placeholder="Search"
              className={`focus:outline-none px-1 w-full`}
            />
            <MdOutlineSearch className="text-xl cursor-pointer" />
          </div> */}

        <div className="flex items-center space-x-3 mx-2">
          <div
            onMouseOver={() => setWishListDropDown(true)}
            onMouseOut={() => setWishListDropDown(false)}
            className="relative md:block hidden"
          >
            <CiHeart className="text-2xl cursor-pointer" />
            {wishListDropDown && (
              <div className="absolute top-[100%] right-0 z-30">
                <WishListDropDown />
              </div>
            )}
          </div>

          <div
            onMouseOver={() => setNotificationsDropDown(true)}
            onMouseOut={() => setNotificationsDropDown(false)}
            className="relative md:block hidden"
          >
            <CiBellOn className="text-2xl cursor-pointer " />
            {notificationsDropDown && (
              <div className="absolute top-[100%] right-0 z-30">
                <NotificationsDropDown />
              </div>
            )}
          </div>
          <div
            onMouseOver={() => setProfileDropDown(true)}
            onMouseOut={() => setProfileDropDown(false)}
            className="relative md:px-2 px-0"
          >
            <div className="h-[35px] w-[35px] bg-stone-800 rounded-full flex items-center justify-center cursor-pointer no-select ">
              <p className="text-sm font-bold text-white">PP</p>
            </div>
            {profileDropDown && (
              <div className="absolute top-[100%] right-0 z-30">
                <ProfileDropDown />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningNavbar;

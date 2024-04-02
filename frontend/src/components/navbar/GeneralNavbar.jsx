import React, { useEffect, useState } from "react";
import logo from "../../Images/LotusLogoColour.webp";
import logoText from "../../Images/lotusletters.webp";
import styles from "../../Styles";
import { MdOutlineSearch } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import NotificationsDropDown from "./notifications-dropdown/NotificationsDropDown";
import WishListDropDown from "./wishList-dropdown/WishListDropDown";
import ProfileDropDown from "./profile-dropdown/ProfileDropDown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const GeneralNavbar = () => {
  const [notificationsDropDown, setNotificationsDropDown] = useState(false);
  const [wishListDropDown, setWishListDropDown] = useState(false);
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false); 

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user);

  useEffect(() => {
    if(authUser){
      setIsLogedIn(true)
    }else{
      setIsLogedIn(false)
    }
  },[authUser])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && !isFixed) {
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


  const noPfpGenerator = (name) => {
    const firstSplit =  name.split(' ');
    if(firstSplit.length > 1){
        const secondSplitA = firstSplit[0].split('')
        const secondSplitB = firstSplit[1].split('')
        return((secondSplitA[0]+secondSplitB[0]).toUpperCase())
    }
    else{
        const secondSplit = name.split('') 
        if(secondSplit.length <= 1){
            return(secondSplit[0].toUpperCase())
        }
        return((secondSplit[0]+secondSplit[1]).toUpperCase())
    }
  }

  return (
    <div className={`w-full h-[4rem] mb-[0.25rem] box-shadow bg-white ${isFixed&& 'fixed top-0'} z-50`}>
      <div className="max-w-[1450px] mx-auto h-full flex justify-between items-center relative">
        <img
          onClick={() => navigate('/')}
          src={logoText}
          alt="logo"
          className="h-full p-[.8rem] cursor-pointer md:block hidden"
        />
        <img 
        onClick={() => navigate('/')}
        src={logo} alt="logo" className="h-full p-[.8rem] cursor-pointer md:hidden block" />

        <div
          className={`${styles.simple_text_input} rounded-sm flex justify-between items-center w-[400px]`}
        >
          <input
            placeholder="Search"
            className={`focus:outline-none px-1 w-full`}
          />
          <MdOutlineSearch className="text-xl cursor-pointer" />
        </div>
        {
          isLogedIn? 
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
            {authUser.profilePic ? 
            <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg" className="h-full w-full object-cover"/>
            :
            <p className="text-sm font-bold text-white">{noPfpGenerator(authUser.name)}</p>
          }
            </div>
            {profileDropDown && (
              <div className="absolute top-[100%] right-0 z-30">
                <ProfileDropDown />
              </div>
            )}
          </div>
        </div>
        :
        <div>
          <div>
            <button onClick={() => navigate('/registration')} className=" font-semibold text-white linearGradient_ver1 text-sm px-3 py-2 rounded-full">SIGN IN</button>
          </div>

        </div>
        }

      </div>
    </div>
  );
};

export const noPfpGenerator = (name) => {
    const firstSplit =  name.split(' ');
    if(firstSplit.length > 1){
        const secondSplitA = firstSplit[0].split('')
        const secondSplitB = firstSplit[1].split('')
        return((secondSplitA[0]+secondSplitB[0]).toUpperCase())
    }
    else{
        const secondSplit = name.split('') 
        if(secondSplit.length <= 1){
            return(secondSplit[0].toUpperCase())
        }
        return((secondSplit[0]+secondSplit[1]).toUpperCase())
    }
}

export default GeneralNavbar;

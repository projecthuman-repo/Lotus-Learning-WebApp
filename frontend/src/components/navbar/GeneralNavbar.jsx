import React, { useEffect, useRef, useState } from "react";
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
import getCoursesByProp from "../../BackendProxy/courseProxy/getCoursesByProp";

const GeneralNavbar = ({ fixed = true }) => {
  const [notificationsDropDown, setNotificationsDropDown] = useState(false);
  const [wishListDropDown, setWishListDropDown] = useState(false);
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchRef = useRef(null); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user);

  const handleSearch = async () => {
    if (isLogedIn && query.trim() !== "" && authUser) { 
      try {
        const res = await getCoursesByProp("accepted", true, authUser.institution.code);
        const filteredResults = res.res.filter(course => 
          course.title.toLowerCase().startsWith(query.toLowerCase())
        );
        setResults(filteredResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setResults([]); 
    }
  };

  useEffect(() => {
    if (authUser) {
      setIsLogedIn(true);
    } else {
      setIsLogedIn(false);
    }
  }, [authUser]);

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isLogedIn && query.trim() !== "") {
      handleSearch();
    } else {
      setResults([]); 
    }
  }, [query, isLogedIn]); 

  return (
    <div
      className={`w-full h-[4rem] box-shadow bg-white ${
        isFixed && fixed && "fixed top-0"
      } z-50`}
    >
      <div className="max-w-[1450px] mx-auto h-full flex justify-between items-center relative">
        <img
          onClick={() => navigate("/home")}
          src={logoText}
          alt="logo"
          className="h-full p-[.8rem] cursor-pointer md:block hidden"
        />
        <img
          onClick={() => navigate("/home")}
          src={logo}
          alt="logo"
          className="h-full p-[.8rem] cursor-pointer md:hidden block"
        />

        <div className="relative w-[440px]" ref={searchRef}>
          <div
            className={`${styles.simple_text_input} rounded-full flex justify-between items-center`}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="focus:outline-none px-1 w-full"
            />
            <MdOutlineSearch className="text-xl cursor-pointer" />
          </div>

          {isLogedIn && results.length > 0 && (
            <div className="absolute top-full mt-1 bg-white shadow-lg rounded-md p-2 w-full z-40">
              <h2 className="text-xl font-semibold">Search Results</h2>
              <ul className="list-disc list-inside">
                {results.map((course) => (
                  <li
                    key={course._id}
                    className="cursor-pointer text-blue-600 hover:underline"
                    onClick={() => navigate('/course/learn?id='+course._id)}
                  >
                    {course.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {isLogedIn ? (
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
              <CiBellOn className="text-2xl cursor-pointer" />
              {notificationsDropDown && (
                <div className="absolute top-[100%] right-0 z-30">
                  <NotificationsDropDown />
                </div>
              )}
            </div>
            <div
              onMouseOver={() => setProfileDropDown(true)}
              onMouseOut={() => setProfileDropDown(false)}
              className="relative md:px-2"
            >
              <div className="h-[35px] w-[35px] bg-stone-800 rounded-full flex items-center justify-center cursor-pointer no-select">
                {authUser.profilePic ? (
                  <img
                    src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg" alt="profile pic"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <p className="text-sm font-bold text-white">
                    {noPfpGenerator(authUser.username)}
                  </p>
                )}
              </div>
              {profileDropDown && (
                <div className="absolute top-[100%] right-0 z-30">
                  <ProfileDropDown />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', marginRight: '16px' }}>
              <button
                onClick={() => navigate("/registration?screen=signup")}
                className="font-semibold text-white linearGradient_ver1 text-sm px-3 py-2 rounded mr-2"
              >
                Create an account
              </button>
              <button
                onClick={() => navigate("/registration?screen=login")}
                className="font-semibold text-white linearGradient_ver1 text-sm px-3 py- rounded"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const noPfpGenerator = (name) => {
  const firstSplit = name.split(" ");
  if (firstSplit.length > 1) {
    const secondSplitA = firstSplit[0].split("");
    const secondSplitB = firstSplit[1].split("");
    return (secondSplitA[0] + secondSplitB[0]).toUpperCase();
  } else {
    const secondSplit = name.split("");
    if (secondSplit.length <= 1) {
      return secondSplit[0].toUpperCase();
    }
    return (secondSplit[0] + secondSplit[1]).toUpperCase();
  }
};

export default GeneralNavbar;

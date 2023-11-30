import React, { useEffect, useState } from "react";
import { Link, Redirect, Navigate  } from "react-router-dom";

import BLNLogo from "../../Images/BLN_Logo.png";
import { useAuth } from "../../context/auth-context";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slice/user/userSlice";

// MUI ICONS
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
//CSS
import "./Navbar.css";
import { deleteUserCookies } from "../../cookie-handler/cookieHandler";


const Navbar = () => {
  //REDUX
  const authUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { token, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);




  useEffect(() => {
    const handleClickOutside = (event) => {
      const container = document.getElementById("mobileDropDown"); // Asegúrate de tener un id en tu contenedor

      if (container && !container.contains(event.target)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  const LogOut = () =>{
    deleteUserCookies();
    dispatch(clearUser());
    window.location.href = '/';

  }


  return (
    <nav className="h-[50px] md:h-[70px] w-full bgc-lightGray flex items-center justify-between px-3 boxShadow">
      <Link to={"/"} className="h-full hover:text-zinc-700">
        <div
          style={{ userSelect: "none" }}
          className="h-full flex items-center justify-center cursor-pointer"
        >
          <img
            src={BLNLogo}
            alt="logo"
            className="md:h-[70%] h-[60%] w-auto mr-3"
          />
          <p className="font-semibold text-sm md:text-lg ">
            Black Lily Nursery
          </p>
        </div>
      </Link>

      {
      // auth token storaged in the redux
      authUser
      // token <== Old auth token handled by "../../context/auth-context"
      ? (
        <>
          {/* Desktop Display */}
          <div
            style={{ userSelect: "none" }}
            className="md:flex hidden item-center space-x-3 font-normal text-xs md:text-sm h-full"
          >
            <Link to={"/courses"}>
              <p className="cursor-pointer flex items-center justify-center h-full hover:text-zinc-500">
                COURSES
              </p>
            </Link>
            <Link to={"/games"}>
              <p className="cursor-pointer flex items-center justify-center h-full hover:text-zinc-500">
                GAMES
              </p>
            </Link>
            <Link to={"/contact"}>
              <p className="cursor-pointer flex items-center justify-center h-full hover:text-zinc-500">
                CONTACT
              </p>
            </Link>
            {/* Notifications dropdown */}
            <div className="hoveredNavbarContainer relative flex items-center justify-center hover:text-zinc-600 w-[40px] cursor-pointer">
              <NotificationsIcon className="cursor-pointer " />
              <div className="shadow-md hoveredDisplayItem absolute h-[300px] z-30 rounded-md border-1 overflow-hidden  w-[300px] bg-white right-0 transition-all ease duration-300">
                <div className="w-full border-b p-2 ">
                  <p>Notificatons</p>
                </div>
                <div className="overflow-auto max-h-[260px] min-h-[200px]">
                  <TestNotificationComponent
                    title={"notification Test"}
                    desc={"this is a test desc"}
                  />
                  <TestNotificationComponent
                    title={"notification Test"}
                    desc={"this is a test desc"}
                  />
                </div>
              </div>
            </div>
            {/* Profile dropdown */}
            <div className="hoveredNavbarContainer relative flex items-center justify-center hover:text-zinc-600 w-[40px] cursor-pointer">
              <AccountCircleIcon className="cursor-pointer " />
              <div className="shadow-md hoveredDisplayItem absolute h-[300px] w-[285px] z-30 rounded-md border-1 overflow-hidden   bg-white right-0 transition-all ease duration-300">
                <Link to={"/profile"}>
                  <div className="h-[85px] border-b px-2 py-4 flex items-center justify-start hover:text-zinc-700">
                    <img
                      src=""
                      alt="profile-pic"
                      className="rounded-full bg-black w-[60px] h-[60px]"
                    />
                    <div className="ml-2 flex flex-col">
                      <p className="text-md font-semibold">{authUser.name}</p>
                      <p className="text-xs">{authUser.email}</p>
                    </div>
                  </div>
                </Link>

                <div className="border-b px-4 py-3 space-y-2 flex items-start justify-center flex-col">
                  <Link to={"/profile"}>
                    <p className="hover:text-zinc-400 w-full">Profile</p>
                  </Link>
                  <Link to={"/courses"}>
                    <p className="hover:text-zinc-400 w-full">Courses</p>
                  </Link>
                  <Link to={"/games"}>
                    <p className="hover:text-zinc-400 w-full">Games</p>
                  </Link>
                  <Link to={"/notifications"}>
                    <p className="hover:text-zinc-400 w-full">Notifications</p>
                  </Link>
                </div>
                <div className="border-b px-4 py-3 space-y-2 flex items-start justify-center flex-col">
                  <p className="hover:text-zinc-400 w-full">Help</p>
                  {/* LOGOUT                                                                                                                LOGOUT */}
                  <p 
                  onClick={() => LogOut()}
                  className="hover:text-red-400 w-full">Log Out</p>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Display */}
          <div className="block h-full md:hidden relative" id="mobileDropDown">
            <div
              onClick={() => setMobileOpen(!mobileOpen)}
              className="h-full flex items-center justify-center w-[60px] hover:bg-zinc-200  transition-all ease duration-200"
            >
              <MenuIcon />
            </div>
            <div
              className={`absolute  sm:w-[250px] w-auto bg-white border-1 rounded-sm ${
                mobileOpen
                  ? "top-[110%] opacity-100 "
                  : "bottom-[100%] opacity-0"
              } right-0  z-40 transition-all ease duration-100`}
            >
              <Link to={"/profile"}>
                <div className="h-[85px] border-b px-2 py-4 flex items-center justify-start hover:text-zinc-700">
                  <img
                    src=""
                    alt="profile-pic"
                    className="rounded-full bg-black w-[60px] h-[60px]"
                  />
                  <div className="ml-2 flex flex-col">
                    <p className="text-sm font-semibold">{authUser.name}</p>
                    <p className="text-xs">{authUser.email}</p>
                  </div>
                </div>
              </Link>
              <div className="border-b px-4 py-3 space-y-2 flex items-start justify-center flex-col sm:text-sm text-xs">
                <Link to={"/profile"}>
                  <p className="hover:text-zinc-400 w-full">Profile</p>
                </Link>
                <Link to={"/courses"}>
                  <p className="hover:text-zinc-400 w-full">Courses</p>
                </Link>
                <Link to={"/games"}>
                  <p className="hover:text-zinc-400 w-full">Games</p>
                </Link>
                <Link to={"/notifications"}>
                  <p className="hover:text-zinc-400 w-full">Notifications</p>
                </Link>
              </div>
              <div className="border-b px-4 py-3 space-y-2 flex items-start justify-center flex-col sm:text-sm text-xs">
                <Link>
                  <p className="hover:text-zinc-400 w-full">Help</p>
                </Link>
                <Link onClick={() => LogOut()} >
                  <p className="hover:text-red-400 w-full">Log Out</p>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (

        // NO TOKEN AVAILABLE 
        <div className="h-full space-x-3 flex items-center justify-center font-semibold ">
          <Link to={'/'}>
            <button className="md:w-[100px] w-[60px] px-1 py-2 md:text-sm text-xs bg-[#ffffff] hover:bg-[#eeeeee]   border-1 border-transparent text-zinc-500  hover:text-black rounded-sm">Log in</button>
          </Link>
          <Link to={'/signup'}>
            <button className="md:w-[100px] w-[60px] px-1 py-2 md:text-sm text-xs bg-[#ffffff00] hover:bg-[#7676763d] text-white hover:text-white  border-1 border-white rounded-sm">Sign up</button>
          </Link>

        </div>
      )}
    </nav>
    // <nav className="navbar navbar-expand-lg navbar-light bgc-lightGray">
    // 	<div className="container mt-4">
    // 		<Link className="navbar-brand mx-auto ms-sm-5">
    // 			<div className="d-flex ">
    // 				<img src={BLNLogo} width={45} alt="logo" />
    // 				<p className="my-auto ms-2 fs-30 fw-500">
    // 					Black Lily Nursery
    // 				</p>
    // 			</div>
    // 		</Link>
    // 		<div className="d-flex mx-auto mx-sm-0 me-sm-5">
    // 			<button
    // 				className="navbar-toggler "
    // 				type="button"
    // 				data-bs-toggle="collapse"
    // 				data-bs-target="#navbarSupportedContent"
    // 				aria-controls="navbarSupportedContent"
    // 				aria-expanded="false"
    // 				aria-label="Toggle navigation"
    // 			>
    // 				<span className="navbar-toggler-icon "></span>
    // 			</button>
    // 		</div>
    // 		<div
    // 			className="collapse navbar-collapse"
    // 			id="navbarSupportedContent"
    // 		>
    // 			<ul className="navbar-nav text-center mx-auto ms-lg-auto me-lg-5 mb-2 mb-lg-0">
    // 				<li className="nav-item mx-3">
    // 					<Link className="nav-link" to={"/courses"}>
    // 						<p className="fs-20 c-black">COURSES </p>
    // 					</Link>
    // 				</li>
    // 				<li className="nav-item mx-3">
    // 					<Link className="nav-link" to={"/games"}>
    // 						<p className="fs-20 c-black">GAMES</p>
    // 					</Link>
    // 				</li>
    // 				<li className="nav-item mx-3">
    // 					<Link className="nav-link" to={"/contact"}>
    // 						<p className="fs-20 c-black">CONTACT</p>
    // 					</Link>
    // 				</li>
    // 				<li className="nav-item mx-3">
    // 					<Link className="nav-link">
    // 						<VscBellDot size={30} color="black" />
    // 					</Link>
    // 				</li>
    // 				<li className="nav-item mx-3">
    // 					<Link className="nav-link" to={"/profile"}>
    // 						<FaUserCircle size={30} color="black" />
    // 					</Link>
    // 				</li>
    // 				<li className="nav-item mx-3 my-auto">
    // 					<Link
    // 						className="nav-link"
    // 						to={"/"}
    // 						onClick={logout}
    // 					>
    // 						<p className="fs-20 c-black">LOGOUT</p>
    // 					</Link>
    // 				</li>
    // 			</ul>
    // 		</div>
    // 	</div>
    // </nav>
  );
};

const TestNotificationComponent = ({ title, desc }) => {
  return (
    <div className="w-full  border-b p-3 hover:bg-zinc-100">
      <p className="text-sm font-normal">{title}</p>
      <p className="text-xs font-light">
        <TruncatedText text={desc} />
      </p>
    </div>
  );
};

const TruncatedText = ({ text, maxWords = 5 }) => {
  const words = text.split(" ");
  if (words.length > maxWords) {
    const truncatedText = words.slice(0, maxWords).join(" ") + "...";

    return <p>{truncatedText}</p>;
  }
  return <p>{text}</p>;
};

export default Navbar;

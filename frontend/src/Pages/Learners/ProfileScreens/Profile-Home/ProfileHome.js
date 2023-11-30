import React from "react";
// import PhotoPlaceholder from '../../../../../../backend/uploads/';
import "./profileHome.css";
import CourseInProgress from "../CourseInProgress";
import RcmdCourseCard from "../../../../components/RcmdCouseCard/RcmdCourseCard";
import TestImg from "../../../../Images/Game_Image.jpg";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { BsPinAngle } from "react-icons/bs";
import { useSelector } from "react-redux";

const ProfileHome = ({ courses }) => {
  // const daysOfWeek = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];

  const badges = ["Coding HTML", "Algebra III", "Algebra I"];
  const authUser = useSelector((state) => state.user); 

  // const user = JSON.parse(window.sessionStorage.getItem("user")); 

  // Delete this
  const user = {
    name: "John",
    profilePic:
      "https://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg",
    accountType: "Learner",
  };

  console.log(user);

  return (
    <div className="px-md-4">
      <div className="flex flex-col justify-center items-center lg:flex-row  my-5">
        <div className="w-[200px]  flex items-center justify-center relative">
          <img
            // src={`/uploads/${user.profilePic}`} 
            src={user.profilePic}
            className="rounded-full w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] object-cover ml-5 shadow-md"
            alt="ProfilePic"
          />
          <div className="bg-zinc-400 hover:bg-zinc-500 p-2 absolute  rounded-full md:-right-3 right-2 bottom-4 cursor-pointer">
            <AddIcon className="text-zinc-100" />
          </div>
        </div>
        <div className="w-[70%] h-[200px] flex  flex-col items-center lg:items-center justify-center ml-0 lg:ml-5">
          <div className="flex w-[70%] flex-col lg:items-start items-center">
            <p className="font-bold text-2xl">{authUser.name}</p>
            <p className="">{authUser.accountType}</p>
          </div>

          <textarea
            className="form-control mt-2 w-[100%] lg:w-[70%]"
            rows={4}
            placeholder="Description Here"
          />
        </div>
      </div>
      {/* week days (old design) */}
      {/* <div className="row my-4">
        <div className="col-sm-12">
          <div className="d-sm-flex">
            {daysOfWeek.map((day, index) => {
              return <DayTag day={day} key={index + day} />;
            })}
          </div>
        </div>
      </div> */}
      {/* in progress courses (old design) */}

      <hr className="profileHomeHR" />
      <div className="row">
        <div className="col-12">
          <p className="fs-22 fw-600 my-2">In Progress</p>
          <div className="d-sm-flex mt-3">
            {courses.map((course, index) => {
              return (
                <CourseInProgress
                  className="mx-1"
                  course={course}
                  key={index + course}
                />
              );
            })}
          </div>
        {/* LOAD MORE */}
          <div className="d-flex mt-3">
            <p className="c-gray ms-auto cursor-pointer hover:text-blue-700">Load more...</p>
          </div>
        </div>
      </div>
      <hr className="profileHomeHR" />
      <div className="py-3">
        <p className="fs-20 fw-600 my-2">COURSES (Recommendations)</p>
        <div className="flex flex-wrap ">
          <RcmdCourseCard
            img={TestImg}
            courseName={'testName'}
            text={"test text test text text text text "}
            creator={'creator'}
            pins={["pinA", "pinB", "pinC", "pinD"]}

          />
          <RcmdCourseCard
            img={TestImg}
            courseName={'testName'}
            text={"test text test text text text text "}
            creator={'creator'}
            pins={["pinA", "pinB", "pinC", "pinD"]}
          />
          <RcmdCourseCard
            img={TestImg}
            courseName={'testName'}
            text={"test text test text text text text "}
            creator={'creator'}
            pins={["pinA", "pinB", "pinC", "pinD"]}
          />
          <RcmdCourseCard
            img={TestImg}
            courseName={'testName'}
            text={"test text test text text text text "}
            creator={'creator'}
            pins={["pinA", "pinB", "pinC", "pinD"]}
          />
        </div>
        {/* LOAD MORE */}
        <div className="d-flex mt-3">
            <Link to={"/courses"} className="c-gray ms-auto cursor-pointer hover:text-blue-700">Load more...</Link>
          </div>
      </div>

      {/* ACCOMPLISHMENTS (old design)  */}
      {/* <hr className="profileHomeHR" />
      <div className="row">
        <p className="fs-22 fw-600">Accomplishments</p>
        <div className="d-sm-flex text-center mt-3">
          {badges.map((badge, index) => {
            return (
              <div key={index + badge} className="me-5">
                <img src={badgePlaceHolder} className="accBadge" alt="badge" />
                <p className="text-center">{badge}</p>
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};

const DayTag = ({ day }) => {
  return (
    <div className="rounded bgc-lightLightGray p-2 px-3 mx-auto my-1 pointer">
      <p className="text-center">{day}</p>
    </div>
  );
};

export default ProfileHome;

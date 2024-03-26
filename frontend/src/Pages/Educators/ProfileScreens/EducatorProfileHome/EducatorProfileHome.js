import React from "react";
import PhotoPlaceholder from "../../../../Images/photo.png";

//redux
import { useSelector } from "react-redux";

const EducatorProfileHome = ({ courses }) => {
  const badges = ["Coding HTML", "Algebra III", "Algebra I"];

  // const user = JSON.parse(window.sessionStorage.getItem("user"));
  const authUser = useSelector((state) => state.user); 

  // Delete this
  const user = {
    name: "John",
    profilePic:
      "https://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg",
    accountType: "Learner",
  };

  return (
    <div className="px-3">
      <div className=" my-4">
        <div className="flex md:flex-row flex-col md:items-end items-center justify-center">
          <img
            src={PhotoPlaceholder}
            alt="ProfilePic"
            className="md:h-[200px] md:w-[200px] h-[120px] w-[120px]"
          />
          <div className="md:ml-4 md:mb-3">
            <p className="fs-22 fw-600">{authUser.name}</p>
            <p className="fs-16">{authUser.accountType}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-4">
          <textarea
            className="form-control mt-3 md:w-[500px] sm:w-[80%] w-[95%]"
            rows={4}
            placeholder="Description Here"
          />
        </div>
      </div>
      <hr className="border-zinc-700 my-3" />

      <div className="mb-5">
        <p className="md:text-xl text-lg fw-600 mb-3">Experience</p>
        <div className="lg:space-y-0 space-y-3 flex lg:flex-row items-center flex-col justify-evenly my-4">
          <div className="space-y-3 lg:w-[45%] md:w-[70%] w-full">
            <div className="flex flex-col items-start justify-between ">
              <p className="mr-1 text-sm ">Title:</p>
              <input
                className="form-control form-control-sm "
                id="title"
                type="text"
              />
            </div>
            <div className="flex flex-col items-start justify-between ">
              <p className="mr-1 text-sm  ">Company Name:</p>
              <input
                className="form-control form-control-sm "
                id="title"
                type="text"
              />
            </div>
            <div className="flex flex-col items-start justify-between ">
              <p className="mr-1 text-sm  ">City:</p>
              <input
                className="form-control form-control-sm "
                id="title"
                type="text"
              />
            </div>
          </div>

          <div className="space-y-3 lg:w-[45%] md:w-[70%] w-full">
            <div className="flex flex-col items-start justify-between">
              <p className="mr-1 text-sm  ">From (Month/Year):</p>
              <input
                className="form-control form-control-sm "
                id="title"
                type="text"
              />
            </div>
			<div className="flex flex-col items-start justify-between ">
              <p className="mr-1 text-sm  ">To (Month/Year):</p>
              <input
                className="form-control form-control-sm "
                id="title"
                type="text"
              />
            </div>
			<div className="flex flex-col items-start justify-between ">
              <p className="mr-1 text-sm  ">Country:</p>
              <input
                className="form-control form-control-sm "
                id="title"
                type="text"
              />
            </div>
          </div>
        </div>
        <p className="fs-16 mt-2">Highlights and Accomplishments:</p>
        <textarea className="form-control mt-3" rows={4} />
      </div>

      <hr className="profileHomeHR" />

      <hr className="profileHomeHR" />
    </div>
  );
};

export default EducatorProfileHome;

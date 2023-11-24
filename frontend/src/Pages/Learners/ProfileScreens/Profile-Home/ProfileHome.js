import React from "react";
// import PhotoPlaceholder from '../../../../../../backend/uploads/';
import "./profileHome.css";
import CourseInProgress from "../CourseInProgress";
import RcmdCourseCard from "../../../../components/RcmdCouseCard/RcmdCourseCard";
import TestImg from "../../../../Images/Game_Image.jpg";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const ProfileHome = ({ courses }) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const badges = ["Coding HTML", "Algebra III", "Algebra I"];

  const user = JSON.parse(window.sessionStorage.getItem("user")); 

	return (
		<div className="px-md-4">
			<div className="row my-5">
				<div className="col-md-4">
					<p className="fs-22 fw-600">Profile (Public)</p>
					<img
						src={`/uploads/${user?.profilePic}`}
						alt="ProfilePic"
						width={200}
						height={200}
					/>
				</div>
				<div className="col-md-8 mt-3 mt-sm-5">
					<p className="fs-22 fw-600">{user?.name}</p>
					<p className="fs-16">{user?.accountType}</p>
					<textarea
						className="form-control mt-3"
						rows={4}
						placeholder="Description Here"
					/>
				</div>
			</div>
			<hr className="profileHomeHR" />
			<div className="row my-4">
				<div className="col-sm-12">
					<div className="d-sm-flex">
						{daysOfWeek.map((day, index) => {
							return <DayTag day={day} key={index + day} />;
						})}
					</div>
				</div>
			</div>
			<hr className="profileHomeHR" />
			<div className="row">
				<div className="col-12">
					<p className="fs-22 fw-600">In Progress</p>
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
					<div className="d-flex mt-3">
						<p className="c-gray ms-auto">Load more...</p>
					</div>
				</div>
			</div>
			<hr className="profileHomeHR" />
			<div className="row">
				<p className="fs-22 fw-600">Accomplishments</p>
				<div className="d-sm-flex text-center mt-3">
					{badges.map((badge, index) => {
						return (
							<div key={index + badge} className="me-5">
								<img
									src={""}
									className="accBadge"
									alt="badge"
								/>
								<p className="text-center">{badge}</p>
							</div>
						);
					})}
				</div>
			</div>
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

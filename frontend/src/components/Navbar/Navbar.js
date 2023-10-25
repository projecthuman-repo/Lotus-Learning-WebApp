import React from "react";
import { Link } from "react-router-dom";
import { VscBellDot } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";
import BLNLogo from "../../Images/BLN_Logo.png";
import { useAuth } from "../../context/auth-context";

const Navbar = () => {
	const { token, logout } = useAuth();

	if (token) {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bgc-lightGray">
				<div className="container mt-4">
					<Link className="navbar-brand mx-auto ms-sm-5">
						<div className="d-flex ">
							<img src={BLNLogo} width={45} alt="logo" />
							<p className="my-auto ms-2 fs-30 fw-500">
								Black Lily Nursery
							</p>
						</div>
					</Link>
					<div className="d-flex mx-auto mx-sm-0 me-sm-5">
						<button
							className="navbar-toggler "
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon "></span>
						</button>
					</div>
					<div
						className="collapse navbar-collapse"
						id="navbarSupportedContent"
					>
						<ul className="navbar-nav text-center mx-auto ms-lg-auto me-lg-5 mb-2 mb-lg-0">
							<li className="nav-item mx-3">
								<Link className="nav-link" to={"/courses"}>
									<p className="fs-20 c-black">COURSES </p>
								</Link>
							</li>
							<li className="nav-item mx-3">
								<Link className="nav-link" to={"/games"}>
									<p className="fs-20 c-black">GAMES</p>
								</Link>
							</li>
							<li className="nav-item mx-3">
								<Link className="nav-link" to={"/contact"}>
									<p className="fs-20 c-black">CONTACT</p>
								</Link>
							</li>
							<li className="nav-item mx-3">
								<Link className="nav-link">
									<VscBellDot size={30} color="black" />
								</Link>
							</li>
							<li className="nav-item mx-3">
								<Link className="nav-link" to={"/profile"}>
									<FaUserCircle size={30} color="black" />
								</Link>
							</li>
							<li className="nav-item mx-3 my-auto">
								<Link
									className="nav-link"
									to={"/"}
									onClick={logout}
								>
									<p className="fs-20 c-black">LOGOUT</p>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	} else {
		return null;
	}
};

export default Navbar;

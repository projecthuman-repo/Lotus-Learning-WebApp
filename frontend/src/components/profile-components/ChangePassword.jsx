import React, { useEffect, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import GeneralNavbar from "../navbar/GeneralNavbar";
import GeneralFooter from "../footer/GeneralFooter";
import axios from "axios";
import styles from "../../Styles"; // Import your styles
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      console.log(authUser);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if(isLoggedIn) {
      setEmail(authUser.email);
    } else {
      //Handle OTP Verification part here
      const user = JSON.parse(window.sessionStorage.getItem('user'));
      if(!isLoggedIn && user.user && user.otp) {
        setEmail(user.user.email);
        window.sessionStorage.clear();
      } else {
        navigate("/ForgotPassword");
      }
    }
  }, [authUser]);

  const handleSave = async () => {
    // Implement save functionality here
    // Assumptions made: This page is only accessible either if the user is authorized or the user has verified OTP. TODO: Implement its functionality later.
    if(newPassword != confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    } else {
      setErrorMessage('');
    }

    const response = await axios.post(' http://lotuslearning.world/user/change-password', {
      newPassword: newPassword,
      email: email
	  });

    console.log(response);

    if(response.data.success) {
      alert("Password Changed!");
      navigate("/profile");
    } else {
      setErrorMessage("An error has occurred. Please try again in a few minutes.");
      return;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <GeneralNavbar />
      {/* Your other components and content */}
      <div className="flex-grow flex justify-center items-center">
        <div className="space-y-3 w-[400px] no-select md:p-0 p-2">
          <div>
            <p className="text-start font-bold text-2xl">Change Password</p>
            <p className="text-start font-light text-sm">
              Enter your new password
            </p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="newPassword" className="font-bold cursor-pointer flex justify-between">
              <span>New Password</span>
            </label>
            <div className={`w-full ${styles.simple_text_input} border-4 flex justify-between items-center`}>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="newPassword"
                placeholder="New Password"
                type={passwordVisibility ? "text" : "password"}
                className="focus:outline-none w-full"
              />
              {passwordVisibility ? (
                <MdOutlineVisibility onClick={() => setPasswordVisibility(false)} className="mx-1 text-black cursor-pointer" />
              ) : (
                <MdOutlineVisibilityOff onClick={() => setPasswordVisibility(true)} className="mx-1 text-black cursor-pointer" />
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="font-bold cursor-pointer">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              className={`${styles.simple_text_input} border-4`}
            />
          </div>
          <div>
            <p>{errorMessage}</p>
          </div>
          <button onClick={handleSave} className="font-semibold text-white linearGradient_ver1 text-sm px-3 py-2 rounded-full w-full">
            Save
          </button>
        </div>
      </div>
      <div>
        <GeneralFooter />
      </div>
    </div>
  );
};

export default ChangePassword;

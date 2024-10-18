import React, { useEffect, useState } from "react";

import styles from "../../../Styles";
import { useNavigate } from "react-router-dom";

import GeneralFooter from "../../../components/footer/GeneralFooter";
import SignUp from "./SignUp";
import Login from "./Login";
import LowProfileNavbar from "../../../components/navbar/LowProfileNavbar";
import LotusLogo from "../../../Images/LotusLogoColour.webp"; // Importing image
import CreateAccAdmin from "./CreateAccAdmin";
import CreateAcc from "./CreateAcc";

const Registration = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("screen");
  const navigate = useNavigate();
  const [screen, setScreen] = useState(id);
  useEffect(() => {
    if (!id) {
      navigate("/registration?screen=login");
    }
    else{
      setScreen(id);
    }
  }, [id]);



  return (
    <div className="w-full min-h-full flex-grow ">
      <LowProfileNavbar />
      <div className="flex items-center justify-evenly min-h-[90vh] w-full ">
        {/* <div className="space-y-2 md:block hidden">
          <div className="grid place-items-center">
            <img
              src={LotusLogo}
              alt="Lotus Logo"
              style={{ width: "350px", height: "auto" }}
            />
            <div className="text-center">
              <p className="font-bold text-4xl">
                <br></br>
                Join <br /> Lotus Learning
              </p>
              <p>Let's give learning a different perspective!</p>
            </div>
          </div>
        </div> */}
        {screen === "login" && <Login />}
        {screen === "signup" && <CreateAcc />}
        {screen === 'admin' && <CreateAccAdmin/>}

      </div>

      <GeneralFooter />
    </div>
  );
};

export default Registration;

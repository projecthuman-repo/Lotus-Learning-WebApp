import React, { useEffect, useState } from "react";

import styles from "../../../Styles";
import { useNavigate } from "react-router-dom";

import GeneralFooter from "../../../components/footer/GeneralFooter";
import SignUp from "./SignUp";
import Login from "./Login";
import LowProfileNavbar from "../../../components/navbar/LowProfileNavbar";

const Registration = () => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState("login");
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("screen");
  useEffect(() => {

    if (!id || (id !== "login" && id !== "signup")) {
      console.log('a')
      navigate("/registration?screen=login");
    }
    if (id && id === "signup") {
      setScreen("signup");
    } else if (id && id === "login") {
      setScreen("login");
    }
  }, [id]);

  return (
    <div className="h-full w-full">
      <LowProfileNavbar />
      <div className="flex items-center justify-evenly h-[calc(100%-10rem)] w-full ">
        <div className="space-y-2 md:block hidden">
          <p className="font-bold text-4xl">
            Join <br /> Lotus Learning
          </p>
          <p>Let's give learning a different perspective!</p>
        </div>
        {screen === "login" &&
        <Login />}
        {screen === "signup" &&
        <SignUp />}
      </div>
      <GeneralFooter />
    </div>
  );
};

export default Registration;

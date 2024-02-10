import React, { useState } from "react";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import styles from "../../../Styles";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const Login = () => {

  const navigate = useNavigate();

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const navigateTo = () => {
    navigate('/registration?screen=signup')
  }

  return (
    <div className="space-y-3 w-[400px] no-select md:p-0 p-2">
    <div>
      <p className="text-start font-bold text-2xl">Login to your account</p>
      <p className="text-start font-ligth text-sm">
        Welcome back!
      </p>
    </div>
    <div className="flex flex-col">
      <label htmlFor="email" className="font-bold cursor-pointer">
        Email
      </label>
      <input
        id="email"
        placeholder="Email"
        type="text"
        className={`${styles.simple_text_input}`}
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="password" className="font-bold cursor-pointer">
        Password
      </label>
      <div
        className={`w-full ${styles.simple_text_input} flex justify-between items-center`}
      >
        <input
          id="password"
          placeholder="Password"
          type={passwordVisibility ? "text" : "password"}
          className={`focus:outline-none w-full`}
        />
        {passwordVisibility ? (
          <MdOutlineVisibility onClick={() => {
            setPasswordVisibility(false)
          }} className="mx-1 text-black cursor-pointer" />
        ) : (
          <MdOutlineVisibilityOff onClick={() => setPasswordVisibility(true)} className="mx-1 text-black cursor-pointer" />
        )}
      </div>
      <p className="text-start font-ligth text-sm">
        Don't have an account <span onClick={navigateTo} className="text-blue-500 cursor-pointer font-bold mt-1">Sign up</span>
      </p>
    </div>


    <button className="py-2 rounded-sm flex items-center justify-center font-semibold transition-all w-full text-white bg-blue-500 hover:bg-blue-400">
      Login
    </button>
    <button className="py-2 rounded-sm flex items-center justify-center font-ligth transition-all w-full border text-stone-600 hover:bg-stone-50">
    <FaGoogle  className="text-xl mx-2"/>
     Login with Google 

    </button>
  </div>
  )
}

export default Login
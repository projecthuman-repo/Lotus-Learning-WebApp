import React, { useEffect, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import styles from "../../../Styles";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import axios from "axios";
import { setUser } from "../../../redux/slice/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import SpinnerLoader from "../../../components/loaders/SpinnerLoader";
import saveUserOnCookies from "../../../BackendProxy/cookiesProxy/saveUserCookies";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.user);

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigateTo = () => {
    navigate('/registration?screen=signup');
  };


  const sendLoginRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/user/login-user', {
        email,
        password,
      });

      const foundUser = response.data;

      if (foundUser.success) {
        const savedUser = await saveUserOnCookies({...foundUser.user})
        await dispatch(setUser(savedUser));
        navigate('/');

      }

    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        setErrorMessage("Incorrect email or password.");
      } else {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    if (email.length > 0) {
      const values = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setInvalidEmail(!values.test(email));
    }
  }, [email]);



  return (
    <div className="space-y-3 w-[400px] no-select md:p-0 p-2  ">
      <div>
        <p className="text-start font-bold text-2xl">Login to your account</p>
        <p className="text-start font-light text-sm">
          Welcome back!
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="font-bold cursor-pointer flex justify-between">
          <span>
            Email
          </span>
          <span>
            {invalidEmail ? <CgDanger className="text-red-400"/> : ""}
          </span>
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Password"
            type={passwordVisibility ? "text" : "password"}
            className={`focus:outline-none w-full`}
          />
          {passwordVisibility ? (
            <MdOutlineVisibility onClick={() => setPasswordVisibility(false)} className="mx-1 text-black cursor-pointer" />
          ) : (
            <MdOutlineVisibilityOff onClick={() => setPasswordVisibility(true)} className="mx-1 text-black cursor-pointer" />
          )}
        </div>
        <p className="text-start font-light text-sm">
          Don't have an account? <span onClick={navigateTo} className="text-blue-500 cursor-pointer font-bold mt-1">Sign up</span>
        </p>
      </div>

      <div className="">
        {errorMessage && 
          <p className="text-red-400 text-end text-sm">
            {errorMessage}
          </p>
        }
      </div>
      <button 
        onClick={sendLoginRequest}
        className="py-2 rounded-sm flex items-center justify-center font-semibold transition-all w-full text-white bg-blue-500 hover:bg-blue-400">
        {loading ? <SpinnerLoader/> : "Login"}
      </button>
      <button className="py-2 rounded-sm flex items-center justify-center font-ligth transition-all w-full border text-stone-600 hover:bg-stone-50">
        <FaGoogle className="text-xl mx-2"/>
        Login with Google 
      </button>
    </div>
  );
}

export default Login;

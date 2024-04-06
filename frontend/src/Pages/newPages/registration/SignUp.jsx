import React, { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import styles from "../../../Styles";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import { CgDanger } from "react-icons/cg";
import { useEffect } from "react";
import SpinnerLoader from "../../../components/loaders/SpinnerLoader";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slice/user/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [accountType, setAccountType] = useState('student');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [samePassword, setSamePassword] = useState(false);
  const [missingData, setMissingData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false); // State for username taken
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

  const navigateTo = () => {
    navigate('/registration?screen=login');
  };

  const createAccount = async () => {
    setLoading(true);

    if (!validateFormData()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user/create-user', {
        firstName,
        lastName,
        email,
        accountType,
        username,
        password,
        confirm_password: confirmPassword
      });

      if (response.data.success) {
        const saveOnCookies = await axios.post('http://localhost:5000/cookies/save-user', {
          ...response.data.user
        });

        if (saveOnCookies.status === 200) {
          await dispatch(setUser(saveOnCookies.data.data));
          navigate('/');
        }
      }

      setLoading(false);
      console.log('created:', response.data);
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
    }
  };

  const validateFormData = () => {
    if (!email || !username || !password || !confirmPassword) {
      setMissingData(true);
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInvalidEmail(true);
      return false;
    } else {
      setInvalidEmail(false);
    }

    if (password.length < 8) {
      // Password must be at least 8 characters long
      return false;
    }

    if (password !== confirmPassword) {
      // Passwords don't match
      setSamePassword(true);
      return false;
    }

    return true;
  };

  useEffect(() => {
    setSamePassword(false); // Reset samePassword state when password or confirmPassword changes
  }, [password, confirmPassword]);

  return (
    <div className="space-y-3 w-[400px]  no-select  md:p-0 p-2">
      <div>
        <p className="text-start font-bold text-3xl">Create Account</p>
        {/* <p className="text-start font-ligth text-sm">
          Let's create your account!
        </p> */}
      </div>
      <div className="flex flex-col">
        <div>
          {missingData && 
            <div className="flex items-center justify-between text-red-400">
              <p>
                Please fill all the data
              </p>
              <CgDanger className="ml-1" />
            </div>
          }
        </div>
        <label htmlFor="firstName" className="font-bold cursor-pointer pl-2 pt-2">
          First Name
        </label>
        <input
          id="firstName"
          placeholder="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={`${styles.simple_text_input}`}
        />
        <label htmlFor="lastName" className="font-bold cursor-pointer pl-2 pt-2">
          Last Name
        </label>
        
        <input
          id="lastName"
          placeholder="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={`${styles.simple_text_input}`}
        />

        <label htmlFor="email" className="font-bold cursor-pointer pl-2 pt-2 flex justify-between">
          <span>Email</span>
          <span>{invalidEmail && <CgDanger className="text-red-400" />}</span>
        </label>
        <input
          id="email"
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${styles.simple_text_input}`}
        />
        {invalidEmail && <p className="text-red-500 text-sm">Email must be in a valid format</p>}

        <label htmlFor="username" className="font-bold cursor-pointer pl-2 pt-2">
          Username
        </label>
        <input
          id="username"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`${styles.simple_text_input}`}
        />
        {usernameTaken && <p className="text-red-500 text-sm">Username is already taken</p>}

        <label className="font-bold cursor-pointer pl-2 pt-2">
          Account Type
        </label>
        <div className="flex items-center">
          <input
            id="student"
            name="accountType"
            type="radio"
            value="student"
            checked={accountType === 'student'}
            onChange={(e) => setAccountType(e.target.value)}
            className="hidden"
          />
          <label htmlFor="student" className={`font-semibold text-sm px-3 py-2 rounded-full flex items-center justify-center transition-all border hover:bg-stone-50 cursor-pointer mr-4 ${accountType === 'student' ? 'text-white linearGradient_ver1' : 'text-gray-400 font-normal'}`}>
            Learner
          </label>
          <span className="mx-2 pr-4">or</span>
          <input
            id="instructor"
            name="accountType"
            type="radio"
            value="instructor"
            checked={accountType === 'instructor'}
            onChange={(e) => setAccountType(e.target.value)}
            className="hidden"
          />
          <label htmlFor="instructor" className={`font-semibold text-sm px-3 py-2 rounded-full flex items-center justify-center transition-all border hover:bg-stone-50 cursor-pointer ${accountType === 'instructor' ? 'text-white linearGradient_ver1' : 'text-gray-400 font-normal'}`}>
            Instructor
          </label>
        </div>

        <label htmlFor="password" className="font-bold cursor-pointer pl-2 pt-2">
          Password
        </label>
        <div className={`w-full ${styles.simple_text_input} flex justify-between items-center`}>
          <input
            id="password"
            placeholder="Password"
            value={password}
            type={passwordVisibility ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            className={`focus:outline-none w-full`}
          />
          {passwordVisibility ? (
            <MdOutlineVisibility onClick={() => setPasswordVisibility(false)} className="mx-1 text-black cursor-pointer" />
          ) : (
            <MdOutlineVisibilityOff onClick={() => setPasswordVisibility(true)} className="mx-1 text-black cursor-pointer" />
          )}
        </div>
        {/* Display password length error message */}
        {password.length > 0 && password.length < 8 && <p className="text-red-500 text-sm">Password must be at least 8 characters long</p>}

        <label htmlFor="confirm-password" className="font-bold cursor-pointer flex justify-between pl-2 pt-3">
          <span>Confirm Password</span>
          <span>{samePassword && <CgDanger className="text-red-400" />}</span>
        </label>
        <div className={`w-full ${styles.simple_text_input} flex justify-between items-center`}>
          <input
            id="confirm-password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={confirmPasswordVisibility ? "text" : "password"}
            className={`focus:outline-none w-full`}
          />
          {confirmPasswordVisibility ? (
            <MdOutlineVisibility onClick={() => setConfirmPasswordVisibility(false)} className="mx-1 text-black cursor-pointer" />
          ) : (
            <MdOutlineVisibilityOff onClick={() => setConfirmPasswordVisibility(true)} className="mx-1 text-black cursor-pointer" />
          )}
        </div>
        {samePassword && <p className="text-red-500 text-sm">Passwords don't match</p>}
        <p className="text-start font-ligth text-sm pt-2 pl-2">
          Already have an account? <span onClick={navigateTo} className="text-pink-600 cursor-pointer font-bold mt-1">Login</span>
        </p>
      </div>
      <button onClick={() => createAccount()} className="font-semibold text-white linearGradient_ver1 text-sm px-3 py-2 rounded-full w-full">
        {loading ? <SpinnerLoader /> : "Create account"}
      </button>
      <button className="font-semibold text-stone-600 text-sm px-3 py-2 rounded-full flex items-center justify-center transition-all w-full border hover:bg-stone-50">
        <FaGoogle className="text-xl mx-2" />
        Sign with Google
      </button>
    </div>
  );
};

export default SignUp;

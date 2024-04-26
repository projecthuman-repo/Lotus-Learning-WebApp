import React, { useState, useEffect } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import SpinnerLoader from "../../../components/loaders/SpinnerLoader";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slice/user/userSlice";
import { useGoogleLogin } from "@react-oauth/google";

import styles from "../../../Styles";
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
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
  const navigateTo = () => {
	navigate('/registration?screen=login');
  };
  const createAccount = async () => {
	setLoading(true);
	setInvalidEmail(false); // Reset email error state
	setUsernameTaken(false); // Reset username error state
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
	  });
	  if (response.data.success) {
		const saveOnCookies = await axios.post('http://localhost:5000/cookies/save-user', {
		 	...response.data.user
		},{
			withCredentials: true, // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (saveOnCookies.status === 200) {
		  await dispatch(setUser(saveOnCookies.data.data));
		  navigate('/');
		}
	  } else {
		// Handle errors related to email or username
		if (response.data.message === 'The email is already in use') {
		  setInvalidEmail(true);
		} else if (response.data.message === 'The username is already taken') {
		  setUsernameTaken(true);
		}
	  }
	} catch (error) {
	  console.error('Error:', error);
	} finally {
	  setLoading(false);
	}
  };

  const googleSignUp = useGoogleLogin({
	onSuccess: async (credentialResponse) => {
	  console.log(credentialResponse);
  
	  // Get user info
	  const userInfo = await axios.post(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${credentialResponse.access_token}`);
	  console.log(userInfo);

	const user = {
		firstName: userInfo.data.given_name,
		lastName: userInfo.data.last_name || '',
		email: userInfo.data.email,
		password: credentialResponse.access_token,
		username: userInfo.data.email,
		accountType: 'student',
		googleAuth: 1,
		enrolledCourses: [],
		createdCourses: [],
		accomplishments: []
	};
  
	  // Check if user exists in the db
	  const response = await axios.post('http://localhost:5000/user/google-login', {
		...user
	  });

	  console.log(response);

	  // Set loggedin cookie with access token and email
	  if (response.data.success) {
		const saveOnCookies = await axios.post('http://localhost:5000/cookies/save-user', {
			...user
		},{
			withCredentials: true, // Include cookies in the request
			headers: {
				'Content-Type': 'application/json',
			},
		});

		console.log(saveOnCookies);
		
		if (saveOnCookies.status === 200) {
			await dispatch(setUser(saveOnCookies.data.data));
			navigate('/');
		}
	  }
	},
	onError: (credentialResponse) => {
	  console.log(credentialResponse);
	}
});

  const validateFormData = () => {
	setMissingData(false);
	setInvalidEmail(false);
	setSamePassword(false);
	if (!email || !username || !password || !confirmPassword) {
	  setMissingData(true);
	  return false;
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
	  setInvalidEmail(true);
	  return false;
	}
	if (password.length < 8) {
	  return false;
	}
	if (password !== confirmPassword) {
	  setSamePassword(true);
	  return false;
	}
	return true;
  };

  useEffect(() => {
	setSamePassword(false); // Reset samePassword state when password or confirmPassword changes
  }, [password, confirmPassword]);

  return (
	<div className="space-y-3 w-[400px] no-select md:p-0 p-2">
	  <div>
		<p className="text-start font-bold text-3xl">Create Account</p>
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
		  className={`${styles.simple_text_input} border-4`}
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
		  className={`${styles.simple_text_input} border-4`}
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
		  className={`${styles.simple_text_input} border-4`}
		/>
		{/* {invalidEmail && <p className="text-red-500 text-sm">Email already exists, please login  </p>} */}
		{invalidEmail && <p className="text-red-500 text-sm">Invalid Email type, or Email already being used   </p>}
		<label htmlFor="username" className="font-bold cursor-pointer pl-2 pt-2">
		  Username
		</label>
		<input
		  id="username"
		  placeholder="Username"
		  type="text"
		  value={username}
		  onChange={(e) => setUsername(e.target.value)}
		  className={`${styles.simple_text_input} border-4`}
		/>
		{usernameTaken && <p className="text-red-500 text-sm">Username is already taken, please try different username</p>}
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
		  <label htmlFor="student" className={`font-semibold text-sm px-3 py-2 rounded-full flex items-center justify-center transition-all border hover:bg-stone-50 cursor-pointer mr-4 border-4 ${accountType === 'student' ? 'text-white linearGradient_ver1' : 'text-gray-400 font-normal'}`}>
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
		  <label htmlFor="instructor" className={`font-semibold text-sm px-3 py-2 rounded-full flex items-center justify-center transition-all border hover:bg-stone-50 cursor-pointer border-4 ${accountType === 'instructor' ? 'text-white linearGradient_ver1' : 'text-gray-400 font-normal'}`}>
			Instructor
		  </label>
		</div>
		<label htmlFor="password" className="font-bold cursor-pointer pl-2 pt-2">
		  Password
		</label>
		<div className={`w-full ${styles.simple_text_input} flex justify-between items-center border-4`}>
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
		{password.length > 0 && password.length < 8 && <p className="text-red-500 text-sm">Password must be at least 8 characters long</p>}
		<label htmlFor="confirm-password" className="font-bold cursor-pointer flex justify-between pl-2 pt-3">
		  <span>Confirm Password</span>
		  <span>{samePassword && <CgDanger className="text-red-400" />}</span>
		</label>
		<div className={`w-full ${styles.simple_text_input} flex justify-between items-center border-4`}>
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
		<p className="text-start font-light text-sm pt-2 pl-2">
		  Already have an account? <span onClick={navigateTo} className="text-pink-600 cursor-pointer font-bold mt-1">Login</span>
		</p>
	  </div>
	  <button onClick={() => createAccount()} className="font-semibold text-white linearGradient_ver1 text-sm px-3 py-2 rounded-full w-full">
		{loading ? <SpinnerLoader /> : "Create account"}
	  </button>
	  <button onClick={googleSignUp} className="font-semibold text-stone-600 text-sm px-3 py-2 rounded-full flex items-center justify-center transition-all w-full border hover:bg-stone-50">
		<FaGoogle className="text-xl mx-2" />
		Sign Up with Google
	  </button>
	  
	</div>
  );
};
export default SignUp;
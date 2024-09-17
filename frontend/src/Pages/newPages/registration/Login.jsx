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
import { useGoogleLogin } from "@react-oauth/google";

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

  const navigateForgotPassword = () => {
    navigate('/ForgotPassword');
  };  


  const navigateTo = () => {
	navigate('/registration?screen=signup');
  };

  const googleSignIn = useGoogleLogin({
	onSuccess: async (credentialResponse) => {
	  console.log(credentialResponse);
  
	  // Get user info
	  const userInfo = await axios.post(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${credentialResponse.access_token}`);
	  console.log(userInfo);

	  const user = {
		firstName: userInfo.data.given_name,
		lastName: userInfo.data.last_name || '',
		email: userInfo.data.email,
		accessToken: credentialResponse.access_token,
		username: userInfo.data.email,
		accountType: 'student',
		enrolledCourses: [],
		createdCourses: [],
		accomplishments: []
	};
  
	  // Log user in if account exists. If account does not exist, sign the user up automatically.
	  const response = await axios.post(' https://52.14.4.146:5000/user/google-login', {
		...user
	});

	  // Set loggedin cookie with user info
	  if (response.data.success) {
		const saveOnCookies = await axios.post(' https://52.14.4.146:5000/cookies/save-user', {
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

  const sendLoginRequest = async () => {
	setLoading(true);
	try {
	  const response = await axios.post(' https://52.14.4.146:5000/user/login-user', {
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

  useEffect(() => {
	console.log("Error message:", errorMessage); // Debug statement
  }, [errorMessage]);

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
		  className={`${styles.simple_text_input} border-2`}
		/>
	  </div>

	  <div className="flex flex-col">
		<label htmlFor="password" className="font-bold cursor-pointer">
		  Password
		</label>
		<div
		  className={`w-full ${styles.simple_text_input} flex justify-between items-center border-2`}
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
		Don't have an account? <span onClick={navigateTo} className="text-pink-600 cursor-pointer font-bold mt-1">Sign up &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
          <span onClick={navigateForgotPassword} className="text-pink-600 cursor-pointer font-bold mt-1">Forgot Password &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
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
		className="font-semibold text-white linearGradient_ver1 text-sm px-3 py-2 rounded-full w-full">
		{loading ? <SpinnerLoader/> : "Login"}
	  </button>
	  <button onClick={()=> googleSignIn()} className="font-semibold text-stone-600 text-sm px-3 py-2 rounded-full flex items-center justify-center transition-all w-full border hover:bg-stone-50">
		<FaGoogle className="text-xl mx-2"/>
		Login with Google 
	  </button>
	</div>
  )
}

export default Login;

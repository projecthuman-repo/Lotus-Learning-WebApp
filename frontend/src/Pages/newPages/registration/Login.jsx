import React, { useEffect, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import styles from "../../../Styles";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import axios from "axios";
import { setUser} from "../../../redux/slice/user/userSlice";
import { useDispatch } from "react-redux";
import SpinnerLoader from "../../../components/loaders/SpinnerLoader";
import saveUserOnCookies from "../../../BackendProxy/cookiesProxy/saveUserCookies";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [is2FAEnabled, setIs2FAEnabled] = useState(() => {
    return JSON.parse(localStorage.getItem("bypass2FA")) || false;
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [resendVerification, setResendVerification] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false); // State to track if email is being sent

  const navigateForgotPassword = () => {
    navigate('/ForgotPassword');
  };

  const navigateTo = () => {
    navigate('/registration?screen=signup');
  };

  const googleSignIn = useGoogleLogin({
	flow: 'auth-code',
	onSuccess: async (credentialResponse) => {
	  try {
		const code = credentialResponse.code;
		console.log('Authorization Code:', code);
  
		// Send the authorization code to your backend
		const responseT = await axios.post('http://localhost:5000/google/auth', { code });
		console.log('Token Response:', responseT.data);
  
		// Extract access token
		const access_token = responseT.data.tokens.accessToken;
		const refresh_token = responseT.data.tokens.refreshToken;
		const expires_in = responseT.data.tokens.expiresIn;
		console.log('Access Token:', access_token);
		console.log('Refresh Token:', refresh_token);
  
		// Get user info using access token
		const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
		console.log('User Info:', userInfo.data);
  
		const user = {
		  firstName: userInfo.data.given_name,
		  lastName: userInfo.data.family_name || '',
		  email: userInfo.data.email,
		  accessToken: access_token,
		  refreshToken : refresh_token,
		  expiresIn : expires_in,
		  username: userInfo.data.email,
		  accountType: 'student',
		  isVerified: true,
		  is2FASetupDone: false, 
		  enrolledCourses: [],
		  createdCourses: [],
		  accomplishments: [],
		};
  
		// Log user in if account exists. If account does not exist, sign the user up automatically.
		const response = await axios.post('http://localhost:5000/user/google-login', user);
		console.log('Login Response:', response.data);
      
		if (response.data.success) {
		//	const saveOnCookies = await axios.post('http://localhost:5000/cookies/save-user', {
		//		...user
		const saveOnCookies = await axios.post('http://localhost:5000/cookies/save-user', {
				...response.data.user
			},{
				withCredentials: true, // Include cookies in the request
				headers: {
					'Content-Type': 'application/json',
				},
			});
	
			console.log(saveOnCookies);
  
		  if (saveOnCookies.status === 200) {
			await dispatch(setUser(saveOnCookies.data.data));
	//		navigate('/');
	console.log("COOKIES",saveOnCookies.data.data)
	if (!saveOnCookies.data.data.is2FASetupDone && is2FAEnabled) {
		navigate('/setup-2fa');
	  } else if( is2FAEnabled) {
		navigate('/verify-2fa');
	  }else{
		navigate('/');
	  }
		  }
		}
	  } catch (error) {
		console.error('Error during Google Sign-In:', error);
	  }
	},
	onError: (credentialResponse) => {
	  console.log('Sign-In Error:', credentialResponse);
	},
  });
  
  const sendLoginRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/user/login-user', {
        email,
        password,
      });

      const foundUser = response.data;

      if (foundUser.success) {
        const savedUser = await saveUserOnCookies({ ...foundUser.user });
        await dispatch(setUser(savedUser));
        if (!foundUser.user.is2FASetupDone && is2FAEnabled) {
          navigate('/setup-2fa');
        } else if (is2FAEnabled) {
          navigate('/verify-2fa');
        } else {
          navigate('/');
        }
      } else {
        if (foundUser.error === 'Your account has not been verified. Please check your email for the verification link.') {
          setErrorMessage('Your account has not been verified. Please check your email for the verification link.');
        } else {
          setErrorMessage('Incorrect email or password.');
        }
        setLoading(false);
      }
    }  catch (error) {
		setLoading(false);
		if (error.response && error.response.status === 400) {
		 
		  if (error.response.data.error === 'Your account has not been verified. Please check your email for the verification link.') {
			setErrorMessage('Your account has not been verified. Please check your email for the verification link.');
			setResendVerification(true); 
		  } else {
			setErrorMessage(error.response.data.error || 'Incorrect email or password.');
			setResendVerification(false);
		  }
		} else {
		  console.error('Error:', error);
		}
	  }
  };

  const resendVerificationEmail = async () => {
    setSendingEmail(true);
    try {
      const response = await axios.post('http://localhost:5000/user/resend-verification', { email });

      if (response.data.success) {
        setEmailSent(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to resend verification email.');
    } finally {
      setSendingEmail(false);
    }
  };

  useEffect(() => {
    if (email.length > 0) {
      const values = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setInvalidEmail(!values.test(email));
    }
  }, [email]);

  useEffect(() => {
    console.log("Error message:", errorMessage); 
    console.log("Resend Verification:", resendVerification); 
  }, [errorMessage, resendVerification]);

  const handleBypass2FA = () => {
    const newState = !is2FAEnabled;
    setIs2FAEnabled(newState);
    localStorage.setItem("bypass2FA", JSON.stringify(newState)); // Persist the state to localStorage
  };

  return (
    <div className="space-y-3 w-[400px] no-select md:p-0 p-2">
      <div>
        <p className="text-start font-bold text-2xl">Login to your account</p>
        <p className="text-start font-light text-sm">Welcome back!</p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="font-bold cursor-pointer flex justify-between">
          <span>Email</span>
          <span>{invalidEmail ? <CgDanger className="text-red-400" /> : ""}</span>
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
        <label htmlFor="password" className="font-bold cursor-pointer">Password</label>
        <div className={`w-full ${styles.simple_text_input} flex justify-between items-center border-2`}>
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

        {/* Improved spacing for Sign Up and Forgot Password links */}
        <div className="flex justify-between mt-2">
          <p className="text-start font-light text-sm">
            Don't have an account? <span onClick={navigateTo} className="text-pink-600 cursor-pointer font-bold">Sign up</span>
          </p>
          <p className="text-start font-light text-sm">
            <span onClick={navigateForgotPassword} className="text-pink-600 cursor-pointer font-bold">Forgot Password</span>
          </p>
        </div>
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
        {loading ? <SpinnerLoader /> : "Login"}
      </button>
      <button onClick={googleSignIn} className="font-semibold text-stone-600 text-sm px-3 py-2 rounded-full flex items-center justify-center transition-all w-full border hover:bg-stone-50">
        <FaGoogle className="text-xl mx-2" />
        Login with Google 
      </button>

      {resendVerification && (
        <div className="mt-4 text-center">
          <p className="text-red-400 text-sm">Your account is not verified.</p>
          <button 
            onClick={resendVerificationEmail} 
            className="font-semibold text-white linearGradient_ver1 text-sm px-3 py-2 rounded-full w-full mt-2">
            {sendingEmail ? <SpinnerLoader /> : "Resend Verification Email"}
          </button>
          {emailSent && (
            <p className="text-green-400 text-sm mt-2">Verification email sent successfully!</p>
          )}
        </div>
      )}

      {/* Bypass 2FA Button */}
      <div className="mt-4 text-center">
        <button
          onClick={handleBypass2FA}
          className={`font-semibold text-white text-sm px-3 py-2 rounded-full w-full mt-2 ${
            is2FAEnabled ?  "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
        </button>
      </div>
    </div>
  );
};

export default Login;

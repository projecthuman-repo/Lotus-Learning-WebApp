import React, { useState } from "react";
import LowProfileNavbar from "../../../components/navbar/LowProfileNavbar";
import GeneralFooter from "../../../components/footer/GeneralFooter";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigateTo = () => {
    navigate('/registration?screen=signup');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage(''); // Reset the error message with new input
  };

  const handleSubmit = async () => {
    if (!email) {
      setErrorMessage('Please enter your email address');
      return;
    }

    setLoading(true); // Set loading true while the request is being processed
    try {
      // Send a POST request to send the email
      const response = await axios.post(' http://52.14.4.146:5000/user/forgot-password', { email });
      setLoading(false); // Set loading false after receiving the response

      if (response.status === 200) {
        alert(response.data.message); // Alert user or show modal/dialog
        navigate('/verifyotp'); // Redirect user to login after action
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 404) {
        setErrorMessage('Email does not exist'); // Specific error if the email is not found
      } else {
        setErrorMessage('An unexpected error occurred'); // Generic error message
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <LowProfileNavbar />
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-md p-20 flex flex-col items-center bg-white rounded-lg shadow-lg border-2 border-pink-300 relative">
          <img src="/LotusLogoColour.webp" alt="Lotus Learning" className="mb-2" style={{ width: '200px', height: 'auto' }} />
          <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="shadow appearance-none border rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email address"
          />
          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="font-semibold text-white linearGradient_ver1 text-sm px-3 py-2 rounded-full w-full mt-4"
          >
            {loading ? 'Loading...' : 'Send Email'}
          </button>
          <p className="mt-2 text-sm text-gray-600" style={{ wordWrap: 'break-word' }}>
            On clicking send email, an email will be sent containing an OTP, to reset your password. <br />
          </p>
          <div className="absolute bottom-0 left-0 right-0 mb-4 text-center"> {/* Positioned absolutely at the bottom */}
            <p className="text-center font-light text-sm pt-2">
              Don't have an account? <span onClick={navigateTo} className="text-pink-600 cursor-pointer font-bold mt-1">Sign up</span>
            </p>
          </div>
        </div>
      </div>
     <br></br>
      <GeneralFooter />
    </div>
  );
};

export default ForgotPassword;

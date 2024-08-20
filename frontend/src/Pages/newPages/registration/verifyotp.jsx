// verifyotp.jsx

import React, { useState } from "react";
import LowProfileNavbar from "../../../components/navbar/LowProfileNavbar";
import GeneralFooter from "../../../components/footer/GeneralFooter";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    if (!otp) {
      setErrorMessage('Please enter the OTP');
      return;
    }

    setLoading(true);
    try {
      console.log('Sending request with OTP:', otp);
      const response = await axios.post('http://52.14.4.146:5000/user/verify-otp', { otp: otp.toString() });
      console.log('Response:', response.data);
      setLoading(false);

      if (response.status === 200) {
        alert(response.data.message);
        window.sessionStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/profile/profile-settings/ChangePassword');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      if (error.response && error.response.status === 400) {
        setErrorMessage('Invalid or expired OTP');
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    }
  };

  const navigateToSignUp = () => {
    navigate('/registration?screen=signup');
  };

  return (
    <div className="flex flex-col min-h-screen">
    <LowProfileNavbar />
    <div className="flex-grow flex justify-center items-center">
      <div className="w-full max-w-md p-20 flex flex-col items-center bg-white rounded-lg shadow-lg border-2 border-pink-300 relative">
        <img src="/LotusLogoColour.webp" alt="Lotus Learning" className="mb-2" style={{ width: '200px', height: 'auto' }} />
        <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
        <input
          type="text" // Change type to text to allow leading zeros
          value={otp}
          onChange={handleOtpChange}
          className="shadow appearance-none border rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter the OTP"
        />
        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="font-semibold text-white linearGradient_ver1 text-sm px-3 py-2 rounded-full w-full mt-4"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </div>
    </div>
    <GeneralFooter />
  </div>
);
};

export default VerifyOTP;
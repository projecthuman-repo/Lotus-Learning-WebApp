import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LowProfileNavbar from "../../../components/navbar/LowProfileNavbar";
import GeneralFooter from "../../../components/footer/GeneralFooter";

const TwoFAVerification = () => {
  const user = useSelector((state) => state.user);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false); // New state for button click
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleVerifyCode = async () => {
    setIsVerifying(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/user/verify-code', { email: user.email, code });
      navigate('/');
    } catch (error) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    const sendVerificationCode = async () => {
      setIsLoading(true);
      setError('');
      try {
        await axios.post('http://localhost:5000/user/send-verification-code', { email: user.email, phoneNumber: user.phoneNumber });
        setMessage('Verification code sent to your phone.');
      } catch (error) {
        setError('Failed to send verification code. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    if (user.is2FASetupDone) {
      sendVerificationCode();
    }
  }, [user.email, user.phoneNumber, user.is2FASetupDone]);

  return (
    <div className="w-full min-h-full flex-grow">
      <LowProfileNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h3>2FA Verification:</h3>
        <input
          type="text"
          value={code}
          onChange={handleCodeChange}
          placeholder="Enter verification code"
          className="w-64 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button 
          onClick={handleVerifyCode} 
          className="mt-4 font-semibold text-white linearGradient_ver1 text-sm px-3 py-2 rounded-full" 
          disabled={isLoading || isVerifying}
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>
        {error && <p>{error}</p>}
      </div>
      <GeneralFooter />
    </div>
  );
};

export default TwoFAVerification;

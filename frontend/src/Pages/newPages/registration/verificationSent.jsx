import React, { useState } from 'react';
import LowProfileNavbar from "../../../components/navbar/LowProfileNavbar";
import GeneralFooter from "../../../components/footer/GeneralFooter";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerificationSent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const email = location.state?.email || '';
  const [loading, setLoading] = useState(false);

  const handleResendVerification = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/user/resend-verification', { email });

      if (response.data.success) {
        setMessage('Verification email resent. Please check your email.');
      } else {
        setMessage(response.data.message || 'Failed to resend verification email.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to resend verification email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-full flex-grow">
      <LowProfileNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Email Sent</h1>
        <p>Please check your email for the verification link.</p>
        <div className="flex flex-col items-center mt-4">
          <button
            onClick={handleResendVerification}
            className="font-semibold text-white linearGradient_ver1 text-sm px-3 py-2 rounded-full"
          >
            {loading ? 'Resending...' : 'Resend Verification Email'}
          </button>
        </div>
        {message && <p className="mt-4 text-sm">{message}</p>}
      </div>
      <GeneralFooter />
    </div>
  );
};

export default VerificationSent;

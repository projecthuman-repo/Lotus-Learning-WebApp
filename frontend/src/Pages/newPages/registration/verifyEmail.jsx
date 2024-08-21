import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import LowProfileNavbar from "../../../components/navbar/LowProfileNavbar";
import GeneralFooter from "../../../components/footer/GeneralFooter";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from "../../../redux/slice/user/userSlice";
import saveUserOnCookies from "../../../BackendProxy/cookiesProxy/saveUserCookies";

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  useEffect(() => {
    const decodeToken = () => {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email);
      } catch (error) {
        console.error("Error decoding token:", error);
        setVerificationStatus('Invalid verification link.');
      }
    };

    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/verify/${token}`);
        if (response.data.success) {
          const savedUser = await saveUserOnCookies({...response.data.user});
          await dispatch(setUser(savedUser));
          setVerificationStatus('Email verified successfully. Redirecting to login...');
          setTimeout(() => {
            navigate('/registration?screen=login');
          }, 3000);
        } else {
          setVerificationStatus(response.data.message || 'Email verification failed.');
          setTimeout(() => {
            navigate('/registration?screen=login');
          }, 3000);
        }
      } catch (error) {
        setVerificationStatus(error.response?.data?.message || 'Something went wrong, please try again.');
        setTimeout(() => {
          navigate('/registration?screen=login');
        }, 3000);
      }
    };

    if (token) {
      decodeToken();
      verifyEmail();
    } else {
      setVerificationStatus('Invalid verification link.');
    }
  }, [token, navigate, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <LowProfileNavbar />
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-md p-20 flex flex-col items-center bg-white rounded-lg shadow-lg border-2 border-pink-300 relative">
          <img src="/LotusLogoColour.webp" alt="Lotus Learning" className="mb-2" style={{ width: '200px', height: 'auto' }} />
          <h1 className="text-2xl font-bold">Email Verification</h1>
          {verificationStatus ? (
            <p className="mt-4 text-lg">{verificationStatus}</p>
          ) : (
            <p className="mt-4 text-lg">Verifying your email...</p>
          )}
          {message && <p className="mt-4 text-sm">{message}</p>}
        </div>
      </div>
      <GeneralFooter />
    </div>
  );
};

export default VerifyEmail;

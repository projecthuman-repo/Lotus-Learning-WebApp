import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LowProfileNavbar from "../../../components/navbar/LowProfileNavbar";
import GeneralFooter from "../../../components/footer/GeneralFooter";

const TwoFASetup = () => {
  const user = useSelector((state) => state.user);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setPhoneError(''); 
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{10}$/; 
    return phoneRegex.test(number);
  };

  const formatPhoneNumber = (number) => {
    return `+1${number}`;
  };

  const checkPhoneNumberUnique = async (formattedPhoneNumber) => {
    try {
      const response = await axios.post('http://localhost:5000/user/check-phone-number', {
        phoneNumber: formattedPhoneNumber,
      });
      return response.data.message === 'Phone number is available';
    } catch (error) {
      setPhoneError('Failed to verify phone number uniqueness. Please try again.');
      return false;
    }
  };

  const handleEnable2FA = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError('Invalid phone number. Please enter a valid 10-digit phone number with no spaces.');
      return;
    }

    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    setIsLoading(true);
    setError('');
    setPhoneError('');

    const isPhoneNumberUnique = await checkPhoneNumberUnique(formattedPhoneNumber);
    if (!isPhoneNumberUnique) {
      setPhoneError('This phone number is already associated with another account.');
      setIsLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/user/send-verification-code', {
        email: user.email, 
        phoneNumber: formattedPhoneNumber,
      });
      navigate('/verify-2fa');
    } catch (error) {
      setError('Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-full flex-grow">
      <LowProfileNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h3 className="text-2xl font-bold mb-4">Enable Two-Factor Authentication</h3>
        <h2 className="text-2xl font-bold mb-4">Enter phone number with no spaces:</h2>
        <input
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Enter phone number"
          className="w-64 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {phoneError && <p className="text-red-500 mt-2">{phoneError}</p>}
        <button
          onClick={handleEnable2FA}
          className="mt-4 font-semibold text-white linearGradient_ver1 text-sm px-3 py-2 rounded-full" 
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Enable 2FA'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <GeneralFooter />
    </div>
  );
};

export default TwoFASetup;

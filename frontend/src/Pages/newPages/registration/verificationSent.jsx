import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LowProfileNavbar from "../../../components/navbar/LowProfileNavbar";
import GeneralFooter from "../../../components/footer/GeneralFooter";

const VerificationSent = () => {
  const navigate = useNavigate();
  const channel = new BroadcastChannel('redirectChannel');

  useEffect(() => {
    // Notify all open tabs to redirect to the login page
    channel.postMessage('redirectToLogin');

    // Set a timer to redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate('/registration?screen=login');
    }, 3000);

    // Cleanup: clear the timer and close the channel when the component unmounts
    return () => {
      clearTimeout(timer);
      channel.close();
    };
  }, [navigate, channel]);

  return (
    <div className="w-full min-h-full flex-grow">
      <LowProfileNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Email Sent</h1>
        <p>Please check your email for the verification link.</p>
      </div>
      <GeneralFooter />
    </div>
  );
};

export default VerificationSent;

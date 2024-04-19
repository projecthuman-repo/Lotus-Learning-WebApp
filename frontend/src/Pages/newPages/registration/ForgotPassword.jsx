import React from "react";
import LowProfileNavbar from "../../../components/navbar/LowProfileNavbar";
import GeneralFooter from "../../../components/footer/GeneralFooter";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate('/registration?screen=signup');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* this is for header */}
      <LowProfileNavbar />

      {/* The content inside border */}
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-md p-20 flex flex-col items-center bg-white rounded-lg shadow-lg border-2 border-pink-300 relative"> {/* Added 'relative' class here */}
          <img src="/LotusLogoColour.webp" alt="Lotus Learning" className="mb-2" style={{ width: '200px', height: 'auto' }} />
          <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
          <div className="mb-2 w-full" style={{ textAlign: 'left' }}> {/* Adjusted alignment to left */}
            <input
              type="email"
              id="email"
              name="email"
              className="shadow appearance-none border rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email address"
              style={{ fontWeight: 'bold', fontSize: '1rem', lineHeight: '1.25' }}
            />
          </div>
          <button className="font-semibold text-white linearGradient_ver1 text-sm px-3 py-2 rounded-full w-full">
            Send Email
          </button>
          <br />
          <p className="mt-2 text-sm text-gray-600" style={{ wordWrap: 'break-word' }}>
            On clicking Reset Password, an email will be sent for you to change your password. <br />
          </p>

          <div className="absolute bottom-0 left-0 right-0 mb-4 text-center"> {/* Positioned absolutely at the bottom */}
            <p className="text-center font-light text-sm pt-2">
              Don't have an account? <span onClick={navigateTo} className="text-pink-600 cursor-pointer font-bold mt-1">Sign up</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto bg-white">
        <GeneralFooter />
      </div>
    </div>
  );
};

export default ForgotPassword;

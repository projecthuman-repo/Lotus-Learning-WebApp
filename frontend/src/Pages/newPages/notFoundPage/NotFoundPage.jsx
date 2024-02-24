import React from "react";
import LowProfileNavbar from "../../../components/navbar/LowProfileNavbar";
import { BsEmojiDizzy } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {

  const navigate = useNavigate()

  return (
    <div className="h-full w-full">
      <LowProfileNavbar />
      <div className="h-[60%] w-full flex sm:flex-row flex-col items-center justify-center">
        <BsEmojiDizzy className="text-[10rem] text-black" />
        <div className="ml-2 flex flex-col items-center sm:items-start">
          <p className="font-semibold mt-3 text-4xl text_linearGradient_ver1">
            404
          </p>
          <p className="text-base">Sorry, we lost you there</p>
          <button onClick={() => navigate('/')} className="bg-black text-white px-2 py-1 rounded-lg mt-2">
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

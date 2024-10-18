import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const HamburgerMenu = ({ onToggle, isMenuOpen }) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="p-2 text-2xl bg-gray-800 text-white rounded-full focus:outline-none"
      >
        {isMenuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </button>
      <div
        className={`absolute top-0 right-0 bg-white shadow-lg rounded-lg p-4 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Add menu items here */}
        <div className="flex flex-col items-start">
          <button
            className="py-2 px-4 text-sm hover:bg-gray-200 rounded"
            onClick={() => onToggle(false)} 
          >
            Resize Game
          </button>
          <button
            className="py-2 px-4 text-sm hover:bg-gray-200 rounded"
            onClick={() => onToggle(false)} 
          >
            Other Action
          </button>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;

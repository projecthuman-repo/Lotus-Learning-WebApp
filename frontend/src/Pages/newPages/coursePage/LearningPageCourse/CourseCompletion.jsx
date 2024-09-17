import React, { useState } from "react";
import LowProfileNavbar from "../../../../components/navbar/LowProfileNavbar";
import GeneralFooter from "../../../../components/footer/GeneralFooter";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CourseCompletion = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

  const handleSubmitRating = () => {
    console.log(`User rated the course ${rating} stars`);
    navigate('/home')
  };

  const skipAction = () => {
    navigate('/home')
  };


  return (
    <div className="flex flex-col min-h-screen">
      <LowProfileNavbar />
      <div className="flex-grow flex flex-col justify-center items-center">
      <button
          onClick={skipAction}
         className="font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 text-base px-6 py-2 rounded-md transition-transform transform hover:scale-105 hover:from-pink-600 hover:to-orange-600"
          >
          Skip
        </button>
        <h2 className="text-2xl font-bold mb-4">Congratulations for completing the course!</h2>
        <p className="mb-2">Rate this course:</p>
        <Rating
          emptySymbol={<FaStar size={30} className="text-gray-300" />}
          fullSymbol={<FaStar size={30} className="text-yellow-500" />}
          initialRating={rating}
          onChange={(value) => setRating(value)}
        />
        <button
          onClick={handleSubmitRating}
         className="font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 text-base px-6 py-2 rounded-md transition-transform transform hover:scale-105 hover:from-pink-600 hover:to-orange-600"
          >
          Submit Rating
        </button>
      </div>
      <GeneralFooter />
    </div>
  );
};

export default CourseCompletion;
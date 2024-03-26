import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Navigation
import { checkScreen } from "./CourseNavigation";

const CourseCreation = () => {

  // Hooks
  const navigate = useNavigate();
  const { screen } = useParams();

  // Function to switch screens
  const switchScreen = (switchTo) => {
    navigate('/profile/courseEditing/createCourse/' + switchTo);
  }

  // useEffect to handle initial screen setup
  useEffect(() => {
    if (!screen) {
      navigate('/profile/courseEditing/createCourse/homePage');
    }

  }, []);

  return (
    <div>
      {/* Sidebar */}
      <div className="flex items-start justify-between mx-auto px-20">
        <div style={{ userSelect: 'none' }} className="w-[300px] flex flex-col justify-between min-h-[90vh] py-10 transition-all">
          {/* First Impressions Section */}
          <div>
            <div className="">
              <div className="pb-3">
                <p className="font-semibold">First Impressions</p>
              </div>
              <div className="text-stone-600 font-light flex flex-col space-y-2">
                <p
                  onClick={() => switchScreen('homePage')}
                  className={`border-l-4 ${(screen === 'homePage') ? "border-stone-500" : "border-transparent hover:border-stone-300"} pl-2 cursor-pointer`}>Course Homepage</p>
                <p
                  onClick={() => switchScreen('objectives')}
                  className={`border-l-4 ${(screen === 'objectives') ? "border-stone-500" : "border-transparent hover:border-stone-300"} pl-2 cursor-pointer`}>Objectives</p>
              </div>
            </div>
            {/* Course Content Section */}
            <div className="mt-3">
              <div className="pb-3">
                <p className="font-semibold">Course Content</p>
              </div>
              <div className="text-stone-600 font-light flex flex-col space-y-2">
                <p
                  onClick={() => switchScreen('programme')}
                  className={`border-l-4 ${(screen === 'programme') ? "border-stone-500" : "border-transparent hover:border-stone-300"} pl-2 cursor-pointer`}>Course programme</p>
                <p
                  onClick={() => switchScreen('prices')}
                  className={`border-l-4 ${(screen === 'prices') ? "border-stone-500" : "border-transparent hover:border-stone-300"} pl-2 cursor-pointer`}>Prices</p>
              </div>
            </div>
          </div>

          {/* Progress and Save Section */}
          <div className="w-[80%] my-3 ">
            <div className="text-blue-400 font-semibold flex justify-between ">
              <p className="">Complete</p>
              <p>50%</p>
            </div>
            <div className="w-full h-1 bg-stone-300 rounded-full">
              <div className="w-[50%] h-full bg-blue-400 rounded-full"></div>
            </div>
            <div className="mt-4">
              <button className="bg-blue-400 hover:bg-blue-500 min-w-[80%] text-white font-semibold p-1 rounded-sm">
                Save Course
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-[calc(100vw-300px)] min-h-[100vh]  p-8">
          <div className="bg-white min-h-[90vh] w-full shadow-md border">
            {checkScreen(screen)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreation;
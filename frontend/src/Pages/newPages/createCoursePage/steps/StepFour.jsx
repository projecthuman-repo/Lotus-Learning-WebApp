import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams  } from 'react-router-dom';

const StepFour = ({ setNewCourseObj, newCourseObj, sendNewCourse, handlePopupClose }) => {
  const { step } = useParams();
  const navigate = useNavigate(); 
  const [showSuccess, setShowSuccess] = useState(false);

  const SuccessPopup = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
          <p className="font-semibold text-green-600 text-lg">
            Course created successfully!
          </p>
          <button onClick={handlePopupClose}>OK</button>
        </div>
      </div>
    );
  };

  const goPrevPage = () => {
    const nextStep = parseInt(step) - 1;
    navigate(`/create-new-course/${nextStep}`);
  };

  const handleFinish = async () => {
    
    await sendNewCourse(); // Save course and trigger popup in parent
  };

  const updateAge = (newCategoriesValue) => {
    setNewCourseObj(prevState => ({
      ...prevState,
      age: newCategoriesValue
    }));
  };

  return (
    <>
      <div className="h-[calc(90vh-65px)] w-full  flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="font-semibold text-3xl text-stone-800">
            Let us make our first impressions
          </p>
          <p className="text-sm font-light mt-2">
            This is only temporary, you can change it whenever you want
          </p>
          <div className="w-[550px] mt-3">
            <p className="my-1 font-light text_linearGradient_ver1">{newCourseObj.age && newCourseObj.age}</p>
            <ComplexBar setComplexity={updateAge} complex={newCourseObj.age}/>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full h-[65px] border-t flex justify-between px-4 items-center">
        <button onClick={() => goPrevPage()} className={`px-2 py-1 font-semibold text-stone-500 linearGradient_ver1 text-white rounded-sm`}>
          Back
        </button>
        <p className="font-semibold text-sm">{step}/4</p>
        <button
          onClick={handleFinish}
          className={`px-2 py-1 font-semibold linearGradient_ver1 text-white`}
        >
          Finish
        </button>
      </div>

    </>
  );
};

const ComplexBar = ({ setComplexity, complex }) => {
  const cursorRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(50); 
  const [holding, setHolding] = useState(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    setHolding(true);
    const containerWidth = cursorRef.current.parentElement.offsetWidth;
    const newPosition = Math.max(0, Math.min(e.clientX - cursorRef.current.parentElement.offsetLeft, containerWidth));
    setCursorPosition((newPosition / containerWidth) * 100);
  };

  const handleMouseUp = () => {
    setHolding(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const proximityCheck = (pointer) => {
    let distance = [];
    for (let i = 0; i <= 100; i += 25) {
      distance.push(Math.abs(pointer - i));
    }
    const closestPosition = distance.indexOf(Math.min(...distance));
    checkFinalResult(closestPosition * 25);
    return closestPosition * 25;
  };

  const checkFinalResult = (value) => {
    switch (value) {
      case 0:
        setComplexity('Easy (8-10)');
        break;
      case 25:
        setComplexity('Medium (11-13)');
        break;
      case 50:
        setComplexity('Intermediate (13-15)');
        break;
      case 75:
        setComplexity('Advanced (16-19)');
        break;
      case 100:
        setComplexity('Innovative (20+)');
        break;
      default:
        setComplexity('NaN');
        break;
    }
  };

  useEffect(() => {
    if (!holding) {
      setCursorPosition(proximityCheck(cursorPosition));
    }
  }, [cursorPosition, holding]);

  useEffect(() => {
    switch (complex) {
      case 'Easy (8-10)':
        setCursorPosition(0);
        break;
      case 'Medium (11-13)':
        setCursorPosition(25);
        break;
      case 'Intermediate (13-15)':
        setCursorPosition(50);
        break;
      case 'Advanced (16-19)':
        setCursorPosition(75);
        break;
      case 'Innovative (20+)':
        setCursorPosition(100);
        break;
      default:
        setComplexity('NaN');
        break;
    }
  }, [complex]);

  return (
    <div className="w-full h-1 bg-red-100 relative" ref={cursorRef}>
      {/* Bar sections */}
      {[0, 25, 50, 75, 100].map((pos) => (
        <div
          key={pos}
          onClick={() => setCursorPosition(pos)}
          className={`bg-transparent h-2 absolute w-[${pos === 100 ? '10' : '15'}%] -top-1/2 left-[${pos}%] transform -translate-x-1/2 z-10 cursor-pointer flex items-center justify-center`}
        >
          <div className="linearGradient_ver1 h-2 w-1 rounded-sm" />
        </div>
      ))}

      {/* Cursor */}
      <div
        style={{ left: cursorPosition + '%' }}
        onMouseDown={handleMouseDown}
        className='bg-transparent absolute w-[15%] top-[50%] z-20 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'
      >
        <div className="linearGradient_ver1 h-4 w-3 arrow" />
      </div>
    </div>
  );
};

export default StepFour;

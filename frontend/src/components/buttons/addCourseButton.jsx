import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddCourseButton = () => {
  const navigate = useNavigate();

  return (
    <button
        onClick={() => navigate("/course")}
        className="font-semibold text-white linearGradient_ver1 text-sm px-3 py-2 rounded-full"
    >
    +
    </button>
  );
};

export default AddCourseButton;
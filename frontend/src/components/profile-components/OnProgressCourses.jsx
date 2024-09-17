import React, { useEffect, useRef, useState } from 'react';
import { HiArrowRight } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiTrash } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const OnProgressCourses = ({ id, progress, title }) => {
  const divRef = useRef(null);
  const navigate = useNavigate();
  const [openOptions, setOpenOptions] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setOpenOptions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClick = (event) => {
    if (divRef.current && divRef.current.contains(event.target)) {
      return;
    } else {
      navigate(`/course/learn?id=${id}`);
    }
  }

  return (
    <div onClick={(e) => handleClick(e)} className='cursor-pointer w-full bg-white border p-2 relative no-select'>
      <div className='flex items-center justify-between space-x-2 h-full'>
        <img className='md:h-[90px] md:w-[180px] h-[70px] w-[130px] object-cover rounded-md' src='https://contenthub-static.grammarly.com/blog/wp-content/uploads/2023/07/Subject-Complement.png'/>
        <div className='flex flex-col justify-between items-end h-full py-1'>
          <div ref={divRef}>
            <div className={`rounded-full p-1 ${openOptions && 'bg-stone-100'}`} onClick={() => setOpenOptions(!openOptions)}>
           {  /* <BsThreeDotsVertical />*/}
            </div>
            <div className={`absolute right-1 top-10 bg-white border rounded-md z-50 ${openOptions ? 'block' : 'hidden'} p-2 space-y-2`}>
              <p className='text-xs flex items-center text-stone-600 hover:text-amber-500'><CiStar className='mr-1' />add to favorites</p>
              <p className='text-xs flex items-center text-stone-600 hover:text-red-500'><CiTrash className='mr-1' />remove course</p>
            </div>
          </div>
          <div>
            <p className='font-light text_linearGradient_ver1 text-end text-xs'>{title} - {progress.toFixed(2)}%</p>
            <p className='font-light text-stone-500 text-end md:text-sm text-xs flex justify-end items-center hover:underline'>{title} <HiArrowRight className='ml-1' /></p>
          </div>
        </div>
      </div>
      <div className='h-1 rounded-sm mb-1 overflow-hidden bg-stone-200'>
        <div className='h-full linearGradient_ver1 rounded-full' style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default OnProgressCourses;

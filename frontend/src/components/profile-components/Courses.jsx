import React, { useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
import styles from '../../Styles';
import OnProgressCourses from './OnProgressCourses';

const Courses = ({ courses }) => { 
  
  const [searchInput, setSearchInput] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);

    
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(value)
    );
    setFilteredCourses(filtered);
  };


  useEffect(() => {
    if (!searchInput) {
      setFilteredCourses(courses);
    }
  }, [courses, searchInput]);

  return (
    <div className='w-full min-h-[70vh] p-2'>
      <div className={`flex items-center justify-between mb-2`}>
        <div>
          <p className='font-semibold text-stone-600'>
            On progress courses
          </p>
        </div>
        <div className={`flex items-center justify-between w-[250px] ${styles.simple_text_input} bg-white`}>
          <input
            type="text"
            placeholder='Search Course'
            className='w-full focus:outline-none text-sm'
            value={searchInput} // Bind search input value
            onChange={handleSearchChange} // Handle search input changes
          />
          <IoIosSearch className='ml-2' />
        </div>
      </div>
      <div className='grid md:gap-1 gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
        {filteredCourses && filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <OnProgressCourses
              key={course._id}
              id={course._id}
              progress={course.progress} 
              title={course.title}
            />
          ))
        ) : (
          <p className='text-center text-gray-500'>No courses available.</p>
        )}
      </div>
    </div>
  );
}

export default Courses;

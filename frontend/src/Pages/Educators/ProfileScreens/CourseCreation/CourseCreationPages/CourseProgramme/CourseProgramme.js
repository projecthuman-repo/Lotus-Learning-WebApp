import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import ClassEditor from "./components/ClassEditor";

import "./CourseProgramme.css";

const CourseProgramme = () => {
  // State for search input and courses
  const [searchValues, setSearchValues] = useState('');
  const [courses, setCourses] = useState([
    {
      id: 0,
      title: "Class 01",
      description: "Course Description 01",
      filename: undefined,
      type: undefined,
      attachedFile: undefined,
    },
  ]);

  // Function to add a new class to the courses list
  const addNewClass = () => {
    const coursesList = courses.slice();
    const timeAsId = new Date().toISOString();
    coursesList.push({
      id: timeAsId,
      title: 'Your class title',
      description: '',
      filename: undefined,
      type: undefined,
      attachedFile: undefined,
    });
    setCourses([...coursesList]);
  }

  // Function to filter courses by title based on search term
  const filterByTitle = (objectList, searchTerm) => {
    // If the search term is an empty string, return all objects
    if (searchTerm === '') {
      return objectList;
    }
    // Filter by title otherwise
    const results = objectList.filter(object =>
      object.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return results;
  }

  return (
    <div className="p-3 bg-white h-full ">
      <div className="flex items-center justify-between">
        
        {/* Course Program Header */}
        <div>
          <p className="font-semibold test-stone-700 text-lg">Course Program </p>
          <p style={{ userSelect: 'none' }} onClick={() => addNewClass()} className={`font-ligth test-stone-700 text-sm hover:underline cursor-pointer `}>+  Add new class </p>
        </div>
        
        {/* Search Input */}
        <div className="relative w-[200px]">
          <input
            value={searchValues}
            onChange={(e) => setSearchValues(e.target.value)}
            placeholder="look for a course"
            className="pl-3 pr-9 py-1  border rounded-full focus:outline-none w-full"
          />

          <IoIosSearch className="bg-white text-stone-600 text-2xl absolute  top-1/2 transform -translate-x-1/2 -translate-y-1/2 left-[90%]" />
        </div>
      </div>

      {/* Course List */}
      <div className="w-full min-h-[500px]  mt-4 border shadow-md">
        {filterByTitle(courses, searchValues).map((item, i) => {
          return (
            <div key={item.title + i}>
              {/* Class Editor Component */}
              <ClassEditor
                courseIndex={i}
                course={item}
                setCourses={setCourses}
              />
            </div>
          );
        })}
        
        {/* Add New Class Button */}
        <div onClick={() => addNewClass()} style={{ userSelect: 'none' }} className="w-full h-[70px] text-stone-700 hover:bg-stone-50 flex items-center justify-center cursor-pointer">
          <MdAdd  className="text-xl"/>
          <p className="font-medium text-sm">Add a new class</p>
        </div>
      </div>
    </div>
  );
};

export default CourseProgramme;

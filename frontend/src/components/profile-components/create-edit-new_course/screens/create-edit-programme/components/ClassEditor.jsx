import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoTrashBinSharp } from "react-icons/io5";
import ClassMedia from "./ClassMedia.jsx";
import ClassInputs from "./ClassInputs.jsx";
import ClassExtraActivities from "./ClassExtraActivities.jsx";
import OnHoverExtraHud from "../../../../../OnHoverExtraHud.jsx";

const ClassEditor = ({ course, setCourses, courseIndex }) => {
  // State variables
  const [opened, setOpened] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [clonedCourse, setClonedCourse] = useState(course);
  const [updatingMedia, setUpdatingMedia] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    type: course.type,
    file: course.attachedFile,
    filename: course.filename,
  });

  // Effect to check if the course has been updated
  useEffect(() => {
    if (JSON.stringify(clonedCourse) === JSON.stringify(course)) {
      setUpdating(false);
    } else {
      setUpdating(true);
    }
  }, [clonedCourse]);

  // Effect to handle selected file changes
  useEffect(() => {
    if (selectedFile.file === undefined || selectedFile.file === null) {
      setUpdatingMedia(true);
    } else {
      setClonedCourse((prevValue) => {
        return {
          ...prevValue,
          attachedFile: selectedFile.file,
          type: selectedFile.type,
          filename: selectedFile.filename,
        };
      });
    }
  }, [selectedFile]);

  // Save changes to the course
  const handleSave = () => {
    if(hasEmptyOrNullValues(clonedCourse)) {
      return
    }
    setCourses((prevValue) => {  
      const prevValues = [...prevValue.lessons];
      prevValues[courseIndex] = {
        ...clonedCourse,
      };
      return {
        ...prevValue,
        lessons: prevValues,
      };
    });
    setUpdating(false);
  };

  // Discard changes and reset to the original course
  const discardChanges = () => {
    setClonedCourse(course);
    if (course.attachedFile === undefined || course.attachedFile === null) {
      setUpdatingMedia(true);
    }else{
      setUpdatingMedia(false);

    }
  };

  const hasEmptyOrNullValues = (object) => {
    const isEmptyOrNull = (value) => {
      return value === "" || value === null || value === undefined;
    };
    for (const key in object) {
      if (key !== "extraActivities" && isEmptyOrNull(object[key])) {
        return true; // Retorna true si encuentra un valor vacío o nulo
      }
    }
    return false; // Retorna false si no hay valores vacíos o nulos
  };

  // Replace the input file for the class
  const replaceInputFile = () => {
    setUpdatingMedia(true);

    setClonedCourse((prevValue) => {
      return {
        ...prevValue,
        filename: undefined,
        type: undefined,
        attachedFile: undefined,
      };
    });
  };

  // Delete the class
  const deleteClass = () => {
    setCourses((prevValue) => {
      const coursesList = [...prevValue.lessons];
      coursesList.splice(courseIndex, 1);

      return {
        ...prevValue,
        lessons: [...coursesList],
      };
    });
  };

  // Check for missing values in the course object
  const checkMisingValues = (obj) => {
    const checker = Object.values(obj).some(
      (value) => value === null || value === undefined || value === ""
    );
    return checker;
  };

  useEffect(() => {
    console.log(updatingMedia);
  },[updatingMedia])

  return (
    <div style={{ userSelect: "none" }} className=" cursor-pointer border-b">
      {/* Toggle to open/close class editor */}
      <div
        onClick={() => setOpened(!opened)}
        className={`flex items-center justify-between hover:bg-stone-50 p-3 ${
          opened ? "border-b" : ""
        }`}
      >
        {/* Display class title and error icon if there are missing values */}
        <div className="flex items-center space-x-2">
          <p>{course.title}</p>
          {checkMisingValues(course) && (
            <RiErrorWarningFill className="text-red-500" />
          )}
        </div>
        {/* Toggle arrow icon based on open/closed state */}
        {opened ? (
          <MdKeyboardArrowUp className="text-2xl" />
        ) : (
          <MdKeyboardArrowDown className="text-2xl" />
        )}
      </div>

      {/* Display class editor content when opened */}
      <div
        style={opened ? { height: "auto" } : { height: "0px", display: "none" }}
        className="transition-all w-full bg-white overflow-hidden p-3"
      >
        {/* Class Information Section */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium inline-block">Class Information</p>
          {/* Delete class button */}
          <div
            onClick={() => deleteClass()}
            className="p-2 rounded-full hover:bg-stone-50  hover-parent"
          >
            <OnHoverExtraHud name="Delete"/>
            <IoTrashBinSharp className="text-lg " />
          </div>
        </div>

        {/* Title Input */}
        <div className="flex flex-row items-center my-2 space-x-2">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium inline-block">Title</p>
            {(clonedCourse.title === undefined ||
              clonedCourse.title === null ||
              clonedCourse.title === "") && (
              <RiErrorWarningFill className="text-red-500" />
            )}
          </div>
          <ClassInputs
            variableName="title"
            value={clonedCourse.title}
            index={courseIndex}
            setValue={setClonedCourse}
          />
        </div>

        {/* Description Input */}
        <div className="flex flex-col my-2">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium inline-block">Description</p>
            {(clonedCourse.description === undefined ||
              clonedCourse.description === null ||
              clonedCourse.description === "") && (
              <RiErrorWarningFill className="text-red-500" />
            )}
          </div>
          <ClassInputs
            inputRows={4}
            variableName="description"
            value={clonedCourse.description}
            index={courseIndex}
            setValue={setClonedCourse}
          />
        </div>

        {/* Class Media Section */}
        <div className="flex items-center space-x-2 mb-1">
          <p className="text-sm font-medium inline-block">Class Media</p>
          {(clonedCourse.attachedFile === undefined ||
            clonedCourse.attachedFile === null) && (
            <RiErrorWarningFill className="text-red-500" />
          )}
        </div>

        {/* Display ClassMedia component or file details */}
        {updatingMedia ? (
          <ClassMedia
            setUpdatingMedia={setUpdatingMedia}
            setSelectedFile={setSelectedFile}
          />
        ) : (
          <div className="flex flex-col">
              <div className="flex items-center justify-between space-x-4 border p-3">
                {/* Display file details */}
                <div className="flex flex-col w-[40%]">
                  <p className="text-sm font-medium inline-block">File Name</p>
                  <p className="inline-block text-sm">
                    {clonedCourse.attachedFile && clonedCourse.filename}
                  </p>
                </div>
                <div className="flex flex-col ">
                  <p className="text-sm font-medium inline-block">File type</p>
                  <p className="inline-block ">
                    {clonedCourse.attachedFile && clonedCourse.type}
                  </p>
                </div>
                {/* Replace input file button */}
                <div className="flex flex-col relative overflow-hidden cursor-pointer">
                  <button
                    onClick={() => replaceInputFile()}
                    className="px-2 py-1 font-medium bg-stone-700 text-stone-50 hover:text-stone-200"
                  >
                    Replace
                  </button>
                </div>
              </div>
          </div>
        )}
        <div className="flex flex-col items-start  mb-1 mt-3">
          <p className="text-sm font-medium inline-block">Extra Activities </p>
          <div className="w-full">
            <ClassExtraActivities
              course={clonedCourse}
              setCourses={setClonedCourse}
              lessonIndex={courseIndex}
            />
          </div>
        </div>
        {/* Display save and discard buttons when updating */}
        {updating && (
          <div className="w-full flex items-center justify-end my-3 space-x-2">
            {/* Save changes button */}
            <button
              onClick={() => handleSave()}
              className={` font-medium text-stone-50 px-2 py-1 flex items-center transition-all ${hasEmptyOrNullValues(clonedCourse)? 'bg-stone-400' : 'linearGradient_ver1'}`}
            >
              {
                hasEmptyOrNullValues(clonedCourse)&&
               <RiErrorWarningFill className="text-stone-50 mr-1" />
              }
              Save
            </button>
            {/* Discard changes button */}
            <button
              onClick={() => discardChanges()}
              className="text-stone-700 font-medium border px-2 py-1"
            >
              Discard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassEditor;

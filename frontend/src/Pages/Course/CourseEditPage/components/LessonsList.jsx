import React, { useEffect, useState } from "react";
import { IoAlert,IoReturnDownBackSharp, IoAdd, IoClose } from "react-icons/io5";
import { BsCheck } from "react-icons/bs";
import updateCourseDataProxy from "../../../../BackendProxy/courseProxy/updateCourseData";
import GenericNotification from "../../../../components/fullscreen-notifications/GenericNotification";
import SpinnerLoader from "../../../../components/loaders/SpinnerLoader";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import getCourseData from "../../../../BackendProxy/courseProxy/getCourseData";



const LessonsList = ({
  setBaseCourseData,
  baseCourseData,
  lesson,
  changed,
  courseData,
  lessons,
  updateLessons,
  setSelectedLesson,
}) => {
  const { courseid } = useParams();
  const navigate = useNavigate();


  



  const returnToCourseMenu = () => {
    navigate("/course-editor/homePage/" + courseid);
  };

  const [loading, setLoading] = useState(false);
  const [openNotificationMessage, setOpenNotificationMessage] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const [popupMessage, setPopupMessage] = useState(""); 
  const [openPopup, setOpenPopup] = useState(false);

  const newObjetTemp = {
    attachedFile: "",
    description: " ",
    extraActivities: [],
    filename: "",
    title: "Lesson Title",
    type: "",
    lessonContent: {
      base_content: {
        material_id: "",
        text: "",
      },
      type: "",
      media: "",
      linked_game: {
        type: "",
        content: "",
        game_id: "",
      },
    },
  };

  const fetchCourseDataFromDB = async (courseId) => {
    try {
      
      const response = await axios.get(`https://lotuslearning.world/course/get-course-data/${courseId}`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching course data", error);
      throw error; 
    }
  };

  const handleAddNewLesson = () => {
    updateLessons([...lessons, newObjetTemp]);
    setSelectedLesson(lessons.length);
    
  };

  
  const handleSave = async () => {
    if (validateLessons(lessons)) {
      setLoading(true);
      try {
        // Try saving the course data
        const res = await updateCourseDataProxy(courseData);

        
        // Refetch the document to get the latest version after saving
        const updatedCourseData = await getCourseData(courseid);
        setBaseCourseData(updatedCourseData); // Update your state with the new course data
        
        //window.alert("Saved successfully");

        setLoading(false);
        setPopupMessage("Changes saved successfully!");
        setOpenPopup(true); 
        setHasChanges(false); 
      } catch (error) {
        setLoading(false);
        
        // Check if the error is a version mismatch
        if (error.name === 'VersionError') {
          // Ignore the version error as a failure if the save was still successful
          window.alert("Saved successfully");
          
          // Refetch the latest version to avoid further version conflicts
          const updatedCourseData = getCourseData(courseid);
          setBaseCourseData(updatedCourseData);
        } else {
          // Handle any other errors
          window.alert("Failed to save. Please try again.");
          console.error("Error saving to DB or fetching the updated course", error);
        }
      }
    } else {
      setOpenNotificationMessage(true); 
    }
  };
  

  

  function validateLessons(arr) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      console.log("lessonType" + item.lessonContent.type);
      if (item.lessonContent.type === "") {
        return false;
      }
      if(!item.lessonContent.type){
        return false;
      }
      if (item.lessonContent.type === "game") {
        const { linked_game } = item.lessonContent;
        if (!linked_game.type || !linked_game.gameRes.game.game_id) {
          return false;
        }
      }
    }

    return true;
  }

  return (
    <div className="w-[450px] cursor-default no-select">
      {openNotificationMessage && (
        <GenericNotification
          setOpen={setOpenNotificationMessage}
          secondaryMessage={"They are marked on the side bar"}
          mainMessage={"You have some uncompleted courses"}
        />
      )}
      
      {openPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <p className="font-semibold text-green-600 text-lg">
              {popupMessage}
            </p>
            <button
              onClick={() => setOpenPopup(false)}
              className="px-6 py-2 bg-indigo-500 text-white rounded-full font-medium shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
      <div className="w-full h-[2rem] border-r flex items-center justify-between px-2">
        <div
          onClick={() => returnToCourseMenu()}
          className="flex items-center hover-parent cursor-pointer bg-stone-100 px-2 text-lg hover:scale-[1.08] transition-all rounded-full"
        >
          <IoReturnDownBackSharp />
          <p className="text-xs ml-2 font-semibold">return</p>
        </div>
      </div>

      <div className="w-full h-[2rem] border-r flex items-center justify-between px-2">
        <div className="px-2 w-half border-r">
          <p className="font-light text-sm py-1 text-stone-400">Editing mode</p>
        </div>
        <div
          onClick={() => handleAddNewLesson()}
          className=" cursor-pointer font-semibold px-3 rounded-full py-1 text-white linearGradient_ver1 flex items-center hover:scale-[1.02] transition-all "
        >
          <p className="text-sm">Add Lesson</p>
          <IoAdd className="ml-2" />
        </div>
      </div>

      {changed && (
        <div className="pl-2 flex space-x-2">
          {loading ? (
            <SpinnerLoader />
          ) : (
            <>

              <button
                className="flex items-center px-2 linearGradient_ver1 rounded-full hover:scale-[1.01] transition-all"
                onClick={() => handleSave()}
              >
                <span className="text-white">Save</span>

                <BsCheck className="ml-1 text-white" />
              </button>
              <button className="flex items-center px-2 bg-stone-50 rounded-full hover:scale-[1.01] transition-all">
                <span className="font-semibold">Discard</span>
                <IoClose className="ml-1" />
              </button>
            </>
          )}
        </div>
      )}



      <div className="w-full h-[calc(100vh-4rem)] overflow-y-auto border-r relative no-select border-t">
        {lessons.map((item, i) => {
          return (
            <div key={item._id}>
              <LessonItem
                newObjetTemp={newObjetTemp}
                handleAddNewLesson={handleAddNewLesson}
                setSelectedLesson={setSelectedLesson}
                lessons={lessons}
                lesson={item}
                updateLessons={updateLessons}
                i={i}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LessonItem = ({
  newObjetTemp,
  setSelectedLesson,
  lessons,
  lesson,
  updateLessons,
  i,
}) => {
  const handleRemove = () => {
    const newArr = lessons.filter((_, index) => index !== i);
    if (newArr.length === 0) {
      setSelectedLesson(0);
      newArr.push(newObjetTemp);
      updateLessons(newArr);
    }
    setSelectedLesson(0);
    updateLessons(newArr);
  };

  const validateLesson = (item) => {
    if (!item.lessonContent || item.lessonContent.type === "") {
      return false;
    }

    if (item.lessonContent.type === "game") {
      if (!item.lessonContent.linked_game) {
        return false;
      }
      const { linked_game } = item.lessonContent;
      if (!linked_game.gameRes) {
        return false;
      }
      if (!linked_game.type || !linked_game.gameRes.game.game_id) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="w-full h-[4rem] mb-[0.1rem] flex items-center justify-between px-3 border-b cursor-pointer hover:bg-stone-50 transition-all">
      <div
        onClick={() => setSelectedLesson(i)}
        className="h-full flex items-center w-full"
      >
        <p className="text-stone-700">
          {i + 1}. {lesson.title}
        </p>
        {!validateLesson(lesson) && (
          <div className="text-red-500 text-xs bg-red-200 p-1 ml-1 rounded-full">
            <IoAlert />
          </div>
        )}
      </div>
      <div onClick={handleRemove} className="hover:bg-stone-200 rounded-full p-1">
        <IoClose />
      </div>
    </div>
  );
};

export default LessonsList;
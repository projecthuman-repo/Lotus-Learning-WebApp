import React, { useEffect, useState } from "react";
import { BiExit } from "react-icons/bi";
import logo from "../../../Images/lotusletters.webp";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFour from "./steps/StepFour";
import createNewCourseProxy from "../../../BackendProxy/courseProxy/createNewCourse";
import SpinnerLoader from "../../../components/loaders/SpinnerLoader";

const CreateNewCourse = () => {
  const authUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { step } = useParams();
  const [popupVisible, setPopupVisible] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newCourseObj, setNewCourseObj] = useState({
    title: "",
    description: "",
    categories: [],
    age: "Intermediate (13-15)",
    objectives: {
      one: "",
      two: "",
      three: "",
    },
    creator: {
      username: authUser.username,
      code: authUser.institution.code,
      institutionName: authUser.institution.institutionName,
      accountType: authUser.accountType,
      email: authUser.email,
    },
  });

  const sendNewCourse = async () => {
    if (!loading) {
      setLoading(true);
      try {
        const response = await createNewCourseProxy(newCourseObj);
        setCourseId(response.data.savedData._id); 
        setPopupVisible(true); 
      } catch (error) {
        console.error("Error creating course", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePopupClose = () => {
    setPopupVisible(false); 
    if (courseId) {
      navigate("/course-editor/homePage/" + courseId); 
    }
  };

  useEffect(() => {
    if (!step) {
      navigate("/create-new-course/1");
    }
    stepFlowMannager();
  }, [step]);

  const changeScreen = (step) => {
    switch (step) {
      case "1":
        return (
          <StepOne
            newCourseObj={newCourseObj}
            setNewCourseObj={setNewCourseObj}
          />
        );
      case "2":
        return (
          <StepTwo
            newCourseObj={newCourseObj}
            setNewCourseObj={setNewCourseObj}
          />
        );
      case "3":
        return (
          <StepThree
            newCourseObj={newCourseObj}
            setNewCourseObj={setNewCourseObj}
          />
        );
      case "4":
        return (
          <StepFour
            newCourseObj={newCourseObj}
            setNewCourseObj={setNewCourseObj}
            sendNewCourse={sendNewCourse}
            handlePopupClose={handlePopupClose}
          />
        );
      default:
        return (
          <StepOne
            newCourseObj={newCourseObj}
            setNewCourseObj={setNewCourseObj}
          />
        );
    }
  };

  const stepFlowMannager = () => {
    const firstStepCheck = () => {
      if (
        !newCourseObj.title ||
        !newCourseObj.description ||
        newCourseObj.title.trim() === "" ||
        newCourseObj.description.trim() === ""
      ) {
        navigate("/create-new-course/1");
        return;
      }
    };
    const secondStepCheck = () => {
      if (newCourseObj.categories.length <= 0) {
        navigate("/create-new-course/2");
        return;
      }
    };
    const thirdCheck = () => {
      const allObjectivesEmpty = Object.values(newCourseObj.objectives).every(
        (obj) => obj.trim() === ""
      );
      if (allObjectivesEmpty) {
        navigate("/create-new-course/3");
      }
    };
    switch (step) {
      case "2":
        firstStepCheck();
        break;
      case "3":
        firstStepCheck();
        secondStepCheck();
        break;
      case "4":
        firstStepCheck();
        secondStepCheck();
        thirdCheck();
        break;
      default:
        return;
    }
  };

  const progressBar = (value, total) => {
    return (value * 100) / total;
  };

  const handleExit = () => {
    navigate("/");
  };

  return (
    <>
      <div className="h-screen">
        <div className="w-full h-[65px] ">
          <div className="w-full h-full bg-white border-b  flex justify-between items-center px-3">
            <div className="h-full">
              <img src={logo} className="h-full p-3 " alt="Logo" />
            </div>
            <div>
              <button
                className="bg-white text-stone-600 rounded-full flex items-center space-x-2 hover:text-stone-700"
                onClick={handleExit}
              >
                <p className="font-semibold text-base"> Exit </p>
                <BiExit />
              </button>
            </div>
          </div>
          <div className="h-[.15rem] bg-stone-100">
            <div
              style={{ width: progressBar(step, 4) + "%" }}
              className=" h-full linearGradient_ver1 transition-all"
            ></div>
          </div>
        </div>
        {/* sections */}
        {loading ? (
          <div className="h-[calc(90vh-65px)] w-full flex items-center justify-center">
            <SpinnerLoader />
          </div>
        ) : (
          changeScreen(step)
        )}

        
{popupVisible && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <p className="font-semibold text-green-600 text-lg mb-4">
        Course saved successfully!
      </p>
      <button
        onClick={handlePopupClose}
        className="px-6 py-2 bg-indigo-500 text-white rounded-full font-medium shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 cursor-pointer"
      >
        OK
      </button>
    </div>
  </div>
)}

      </div>
    </>
  );
};

export default CreateNewCourse;

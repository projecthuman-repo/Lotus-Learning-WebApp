import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StepThree = ({ setNewCourseObj, newCourseObj }) => {
  const [done, setDone] = useState(false);
  const { step } = useParams();
  const navigate = useNavigate(); // Obtén el objeto history

  const goNextPage = () => {
    if (!done) {
      return;
    }
    const nextStep = parseInt(step) + 1;
    navigate(`/create-new-course/${nextStep}`);
  };
  const goPrevPage = () => {
    const nextStep = parseInt(step) - 1;
    navigate(`/create-new-course/${nextStep}`);
  };

  useEffect(() => {
    if (newCourseObj.objectives.one.length > 0 || newCourseObj.objectives.two.length > 0 || newCourseObj.objectives.three.length > 0) {
        setDone(true);
    } else {
      setDone(false);
    }
  }, [newCourseObj]);

  return (
    <>
      <div className="h-[calc(90vh-65px)] w-full  flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="font-semibold text-3xl text-stone-800">
            Define where you will take your learners with this course.
          </p>
          <p className="text-sm font-light mt-2">
            This is only temporary, you can change it whenever you want
          </p>
          <div className="flex flex-col mt-5 w-[400px]">
            <input
              onChange={(e) =>
                setNewCourseObj({
                  ...newCourseObj,
                  objectives:  {
                    ...newCourseObj.objectives,
                    one: e.target.value
                  },
                })
              }
              value={
                newCourseObj.objectives.one
              }
              placeholder="Objective one"
              className="py-1 px-2 focus:outline-none border "
            />
          </div>
          <div className="flex flex-col mt-1 w-[400px]">
            <input
              onChange={(e) =>
                setNewCourseObj({
                  ...newCourseObj,
                  objectives:  {
                    ...newCourseObj.objectives,
                    two: e.target.value
                  },
                })
              }
              value={
                newCourseObj.objectives.two
              }

              placeholder="Objective two"
              className="py-1 px-2 focus:outline-none border "
            />
          </div>
          <div className="flex flex-col mt-1 w-[400px]">
            <input
              onChange={(e) =>
                setNewCourseObj({
                  ...newCourseObj,
                  objectives:  {
                    ...newCourseObj.objectives,
                    three: e.target.value
                  },
                })
              }
              value={
                newCourseObj.objectives.three
              }
              placeholder="Objective three"
              className="py-1 px-2 focus:outline-none border "
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full h-[65px] border-t flex justify-between px-4 items-center">
        <button onClick={() => goPrevPage()}className={`px-2 py-1  font-semibold text-stone-500 linearGradient_ver1 text-white rounded-sm`}>
          go Back
        </button>
        <p className="font-semibold text-sm">{step}/4</p>
        <button
          onClick={() => goNextPage()}
          className={`px-2 py-1 border font-semibold text-stone-500 ${
            done ? "linearGradient_ver1 text-white" : ""
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default StepThree;

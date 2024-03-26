import React, { useState } from "react";


const CreateEditObjectives = ({courseData, setCourseData}) => {
  // State to manage main objectives and requirements
  const [objectives, setObjectives] = useState({
    objtv1: "",
    objtv2: "",
    objtv3: "",
  });
  const [requirements, setRequirements] = useState("");



  // Reset objectives and requirements to initial state
  const resetValues = () => {
    setObjectives({
      objtv1: "",
      objtv2: "",
      objtv3: "",
    });
    setRequirements("");
  };

  return (
    <div className="p-3 bg-white">
      {/* Course Objectives Section */}
      <div className="mb-4">
        <p className="font-semibold text_linearGradient_ver1 text-lg">
          Course Objectives
        </p>
      </div>
      <p className="font-semibold text-stone-700">Main Objectives</p>
      <p className="font-light text-stone-400 mt-1 mb-2">
        Direction is key: define where you will take your learners with this
        course.
      </p>
      <div className="flex flex-col space-y-2">
        {/* Input fields for objectives */}
        <input
          placeholder="Objective 1"
          className="focus:outline-none p-2 border w-full"
          value={courseData.objectives.one}
          onChange={(e) => {
            setCourseData((prevObjectives) => ({
              ...prevObjectives,
              objectives: {
                ...prevObjectives.objectives, 
                one: e.target.value
              },
            }));
          }}
        />
        <input
          placeholder="Objective 2"
          className="focus:outline-none p-2 border w-full"
          value={courseData.objectives.two}
          onChange={(e) => {
            setCourseData((prevObjectives) => ({
              ...prevObjectives,
              objectives: {
                ...prevObjectives.objectives, 
                two: e.target.value
              },
            }));
          }}
        />
        <input
          placeholder="Objective 3"
          className="focus:outline-none p-2 border w-full"
          value={courseData.objectives.three}
          onChange={(e) => {
            setCourseData((prevObjectives) => ({
              ...prevObjectives,
              objectives: {
                ...prevObjectives.objectives, 
                three: e.target.value
              },
            }));
          }}
        />
      </div>
      <p className="text-xs font-light text-stone-400 mt-1">
        Give your learners 3 objectives.
      </p>

      {/* Requirements Section */}
      <p className="font-semibold text-stone-700 mt-4">Any requirements?</p>
      <p className="font-light text-stone-400 mt-1 mb-2">
        Tell your students if there are any prerequisites or how easy this
        course is for beginners.
      </p>
      {/* Textarea for requirements with word count limit */}
      <textarea
        rows="6"
        placeholder="Enter your course description..."
        className="focus:outline-none p-2 border w-full"
        value={requirements}
        onChange={(e) => {
          // Limiting the word count to 75
          if (e.target.value.split(" ").length > 75) {
            return;
          }
          setRequirements(e.target.value);
        }}
      />
      {/* Word count display */}
      <div className="flex justify-between items-center">
        <p className="text-xs font-light text-stone-400">75 words maximum.</p>
        <p className="text-xs font-light text-stone-800">
          {requirements.split(" ").length}
        </p>
      </div>

      {/* Save/Discard Buttons */}
      <div className="mt-3">
        <div className="flex items-center justify-end space-x-3">
          {/* Discard changes button */}
          <button
            onClick={() => resetValues()}
            className="border px-2 py-1 font-medium text-stone-600 hover:bg-slate-50"
          >
            Discard
          </button>
          {/* Save changes button */}
          <button className="px-2 py-1 font-medium text-white linearGradient_ver1">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateEditObjectives; 
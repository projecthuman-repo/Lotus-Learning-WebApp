import React, { useEffect, useState } from "react";
import { useNavigate, useParams  } from 'react-router-dom';

const StepOne = ({ setNewCourseObj, newCourseObj }) => {

const [done, setDone] = useState(false)
const { step } = useParams();
const navigate = useNavigate(); // Obtén el objeto history

const goNextPage = () => {
    if(!done){
        return
    }
    const nextStep = parseInt(step) + 1;
    // Ahora, puedes navegar a la nueva URL con el nuevo valor de 'step' usando useHistory
    navigate(`/create-new-course/${nextStep}`);
}

useEffect(() =>{
    if(newCourseObj.title && newCourseObj.description ){
        if(newCourseObj.title.length > 0 && newCourseObj.description.length > 0){
            setDone(true)
        }
    }
    else{
        setDone(false)
    }
},[newCourseObj])

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
          <div className="flex flex-col mt-5 w-[400px]">
            <label htmlFor="title" className="font-semibold text-stone-800">
              Title
            </label>
            <input
              onChange={(e) =>
                setNewCourseObj({
                  ...newCourseObj,
                  title: e.target.value,
                })
              }
              value={newCourseObj.title}
              id="title"
              placeholder="Set a title"
              className="py-1 px-2 focus:outline-none border "
            />
          </div>
          <div className="flex flex-col mt-2 w-[400px]">
            <label htmlFor="title" className="font-semibold text-stone-800">
              Description
            </label>
            <textarea
              onChange={(e) => {
                if (e.target.value.split("").length > 300) {
                  return;
                }
                setNewCourseObj({
                  ...newCourseObj,
                  description: e.target.value,
                });
              }}
              value={newCourseObj.description}
              rows={5}
              id="title"
              placeholder="Set a description"
              className="py-1 px-2 focus:outline-none border "
            />
            {newCourseObj.description && (
              <p
                className={`text-xs text-end mt-1 ${
                  newCourseObj.description.length === 300 && "text-red-400"
                }`}
              >
                {newCourseObj.description.length}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full h-[65px] border-t flex justify-between px-4 items-center">
        <div className="">
        </div>
        <p className="font-semibold text-sm"  >{step}/4</p>
        <button onClick={() => goNextPage()}className={`px-2 py-1 border font-semibold text-stone-500 ${done? 'linearGradient_ver1 text-white' : ''}`}>
          Next
        </button>
      </div>
    </>
  );
};

export default StepOne;

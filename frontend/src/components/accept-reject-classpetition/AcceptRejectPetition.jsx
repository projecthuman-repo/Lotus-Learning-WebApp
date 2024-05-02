import React, { useRef, useEffect, useState } from "react";
import { MdClose, MdDone } from "react-icons/md";
import OnHoverExtraHud from "../OnHoverExtraHud";
import updateCourseDataProxy from "../../BackendProxy/courseProxy/updateCourseData";
import { useNavigate } from "react-router-dom";
import SpinnerLoader from "../loaders/SpinnerLoader";

const AcceptRejectPetition = ({ accept , id, setOpen, course }) => {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
      console.log(accept);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [accept]);

  const acceptRequest = async () => {
    setLoading(true);
    try {
     const data = await updateCourseDataProxy({...course, accepted: true})
     navigate('/admin/courses/');
     window.location.reload();
    } catch (error) {
     navigate('/admin/courses/');
     window.location.reload();
    }
  };

  const rejectRequest = async () => {
    setLoading(true);

  }

  const handleRequest = () => {
    if(accept){
        acceptRequest()

    }
    else{

    }
  }

  return (
    <div className="no-select absolute top-0 h-full w-full bg-[#00000068] left-0 z-[999999] flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-[400px] h-auto bg-white rounded-lg p-3"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <SpinnerLoader/>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-end">
              <MdClose
                className="text-md cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <p className="font-medium">{`Are you sure you want to ${
              accept ? "accept" : "reject"
            } this application?`}</p>
            <p className="font-light text-xs">{`This action cannot be undone`}</p>
            <div className="flex justify-end space-x-2">
              <div onClick={() => handleRequest()} className="p-2 hover:bg-green-200 transition-all bg-green-100 rounded-full cursor-pointer hover-parent">
                <MdDone className="text-md text-green-700 " />
                <OnHoverExtraHud name={"Proceed"} />
              </div>
              <div
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-red-200 transition-all bg-red-100 rounded-full cursor-pointer hover-parent"
              >
                <MdClose className="text-md text-red-700 " />
                <OnHoverExtraHud name={"Cancel"} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AcceptRejectPetition;

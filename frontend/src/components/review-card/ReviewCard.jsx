import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import CommentsPopUp from "../coments-pop-up/CommentsPopUp";

const ReviewCard = ({data}) => {
  const [openComment, setOpenComment] = useState(false)

  return (
    <>
        {
      openComment&&
      <CommentsPopUp setOpen={setOpenComment} open={openComment} value={data.id}/>
    }
      <div 
      onClick={() => setOpenComment(true)}
      className=" p-2 border-b hover:bg-stone-50 cursor-pointer">
        <div className="flex space-x-2 w-full ">
          <img
            className="h-[55px] w-[55px] rounded-full"
            src={data.user.pfp}
            alt="pfp"
          />
          <div className="flex justify-between w-full">
            <div>
              <p className="text-sm font-semibold">{data.user.userName}</p>
              <p className="flex text-xs items-center font-semibold text-stone-700">
                <FaStar className="mr-1 text-yellow-400" />{data.stars}
              </p>
            </div>
            <p className="text-xs  text_linearGradient_ver1 ">3 weeks ago</p>
          </div>
        </div>
        {/* MAX 120 WORDS */}
        <p className="w-full text-justify mt-1 text-xs font-ligth p-1 text-stone-700">
          {data.comment}
        </p>
      </div>
    </>
  );
};

export default ReviewCard;

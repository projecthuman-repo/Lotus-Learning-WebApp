import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = () => {
  return (
    <div className=" p-2 border-b">
      <div className="flex space-x-2 w-full ">
        <img
          className="h-[55px] w-[55px] rounded-full"
          src="https://pbs.twimg.com/media/DiAZ4U4WsAEBNBd.jpg"
          alt="pfp"
        />
        <div className="flex justify-between w-full">
          <div>
            <p className="text-sm font-semibold">Nil Ojeda</p>
            <p className="flex text-xs items-center font-semibold text-stone-700">
              <FaStar className="mr-1 text-yellow-400" /> 4.2
            </p>
          </div>
          <p className="text-xs  text_linearGradient_ver1 ">3 weeks ago</p>
        </div>
      </div>
      {/* MAX 120 WORDS */}
      <p className="w-full text-justify mt-1 text-xs font-ligth p-1 text-stone-700">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam veritatis
        nisi sunt hic. Deserunt cumque, vel sunt eligendi incidunt nesciunt
        molestias deleniti explicabo hic, optio numquam quaerat quod error.
        Aspernatur?
      </p>
    </div>
  );
};

export default ReviewCard;

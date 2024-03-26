import React from "react";

const WishListDropDown = () => {
  return (
    <div className="w-[200px] border rounded-sm bg-white">
      <div className="p-2 border-b">
        <p className="text-sm text-stone-500">Wish List</p>
      </div>
      <div className="">
        <div className="h-full w-full flex items-center justify-center">
          <p className="text-xs py-3">Your wish list is empty</p>
        </div>
      </div>
    </div>
  );
};

export default WishListDropDown;

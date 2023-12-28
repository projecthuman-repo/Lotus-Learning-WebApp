import React, { useState } from "react";
//MUI ICONS
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ClearAllIcon from '@mui/icons-material/ClearAll';//CSS
import "./FilterSidebar.css";

//The FilterSidebar component renders a sidebar with filter options and buttons for clearing and
//searching and is used in the courses and games pages.

const FilterSidebar = ({ filterSidebarProps }) => {

  const [openFilters, setOpenFilters] = useState(false)

  return (
    <>
    <div 
    onClick={() => setOpenFilters(true)}
    className={` md:hidden absolute h-[35px] z-20 smooth-transition flex items-center justify-evenly bg-white border-1 max-w-[130px] py-1 rounded-md ${openFilters? 'left-[-100%]':'left-0'}`}>
      <p className="font-medium pr-2">Filters</p>
      <KeyboardDoubleArrowRightIcon/>
    </div>
      <div className={` w-[80%] sm:w-auto md:w-[20%] lg:w-[17%] border-1 md:border-transparent rounded-md  md:static absolute z-30  ${openFilters? 'left-0':'left-[-100%]'} smooth-transition bg-white`}>
        <div
          style={{ userSelect: "none" }}
          className=" bor-lightGray  p-2 p-sm-3 "
        >
          <div className="flex justify-between items-center pb-1 ">
            <div onClick={() => setOpenFilters(false)} className="md:hidden flex">
              <CloseIcon/>
            </div>
            <p className="font-medium text-md">{filterSidebarProps.title}</p>
            <div className="p-1 flex items-center justify-center cursor-pointer hover:bg-zinc-100 rounded-full">
              <SearchIcon className="" />
            </div>
          </div>

          {filterSidebarProps.filters.map((filter, index) => {
            return (
              <div key={index + filter.filterTitle}>
                <hr className="border-black border-t-1" />
                <div>
                  <p className="my-2 font-medium">{filter.filterTitle}</p>
                  {filter.filterOptions.map((filterOption, index) => {
                    return (
                      <div
                        className="form-check my-2"
                        key={index + filterOption}
                      >
                        <input
                          className="form-check-input cursor-pointer"
                          type="checkbox"
                          value={filterOption}
                          id={filterOption}
                        />
                        <label
                          className="form-check-label fs-14"
                          htmlFor={filterOption}
                        >
                          {filterOption}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="mt-4 flex flex-col">
            <button className="w-full flex justify-evenly items-center border-1 text-sm bg-zinc-0 hover:bg-zinc-100 border-zinc-300 overflow-hidden px-5 py-2 rounded-lg mx-auto">
              <p className="font-semibold mr-2">Search</p>
              <SearchIcon/>
            </button>
            <button className="w-full flex justify-evenly items-center mt-2 border-1 text-sm bg-zinc-0 hover:bg-zinc-100 border-zinc-300 overflow-hidden px-5 py-2 rounded-lg mx-auto">
              <p className="font-semibold mr-2">Clear</p>
              <ClearAllIcon/>
            </button>
            <button 
            onClick={() => setOpenFilters(false)}
            className="md:hidden  w-full flex justify-evenly items-center mt-2 border-1 text-sm bg-zinc-0 hover:bg-zinc-100 border-zinc-300 overflow-hidden px-5 py-2 rounded-lg mx-auto">
              <p className="font-semibold mr-2">Close</p>
              <CloseIcon/>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;

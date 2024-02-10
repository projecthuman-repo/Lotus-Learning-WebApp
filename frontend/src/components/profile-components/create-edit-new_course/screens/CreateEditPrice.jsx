import React, { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const CreateEditPrice = () => {
  // Array of currency options
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD'];

  // Ref for the dropdown element
  const dropDownRef = useRef(null);

  // State to manage the open/close state of currencies dropdown
  const [opendCurrencies, setOpenCurrencies] = useState(false);

  // State to track the selected currency
  const [selectedCurrencie, setSelectedCurrencie] = useState(currencies[0]);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setOpenCurrencies(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropDownRef]);

  return (
    <div className="p-3 bg-white">
      <div className="mb-2">
        <p className="font-semibold text_linearGradient_ver1 text-lg">
          Course Price
        </p>
      </div>
      <p className="font-light text-sm">
        Select the currency and price for your course. [add here any other requirements for course pricing]
      </p>
      <p className="font-semibold text-stone-700 py-2">
        Course Price
      </p>
      <div className="flex">
        {/* Currency Dropdown */}
        <div ref={dropDownRef} style={{userSelect: 'none'}} className="border cursor-pointer p-2 text-stone-600 relative">
          <div className="flex items-center" onClick={() => setOpenCurrencies(!opendCurrencies)}>
            <MdOutlineKeyboardArrowDown className="text-lg mx-1" />
            <p className="font-medium w-[55px]">{selectedCurrencie}</p>
          </div>
          {/* Currency Options */}
          <div style={opendCurrencies ? {display: 'block'} : {display: 'none'}} className="absolute w-full min-h-[100px] max-h-[500px] overflow-y-auto z-30 left-0 top-[100%] border-x border-b">
            {currencies.map((item, i) => (
              <p
                onClick={() => {
                  setSelectedCurrencie(item);
                  setOpenCurrencies(false);
                }}
                className="py-1 px-2 font-medium hover:bg-stone-50 cursor-pointer"
                key={item + i}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        {/* Price Input */}
        <input placeholder="Select prices" type="number" className="border focus:outline-none p-2 w-[200px]"></input>
      </div>
    </div>
  );
};


export default CreateEditPrice
import React, { useRef, useState } from 'react';

const ClassInputs = ({
  value,
  setValue,
  variableName,
  inputRows = 1,
}) => {
  // Ref to the textarea input
  const inputRef = useRef(null);

  // State to track focus state
  const [isFocused, setIsFocused] = useState(false);

  // Function to handle focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Function to handle blur
  const handleBlur = () => {
    setIsFocused(false);
  };

  // Function to handle input change and update the value
  const handleChange = (value) => {
    setValue((prevValue) => {
      return {
        ...prevValue,
        [variableName]: value,
      };
    });
  };

  return (
    <textarea
      rows={inputRows}
      ref={inputRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder='start typing here...'
      className={`focus:outline-none ${
        isFocused && 'border'
      }   text-sm w-full px-2 py-1 `}
      onChange={(e) => {
        isFocused && handleChange(e.target.value);
      }}
      value={value}
    />
  );
};

export default ClassInputs;

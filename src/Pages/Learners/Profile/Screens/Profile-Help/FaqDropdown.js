import React from 'react';
import { BiChevronDown } from 'react-icons/bi';

const FaqDropdown = ({ question }) => {
  return (
    <div className='d-flex border border-2 rounded px-4 py-3 mb-3 pointer'>
      <p className='c-gray fs-14'>{question}</p>
      <div className='ms-auto'>
        <BiChevronDown size={20} />
      </div>
    </div>
  );
};

export default FaqDropdown;

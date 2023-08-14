import React, { useState } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import './sideDashboard.css';

const SideDashboard = ({ sideDashboardOptions, setCurrentScreen }) => {
  const [highlightedOption, setHighlightedOption] = useState(-1);

  return (
    //need to make bootstrap offcanvas for mobile view
    <div className='mt-5'>
      <p className='fs-20 c-darkBlue fw-500'>Dashboard</p>
      <div className='px-4 px-sm-0'>
        {sideDashboardOptions.map((option, index) => {
          return (
            <div
              className={
                highlightedOption === index
                  ? 'd-flex rounded bgc-lightGray px-3 py-2 my-4 pointer'
                  : 'd-flex rounded px-3 py-2 my-4 pointer'
              }
              key={index + option}
              onClick={() => {
                setCurrentScreen(option.component);
                setHighlightedOption(index);
              }}
            >
              <div className='mx-auto mx-sm-0'>{option.icon}</div>
              <p className='fs-16 c-darkBlue ms-3 d-none d-sm-block'>
                {option.title}
              </p>
            </div>
          );
        })}
      </div>
      <div className='px-4 px-sm-0' style={{ marginTop: '100%' }}>
        <div>
          <div className='d-flex rounded px-3 py-2 my-4 pointer'>
            <div className='mx-auto mx-sm-0'>
              <IoLogOutOutline className='c-blue' size={25} />
            </div>
            <p className='fs-16 c-darkBlue ms-3 d-none d-sm-block'>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideDashboard;

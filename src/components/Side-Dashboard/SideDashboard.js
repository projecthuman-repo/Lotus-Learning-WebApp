import React from 'react';

const SideDashboard = ({ sideDashboardOptions, setCurrentScreen }) => {
  return (
    <div className='mt-5'>
      <p className='fs-20 c-darkBlue fw-500'>Dashboard</p>
      {sideDashboardOptions.map((option, index) => {
        return (
          <div
            className='d-flex rounded bgc-lightGray px-3 py-2 my-4 pointer'
            key={index + option}
            onClick={() => setCurrentScreen(option.component)}
          >
            <div>{option.icon}</div>
            <p className='fs-16 c-darkBlue ms-3'>{option.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SideDashboard;

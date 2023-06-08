import React from 'react';
import PhotoPlaceholder from '../../../../../Images/photo.png';
import './profileHome.css';
import CourseInProgress from '../../CourseInProgress';

const ProfileHome = ({ course }) => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <>
      <div className='row my-5'>
        <div className='col-sm-4'>
          <p className='fs-22 fw-600'>Profile (Public)</p>
          <img
            src={PhotoPlaceholder}
            alt='ProfilePic'
            width={250}
            height={250}
          />
        </div>
        <div className='col-sm-8 mt-3 mt-sm-5'>
          <p className='fs-22 fw-600'>John Doe</p>
          <p className='fs-16'>Student/Learner</p>
          <textarea
            className='form-control mt-3'
            rows={4}
            placeholder='Description Here'
          />
        </div>
      </div>
      <hr className='profileHomeHR' />
      <div className='row my-4'>
        <div className='col-12'>
          <div className='d-flex'>
            {daysOfWeek.map((day, index) => {
              return <DayTag day={day} key={index + day} />;
            })}
          </div>
        </div>
      </div>
      <hr className='profileHomeHR' />
      <div className='row'>
        <div className='col-12'>
          <p className='fs-22 fw-600'>In Progress</p>
          <div className='d-flex mt-5'>
            <CourseInProgress course={course} />
          </div>
        </div>
      </div>
    </>
  );
};

const DayTag = ({ day }) => {
  return (
    <div className='rounded bgc-lightLightGray p-2 px-3 mx-auto pointer'>
      <p>{day}</p>
    </div>
  );
};

export default ProfileHome;

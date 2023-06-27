import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './courseInProgress.css';

const CourseInProgress = ({ course }) => {
  // let number = 45;
  // const onClick = () => {
  //   number += 10;
  // };
  return (
    <div className='d-flex flex-column courseInProgress borRad-10 bgc-lightGray p-3'>
      <p className='fw-600'>{course.title}</p>
      <p className='fs-14'>{course.name}</p>
      <div className='mx-auto mt-3 circleProgress'>
        <CircularProgressbar
          value={course.progress}
          maxValue={100}
          text={`${course.progress}%`}
          strokeWidth={15}
          styles={buildStyles({
            strokeLinecap: 'butt',
            pathColor: 'white',
            textColor: 'black',
            trailColor: '#E7E7E7',
          })}
        />
      </div>
      <div className='d-flex mt-auto ms-auto'>
        <p className='fs-12 fw-500'>CONTINUE LESSON</p>
        <BsArrowRight className='ms-2 my-auto' />
      </div>
    </div>
  );
};

export default CourseInProgress;

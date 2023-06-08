import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './courseInProgress.css';

const CourseInProgress = ({ course }) => {
  console.log(course);
  return (
    <div className='courseInProgress borRad-10 bgc-lightGray p-3'>
      <p className='fw-600'>{course.title}</p>
      <p className='fs-14'>{course.name}</p>
      <div className='d-flex mx-auto mt-3 circleProgress'>
        <CircularProgressbar
          value={course.progress}
          maxValue={100}
          text={`${course.progress}%`}
        />
      </div>
    </div>
  );
};

export default CourseInProgress;

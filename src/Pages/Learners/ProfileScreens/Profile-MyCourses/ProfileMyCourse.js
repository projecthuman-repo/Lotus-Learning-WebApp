import React from 'react';
import CourseInProgress from '../CourseInProgress';
import ProductCard from '../../../../components/Product-Card/ProductCard';

const ProfileMyCourse = ({ courses }) => {
  return (
    <div className='px-5'>
      <div className='row mt-5'>
        <p className='fs-30 fw-700 mt-5'>Courses</p>
      </div>
      <div className='row my-5'>
        <div className='col-12'>
          <p className='fs-22 fw-600'>In Progress</p>
          <hr className='profileHomeHR' />
          <div className='row row-cols-auto g-0 mt-3'>
            {courses.map((course, index) => {
              return (
                <div className='col mb-1 mx-1' key={index + course}>
                  <CourseInProgress course={course} />
                </div>
              );
            })}
          </div>
          <div className='d-flex mt-3'>
            <p className='c-gray ms-auto'>Load more...</p>
          </div>
        </div>
      </div>
      <div className='row my-5'>
        <div className='col-12'>
          <p className='fs-22 fw-600'>Bookmarked Courses</p>
          <hr className='profileHomeHR' />
          <div className='row row-cols-auto g-0 mt-3'>
            {courses.map((course, index) => {
              return (
                <div className='col mb-1 mx-1' key={index + course}>
                  <ProductCard product={course} />
                </div>
              );
            })}
          </div>
          <div className='d-flex mt-3'>
            <p className='c-gray ms-auto'>Load more...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMyCourse;

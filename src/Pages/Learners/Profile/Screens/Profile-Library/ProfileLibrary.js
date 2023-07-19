import React from 'react';
import ProductCard from '../../../../../components/Product-Card/ProductCard';

const ProfileLibrary = ({ courses }) => {
  return (
    <div className='px-5'>
      <div className='row mt-5'>
        <p className='fs-30 fw-700 mt-5'>Library</p>
      </div>
      <div className='row my-5'>
        <div className='col-12'>
          <p className='fs-22 fw-700'>Courses</p>
          <hr className='profileHomeHR' />
          <div className='row row-cols-auto mt-3'>
            {courses.map((course, index) => {
              return (
                <div className='col mb-1 mx-1' key={index + course}>
                  <ProductCard product={course} complete={true} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLibrary;

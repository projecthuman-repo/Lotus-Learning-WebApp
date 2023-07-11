import React from 'react';
import CourseInProgress from '../../CourseInProgress';
import ProductCard from '../../../../../components/Product-Card/ProductCard';
import GameHistoryCard from './GameHistoryCard';

const ProfileGames = ({ courses }) => {
  return (
    <>
      <div className='row mt-5'>
        <p className='fs-30 fw-700 mt-5'>My Games List</p>
      </div>
      <div className='row my-5'>
        <div className='col-12'>
          <div className='d-flex'>
            <p className='fs-22 fw-600'>Saved</p>
            <div className='d-flex ms-auto c-gray'>
              <p className='fs-16 pointer'>View by Name</p>
              <p className='fs-16 pointer'>View by Subject</p>
            </div>
          </div>
          <hr className='profileHomeHR' />
          <div className='row row-cols-auto  mt-3'>
            {courses.map((course, index) => {
              return (
                <div className='col mb-1' key={index + course}>
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
      <div className='row my-5'>
        <div className='col-12'>
          <p className='fs-22 fw-600'>History</p>
          <hr className='profileHomeHR' />
          <div className=' mt-3'>
            {courses.map((course, index) => {
              return (
                <div className='mb-3' key={index + course}>
                  <GameHistoryCard product={course} />
                </div>
              );
            })}
          </div>
          <div className='d-flex mt-3'>
            <p className='c-gray ms-auto'>Load more...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileGames;

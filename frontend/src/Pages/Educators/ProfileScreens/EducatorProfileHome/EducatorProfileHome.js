import React from 'react';
import PhotoPlaceholder from '../../../../images/photo.png';

const EducatorProfileHome = ({ courses }) => {
  const badges = ['Coding HTML', 'Algebra III', 'Algebra I'];

  const user = JSON.parse(window.sessionStorage.getItem('user'));

  return (
    <div className='px-md-4'>
      <div className='row my-5'>
        <div className='col-md-4'>
          <p className='fs-22 fw-600'>Profile (Public)</p>
          <img
            src={PhotoPlaceholder}
            alt='ProfilePic'
            width={200}
            height={200}
          />
        </div>
        <div className='col-md-8 mt-3 mt-sm-5'>
          <p className='fs-22 fw-600'>{user.name}</p>
          <p className='fs-16'>{user.accountType}</p>
          <textarea
            className='form-control mt-3'
            rows={4}
            placeholder='Description Here'
          />
        </div>
      </div>
      <hr className='profileHomeHR' />

      <div className='row'>
        <p className='fs-22 fw-600 mb-5'>Experience</p>

        <div className='col-3'>
          <p className='fs-16 mb-3'>Title:</p>
          <p className='fs-16 mb-3'>Company Name:</p>
          <p className='fs-16 mb-3'>City:</p>
        </div>
        <div className='col-3'>
          <input
            className='form-control form-control-sm mb-2'
            id='title'
            type='text'
          />
          <input
            className='form-control form-control-sm mb-2'
            id='company'
            type='text'
          />
          <input
            className='form-control form-control-sm mb-2'
            id='city'
            type='text'
          />
        </div>

        <div className='col-3'>
          <p className='fs-16 mb-3'>From (Month/Year):</p>
          <p className='fs-16 mb-3'>To (Month/Year):</p>
          <p className='fs-16 mb-3'>Country:</p>
        </div>
        <div className='col-3'>
          <input
            className='form-control form-control-sm mb-2'
            id='fromDate'
            type='text'
          />
          <input
            className='form-control form-control-sm mb-2'
            id='toDate'
            type='text'
          />
          <input
            className='form-control form-control-sm mb-2'
            id='country'
            type='text'
          />
        </div>
        <p className='fs-16 mt-2'>Highlights and Accomplishments:</p>
        <textarea className='form-control mt-3' rows={4} />
      </div>

      <hr className='profileHomeHR' />

      <hr className='profileHomeHR' />
    </div>
  );
};

export default EducatorProfileHome;

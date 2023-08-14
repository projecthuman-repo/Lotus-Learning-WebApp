import React, { useEffect, useState } from 'react';
import profilePic from '../../../Images/photo.png';
import { useLocation } from 'react-router-dom';

const Author = () => {
  const [author, setAuthor] = useState({});

  let { state } = useLocation();

  useEffect(() => {
    setAuthor(state.author);
  }, []);

  //   console.log(state.author);
  return (
    <div className='container-fluid'>
      <div className='row justify-content-center bgc-darkGray py-5 d-flex'>
        <div className='col-7 my-auto'>
          <div className='d-flex'>
            <div>
              <img src={profilePic} width={225} height={225} alt='ProfilePic' />
            </div>

            <div className='ms-5 mt-4'>
              <p className='c-white fs-22 fw-500'>{author.userFullName}</p>
              <p className='c-white fs-14'>{author.userType}</p>
              <p className='c-white fs-14 mt-4'>{author.userBio}</p>
            </div>
          </div>
        </div>
        <div className='col-2'>
          <p className='mt-4 c-white fw-500'>Rating: {author.userRating}</p>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-9'>
          <p className='mt-6 fw-600'>Courses</p>
        </div>
      </div>
    </div>
  );
};

export default Author;

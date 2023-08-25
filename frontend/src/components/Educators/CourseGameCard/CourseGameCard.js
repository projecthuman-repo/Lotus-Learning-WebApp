import React from 'react';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

const CourseGameCard = ({ product }) => {
  return (
    <div
      className='card border-2 bor-darkGray borRad-15 productCard'
      style={{ width: '275px' }}
    >
      <img
        src={require('../../../Images/placeholderimage.PNG')}
        className='card-img-top borRad-15 productCardImage'
        alt='...'
      />
      <div className='card-body'>
        <div className='d-flex'>
          <p className='fs-18 fw-500'>{product.title}</p>
          <div className='d-flex ms-auto'>
            <StarIcon style={{ color: '#d9d9d9' }} />
            <p className='fs-14 my-auto'>{product.rating}</p>
          </div>
        </div>
        <p className='fs-12 c-gray mb-3 mt-1'>{product.description}</p>
        <div className='d-flex'>
          <Link to={'/studentComments'}>
            <p className='fs-12'>Student Comments</p>
          </Link>
          <Link to={'/editCourse'} className='ms-auto'>
            <button className='btn btn-gray-shadow py-0'>Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseGameCard;

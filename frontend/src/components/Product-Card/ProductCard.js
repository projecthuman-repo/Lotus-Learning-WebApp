import React from 'react';
import './productCard.css';
import ProductCardTag from './ProductCardTag';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';
// import asd from '../../Images';

//complete param is a temporary solution until we get database structured
const ProductCard = ({ product, complete }) => {
  return (
    <div className='card border-2 bor-darkGray borRad-15 productCard'>
      <div className={complete === true ? 'overlay borRad-15 h-100' : 'd-none'}>
        <div className='d-flex flex-column h-100'>
          <div className='text-center my-auto mx-auto'>
            <div className='mx-auto' style={{ width: '80px' }}>
              <CircularProgressbar
                value={100}
                maxValue={100}
                strokeWidth={15}
                styles={buildStyles({
                  strokeLinecap: 'butt',
                  pathColor: 'white',
                  textColor: 'black',
                  trailColor: '#E7E7E7',
                })}
              />
            </div>

            <p className='fs-20 fw-500 c-white mt-2'>100% Completed</p>
          </div>
          <div className='ms-auto me-2 mb-2 d-flex pointer'>
            <p className='fs-14 c-white'>Review Lesson</p>
            <AiOutlineArrowRight className='c-white my-auto ms-1' />
          </div>
        </div>
      </div>
      <img
        src={require('../../images/placeholderimage.PNG')}
        className='card-img-top borRad-15 productCardImage'
        alt='...'
      />
      <div className='card-body'>
        <p className='fs-18 fw-500'>{product.title}</p>
        <Link
          to={`/author/${product.creator}`}
          state={{ author: product.creator }}
        >
          <p className='fs-12 fw-500 pointer creatorName'>{product.creator}</p>
        </Link>
        <p className='fs-12 c-gray mb-3 mt-1'>{product.description}</p>
        <div className='row row-cols-auto g-0'>
          {product.tags.map((tag, index) => {
            return (
              <div className='col' key={index + tag}>
                <ProductCardTag tag={tag} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

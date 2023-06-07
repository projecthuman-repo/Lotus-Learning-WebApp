import React from 'react';
import './productCard.css';
import ProductCardTag from './ProductCardTag';
// import asd from '../../Images';

const ProductCard = ({ product }) => {
  return (
    <div className='card border-2 bor-darkGray borRad-15 productCard'>
      <img
        src={require('../../Images/placeholderimage.PNG')}
        className='card-img-top borRad-15 productCardImage'
        alt='...'
      />
      <div className='card-body'>
        <p className='fs-18 fw-500'>{product.title}</p>
        <p className='fs-12 fw-500 text-decoration-underline'>
          {product.creator}
        </p>
        <p className='fs-12 c-gray my-3'>{product.description}</p>
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

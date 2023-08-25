import React from 'react';
import ProductCardTag from '../../../../components/Product-Card/ProductCardTag';

const GameHistoryCard = ({ product }) => {
  return (
    <div className='d-flex border borRad-15 bor-darkGray bor-shadow p-1'>
      <img
        src={require('../../../../Images/placeholderimage.PNG')}
        className='borRad-15'
        alt='...'
        width={80}
      />
      <div className='ms-3'>
        <p className='fs-18 fw-500'>{product.title}</p>
        <p className='fs-12 fw-500 text-decoration-underline'>
          {product.creator}
        </p>
      </div>
      <p className='ms-3 fs-12 c-gray'>
        Description of game goes here... Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Fusce lacus massa, hendrerit nec ex nec, commodo
        consectetur...{' '}
      </p>
      <div className='d-flex ms-auto mt-2'>
        {product.tags.map((tag, index) => {
          return (
            <div className='col' key={index + tag}>
              <ProductCardTag tag={tag} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameHistoryCard;

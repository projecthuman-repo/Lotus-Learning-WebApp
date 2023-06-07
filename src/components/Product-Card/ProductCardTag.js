import React from 'react';
import './productCardTag.css';
import { MdClose } from 'react-icons/md';

const ProductCardTag = ({ tag }) => {
  return (
    <div className='d-flex tag bgc-lightGray borRad-15 ps-2 pe-1 py-1 me-1'>
      <p className='fs-10 mx-auto'>{tag}</p>
      <div className='d-flex tag-x pointer my-auto ms-2 text-center bg-white rounded-circle'>
        <MdClose className='mx-auto my-auto' size={12} />
      </div>
    </div>
  );
};

export default ProductCardTag;

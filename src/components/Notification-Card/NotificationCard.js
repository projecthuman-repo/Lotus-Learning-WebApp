import React from 'react';
import { BsFillCircleFill } from 'react-icons/bs';

const NotificationCard = ({ notification }) => {
  return (
    <div className='d-flex border border-dark borRad-10 bor-shadow py-2 px-2 my-3'>
      <div className='my-auto p-3'>
        <BsFillCircleFill
          color={notification.status === 0 ? '#2699FB' : '#E7F0FF'}
          size={35}
        />
      </div>
      <div className='my-auto p-3'>
        <p>{notification.message}</p>
      </div>
      <div className='ms-auto'>
        <img src={notification.image} className='borRad-10' width={125} />
      </div>
    </div>
  );
};

export default NotificationCard;

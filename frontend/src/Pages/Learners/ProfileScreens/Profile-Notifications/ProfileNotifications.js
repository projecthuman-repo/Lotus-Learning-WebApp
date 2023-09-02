import React from 'react';
import placeHolder from '../../../../images/placeholderimage.PNG';
import NotificationCard from '../../../../components/Notification-Card/NotificationCard';

const ProfileNotifications = () => {
  const notis = [
    {
      status: 0,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
      image: placeHolder,
    },
    {
      status: 1,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
      image: placeHolder,
    },
  ];
  return (
    <div className='px-5'>
      <div className='row mt-5'>
        <p className='fs-18 fw-500 mt-5'>Today</p>
        {notis.map((noti, index) => {
          return <NotificationCard notification={noti} key={noti + index} />;
        })}
      </div>
    </div>
  );
};

export default ProfileNotifications;

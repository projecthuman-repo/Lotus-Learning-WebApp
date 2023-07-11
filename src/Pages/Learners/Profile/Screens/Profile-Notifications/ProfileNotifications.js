import React from 'react';
import placeHolder from '../../../../../Images/placeholderimage.PNG';
import NotificationCard from '../../../../../components/Notification-Card/NotificationCard';

const ProfileNotifications = () => {
  const notis = [
    { status: 1, message: 'asdasdasdasdasdasdasd', image: placeHolder },
    { status: 0, message: 'asdasdasdasdasdasdasd', image: placeHolder },
  ];
  return (
    <>
      <div className='row mt-5'>
        <p className='fs-18 fw-500 mt-5'>Today</p>
        <NotificationCard />
      </div>
    </>
  );
};

export default ProfileNotifications;

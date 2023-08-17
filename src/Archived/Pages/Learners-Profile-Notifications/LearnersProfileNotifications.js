import './LearnersProfileNotifications.css';

import LearnersProfileTemplate from '../Learners-Profile-Template/Learners-Profile-Template.js';
import NotificationBlock from '../../../components/Notification-Block/Notification-Block.js';

// This function will be used to gather the notifications in the future
// This is just a place holder funtion for now
function gatherNotifications() {
  // 2D Array containing the notifications for each date
  // First element in the Array is the date
  let notificationsDates = [
    ['Today', 'notification1', 'notification2', 'notification3'],
    ['Yesterday', 'yesterday-notification1', 'yesterday-notification2'],
  ];
  return notificationsDates;
}

function Notifications() {
  let notificationsDates = gatherNotifications();

  // Uses maps to loop through 2D array and output components
  const theNotifications = notificationsDates.map((Dates) => {
    return (
      <>
        {<h2 className='notifcationDates'>{Dates[0]}</h2>}
        {Dates.slice(1).map((noti) => (
          <div className='noti'>
            <NotificationBlock courseDescription={noti} />
          </div>
        ))}
      </>
    );
  });

  return <div className='myContainer'>{theNotifications}</div>;
}

export default function LearnersProfileNotifications() {
  return <LearnersProfileTemplate childComponent={Notifications} />;
}

import { useState, useEffect } from 'react';
import {
  registerServiceWorker,
  getFirebaseMessageToken,
  onMessageListener,
} from './Firebase';

const Notification = () => {
  const [notification, setNotification] = useState({ title: '', body: '' });

  // Initialize Firebase Cloud Messaging
  useEffect(() => {
    registerServiceWorker(); // For debugging purposes to ensure that the service worker is registered correctly

    getFirebaseMessageToken();
  }, []);

  // DIsplay push notification
  useEffect(() => {
    if (notification?.title) {
      alert('title: ' + notification?.title + '\nbody: ' + notification?.body);
      setNotification({ title: '', body: '' });
    }
  }, [notification]);

  // Listen for push notifications
  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((error) => console.log('failed: ', error));

  return <div />;
};

export default Notification;

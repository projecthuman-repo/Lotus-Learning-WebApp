import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase configuration. For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

// Listen for push notifications
export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("onMessageListener: ", payload);
      resolve(payload);
    });
  });
};

// This token is used in the backend to send push notifications
export const getFirebaseMessageToken = async () => {
  return getToken(messaging, {
    vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log(`Current token: ${currentToken}`);
        // Send this token to your server
        return currentToken;
      } else {
        console.log(
          "No Instance ID token available. Request permission to generate one."
        );
        return null;
      }
    })
    .catch((error) => {
      console.error(`An error occurred while retrieving token: ${error}`);
      return null;
    });
};

// For debugging purposes to ensure that the service worker is registered correctly
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
export const registerServiceWorker = async () => {
  const scriptURL = "./firebase-messaging-sw.js";
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(scriptURL);

      if (registration.installing) {
        console.log(`Service worker installing: ${registration.scope}`);
      } else if (registration.waiting) {
        console.log(`Service worker installed: ${registration.scope}`);
      } else if (registration.active) {
        console.log(`Service worker active: ${registration.scope}`);
      }
    } catch (error) {
      console.error(`Service worker registration failed: ${error}`);
    }
  } else {
    console.error("Service workers are not supported.");
  }
};

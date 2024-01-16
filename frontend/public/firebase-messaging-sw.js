// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js");
importScripts("swenv.js");

// Initialize the Firebase app in the service worker by passing in your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: swenv.REACT_APP_FIREBASE_API_KEY,
  authDomain: swenv.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: swenv.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: swenv.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: swenv.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: swenv.REACT_APP_FIREBASE_APP_ID,
  measurementId: swenv.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

const messaging = firebase.messaging();

// For debugging purposes
self.addEventListener("push", (event) => {
  console.log("push event", event);
  const data = event.data.json();
  console.log("Received push notification", data);
});

self.addEventListener("notificationclick", (event) => {
  console.log("notificationclick", event);
});

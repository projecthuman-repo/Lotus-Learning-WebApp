importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
importScripts("swenv.js");

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

messaging.setBackgroundMessageHandler((payload) => {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });

  return promiseChain;
});

self.addEventListener("push", (event) => {
  console.log("push event", event);
  const data = event.data.json();
  console.log("Received push notification", data);
});

self.addEventListener("notificationclick", (event) => {
  console.log("notificationclick", event);
});

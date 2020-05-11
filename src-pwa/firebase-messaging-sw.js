/* eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '228008217062'
});

//const messaging = firebase.messaging();
const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;

messaging.setBackgroundMessageHandler(payload => {
  return self.registration.showNotification("Some title", {
    body: "I'm a body"
  });
});

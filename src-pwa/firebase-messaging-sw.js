/* eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '172397126842'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  return self.registration.showNotification("Some title", {
    body: "I'm a body"
  });
});

importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js');

// Setup workbox precaching

workbox.core.setCacheNameDetails({ prefix: 'septime' });

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// Setup firebase messaging

firebase.initializeApp({
  projectId: 'escrime-moirans',
  apiKey: 'AIzaSyCJj0bOoUj6rKqNMGxL8wRCLbOAxsBiUB8',
  messagingSenderId: '228008217062',
  appId: '1:228008217062:web:9499c475fe821c71eb2e27'
});

//const messaging = firebase.messaging();
const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;

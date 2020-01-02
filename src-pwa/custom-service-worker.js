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
  projectId: 'septime-dev',
  apiKey: 'AIzaSyDOQqwP1k9ZRz43v2LY2OpV3SnwHEUCONo',
  messagingSenderId: '172397126842',
  appId: '1:172397126842:web:676260a3ad9eab19c44e83'
});

const messaging = firebase.messaging();

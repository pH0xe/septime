import Vue from 'vue';
import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/storage';

// Initialization

firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
});

// Export modules

// export const messaging = firebase.messaging();
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

Vue.prototype.$firebase = firebase;

// Setup Notifications

// messaging.usePublicVapidKey(process.env.PUBLIC_VAPID_KEY);

// Store token here
/* let token = null;

Notification.requestPermission()
  .then((permission) => {
    if (permission !== 'granted') {
      throw Error('Permission denied');
    }

    return messaging.getToken();
  })
  .then((newToken) => {
    token = newToken;
    console.log(token);

    // Register listener
    messaging.onMessage((payload) => {
      console.log(payload);
    });
  })
  .catch((err) => {
    console.error(err);
  });

// Listener for token refreshes
messaging.onTokenRefresh(() => {
  messaging.getToken()
    .then((refreshedToken) => {
      token = refreshedToken;
      console.log('FCM token refresh', refreshedToken);
    })
    .catch((err) => console.error(err));
});
*/

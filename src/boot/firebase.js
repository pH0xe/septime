import Vue from 'vue';
import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/storage';
import 'firebase/functions';

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

const secondaryApp = firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
}, 'Secondary');

export const secondaryAuth = secondaryApp.auth();

// Export modules

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
// export const messaging = firebase.messaging();
export const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;

export const adminCreateMember = firebase.functions().httpsCallable('adminCreateMember');

// Functions

const functions = firebase.functions();
export const cloudFunctions = {
  adminCreateMember: functions.httpsCallable('adminCreateMember'),
  getTopics: functions.httpsCallable('getTopics'),
  subscribeToTopic: functions.httpsCallable('subscribeToTopic'),
  unsubscribeFromTopic: functions.httpsCallable('unsubscribeFromTopic'),
  removeUser: functions.httpsCallable('removeUser'),
  addClaimsAdmin: functions.httpsCallable('addClaimsAdmin')
};

Vue.prototype.$firebase = firebase;

// Setup messaging in src-pwa/register-service-worker.js
firebase.getCurrentUser = () => new Promise((resolve, reject) => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    unsubscribe();
    resolve(user);
  }, reject);
});

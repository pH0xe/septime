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

// Export modules

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const messaging = firebase.messaging();

// Functions

const functions = firebase.functions();
export const cloudFunctions = {
  adminCreateMember: functions.httpsCallable('adminCreateMember')
};

Vue.prototype.$firebase = firebase;

// Setup messaging in src-pwa/register-service-worker.js

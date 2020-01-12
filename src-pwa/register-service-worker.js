import { register } from 'register-service-worker';
import * as firebase from 'firebase/app';
import store from '../src/store';

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready(registration) {
    if (process.env.DEV) {
      // console.log('App is being served from cache by a service worker.');
    }

    // ** Setup messaging

    // Use the same service worker
    const messaging = firebase.messaging();
    messaging.useServiceWorker(registration);

    // Setup message listener
    messaging.onMessage((payload) => {
      console.log('Received message', payload);

      // eslint-disable-next-line no-unused-vars
      const notif = new Notification(payload.notification.title, {
        body: payload.notification.body
      });
    });

    store.commit('setServiceWorkerReady', { ready: true });

    // ** Notification permission and token setup is done in context by the store
  },

  registered(/* registration */) {
    if (process.env.DEV) {
      // console.log('Service worker has been registered.');
    }
  },

  cached(/* registration */) {
    if (process.env.DEV) {
      // console.log('Content has been cached for offline use.');
    }
  },

  updatefound(/* registration */) {
    if (process.env.DEV) {
      // console.log('New content is downloading.');
    }
  },

  updated(/* registration */) {
    if (process.env.DEV) {
      // console.log('New content is available; please refresh.');
    }
  },

  offline() {
    if (process.env.DEV) {
      // console.log('No internet connection found. App is running in offline mode.');
    }
  },

  error(/* err */) {
    if (process.env.DEV) {
      // console.error('Error during service worker registration:', err);
    }
  }
});

import Vue from 'vue';
import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

Vue.prototype.$firebase = firebase;

const path = require('path');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Register FCM functions
const { getTopics, subscribeToTopic, unsubscribeFromTopic, onNewsPublished } = require('./fcmFunctions');

exports.getTopics = getTopics;
exports.subscribeToTopic = subscribeToTopic;
exports.unsubscribeFromTopic = unsubscribeFromTopic;
exports.onNewsPublished = onNewsPublished;

async function isAdmin(uid) {
  const docSnapshot = await admin.firestore()
    .collection('users')
    .doc(uid)
    .get();

  return docSnapshot.exists && docSnapshot.data().isAdmin;
}

exports.adminCreateMember = functions.https.onCall(async (data, context) => {

  const { email, firstName, lastName } = data;

  // Generate a random password if not provided
  let password;
  if (!data.password) {
    password = Math.random()
      .toString(36)
      .slice(-16);
  } else {
    password = data.password;
  }

  // Any errors are propagated to the client (hopefully)
  try {
    const { uid } = await admin.auth()
      .createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
        disabled: false,
        emailVerified: false
      });

    // The verification email need to be sent from the client

    const toStore = {
      isAdmin: false,
      isActive: false,
      email, // Duplicate the email here too so we can query it easily from the admin page
      address: data.address,
      birthDate: new Date(data.birthDate),
      certificateDate: new Date(data.certificateDate),
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      phoneEmergency: data.phoneEmergency,
      cerfa: data.cerfa,
      gender: data.gender,
      payments: data.payments,
      weapons: data.weapons,
      laterality: data.laterality
    };

    await admin.firestore()
      .collection('users')
      .doc(uid)
      .set(toStore);

    // Send back the user id
    return { uid };

  } catch (err) {
    return {
      error: true,
      code: err.code,
      message: err.message
    };
  }
});

async function userExists(uid) {
  try {
    await admin.auth().getUser(uid);
    return true;
  } catch (e) {
    return false;
  }
}

exports.validateStorageCertificate = functions.storage.object().onFinalize(async (object, context) => {
  const filename = path.basename(object.name);
  const directory = object.name.substring(0, object.name.length - filename.length - 1);

  const bucket = admin.storage().bucket();

  if (directory === 'certificates/public_temp') {
    if (await userExists(filename) && !(await bucket.file(`certificates/${filename}`).exists())[0]) {
      return bucket.file(object.name).move(`certificates/${filename}`);
    } else {
      return bucket.file(object.name).delete();
    }
  }

  return undefined;
});

exports.validateStorageProfilePics = functions.storage.object().onFinalize(async (object, context) => {
  const filename = path.basename(object.name);
  const directory = object.name.substring(0, object.name.length - filename.length - 1);

  const bucket = admin.storage().bucket();

  if (directory === 'profile_pics/public_temp') {
    if (await userExists(filename) && !(await bucket.file(`profile_pics/${filename}`).exists())[0]) {
      return bucket.file(object.name).move(`profile_pics/${filename}`);
    } else {
      return bucket.file(object.name).delete();
    }
  }

  return undefined;
});

async function newsExists(id) {
  return (await admin.firestore().collection('news').doc(id).get()).exists;
}

exports.validateStorageNews = functions.storage.object().onFinalize(async (object, context) => {
  const filename = path.basename(object.name);
  const directory = object.name.substring(0, object.name.length - filename.length - 1);

  const bucket = admin.storage().bucket();

  if (directory === 'news/public_temp') {
    if (await newsExists(filename) && !(await bucket.file(`news/${filename}`).exists())[0]) {
      return bucket.file(object.name).move(`news/${filename}`);
    } else {
      return bucket.file(object.name).delete();
    }
  }

  return undefined;
});

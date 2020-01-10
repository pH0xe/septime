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

  const { email, password, firstName, lastName } = data;

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
      isActive: true,
      address: data.address,
      birthDate: new Date(data.birthDate),
      certificateDate: new Date(data.certificateDate),
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      phoneEmergency: data.phoneEmergency
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

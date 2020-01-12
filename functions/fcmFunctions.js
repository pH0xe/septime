const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.getTopics = functions.https.onCall((data, context) => {
  return {
    topics: [
      'news',
      'events:common',
      'events:m20'
    ]
  };
});

exports.subscribeToTopic = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Need to be authenticated');
  }

  const { topic } = data;

  if (!topic) {
    throw new functions.https.HttpsError('invalid-argument', 'Field topic must be present');
  }

  // Gather every tokens the user have
  const docSnapshot = await admin.firestore()
    .collection('users')
    .doc(context.auth.uid)
    .get();

  if (!docSnapshot.exists) {
    throw new functions.https.HttpsError('not-found', 'User data not found');
  }

  const { fcmTokens } = docSnapshot.data();

  // If no tokens, ignore
  if (!fcmTokens) {
    return {};
  }

  try {
    // Try to subscribe to the topic
    const res = await admin.messaging()
      .subscribeToTopic(fcmTokens, topic);

    if (res.failureCount > 0) {
      throw res.errors[0].error;
    }

    // If we reach this, everything is good
    await admin.firestore().collection('users').doc(context.auth.uid).update({
      fcmTopics: firebase.firestore.FieldValue.arrayUnion(topic)
    });

    // Return a positive response
    return { success: true };

  } catch (err) {
    // Re throw as HttpsError
    // Can be from the subscribeToTopic promise or the throw right after
    throw new functions.https.HttpsError('unknown', 'Unknown failure, see details', err);
  }
});

exports.unsubscribeFromTopic = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Need to be authenticated');
  }

  const { topic } = data;

  if (!topic) {
    throw new functions.https.HttpsError('invalid-argument', 'Field topic must be present');
  }

  // Gather every tokens the user have
  const docSnapshot = await admin.firestore()
    .collection('users')
    .doc(context.auth.uid)
    .get();

  if (!docSnapshot.exists) {
    throw new functions.https.HttpsError('not-found', 'User data not found');
  }

  const { fcmTokens } = docSnapshot.data();

  // If no tokens, ignore
  if (!fcmTokens) {
    return {};
  }

  try {
    // Try to subscribe to the topic
    const res = await admin.messaging()
      .unsubscribeFromTopic(fcmTokens, topic);

    if (res.failureCount > 0) {
      throw res.errors[0].error;
    }

    // If we reach this, everything is good
    await admin.firestore().collection('users').doc(context.auth.uid).update({
      fcmTopics: firebase.firestore.FieldValue.arrayRemove(topic)
    });

    // Return a positive response
    return { success: true };

  } catch (err) {
    // Re throw as HttpsError
    // Can be from the subscribeToTopic promise or the throw right after
    throw new functions.https.HttpsError('unknown', 'Unknown failure, see details', err);
  }
});

exports.onNewsPublished = functions.firestore
  .document('news/{newsId}')
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();

    await admin.messaging()
      .send({
        notification: {
          title: data.title,
          body: data.text.length > 30 ? data.text.substr(0, 30) + '...' : data.text
        },
        data: {
          newsId: context.params.newsId
        },
        fcmOptions: {
          link: `https://${firebase.app().name}.web.app/news/${context.params.newsId}`
        }
      });
  });

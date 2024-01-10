const admin = require("firebase-admin");
const serviceAccount = require("../config/bantucerdas-firebase.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  admin.app();
}

const getUserId = async (token) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    return uid;
  } catch (error) {
    return res.status(401).json({
      code: 401,
      error: true,
      message: error.message,
    });
  }
};

module.exports = { getUserId }
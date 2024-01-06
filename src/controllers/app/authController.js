require("dotenv").config();

const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const firebase = require("firebase/app");
const admin = require("firebase-admin");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
};
const serviceAccount = require("../../config/bantucerdas-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      code: 400,
      error: true,
      message: "Email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      code: 400,
      error: true,
      message: "Password is required",
    });
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;

      const uid = user.uid;

      user.getIdToken().then((idToken) => {
        res.status(200).json({
          code: 200,
          error: false,
          message: "Login success",
          data: {
            uid: uid,
            idToken: idToken,
            email: email,
          },
        });
      });
    })
    .catch((error) => {
      const errorMessage = error.message;

      res.status(400).json({
        code: 400,
        error: true,
        message: errorMessage,
      });
    });
};

const register = async (req, res) => {
  try {
    const userAccount = {
      email: req.body.email,
      password: req.body.password,
    };
    const userResponse = await admin.auth().createUser({
      email: userAccount.email,
      password: userAccount.password,
    });

    const uid = userResponse.uid;
    const email = userResponse.email;

    res.status(200).json({
      code: 200,
      error: false,
      message: "Register success, you can login now",
      data: {
        uid: uid,
        email: email,
      },
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: true,
      message: error.message,
    });
  }
};

module.exports = {
  signIn,
  register,
};

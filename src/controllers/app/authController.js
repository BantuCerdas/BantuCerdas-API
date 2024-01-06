const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const firebase = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyBZrICGSgsmAmtPY-029xXKgfKaLm2eY-8",
};

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
        }
    );
};

module.exports = {
  signIn,
};

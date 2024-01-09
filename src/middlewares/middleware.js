const admin = require("firebase-admin");
const serviceAccount = require("../config/bantucerdas-firebase.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  admin.app();
}

const authTokenVerifyMiddleware = (req, res, next) => {
  const tokenString = req.headers["authorization"];

  if (!tokenString) {
    return res.status(401).json({
      code: 401,
      error: true,
      message: "No Header provided",
    });
  } else if (!tokenString[1]) {
    return res.status(401).json({
      code: 401,
      error: true,
      message: "No Token provided",
    });
  }
  else if (tokenString){
    const token = tokenString.split(" ")[1];
  
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        req.uid = uid;
      })
      .catch((error) => {
        return res.status(401).json({
          code: 401,
          error: true,
          message: error.message,
        });
      });
  }
  else{
    next();
  }
};

module.exports = { authTokenVerifyMiddleware };

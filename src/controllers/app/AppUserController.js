require("dotenv").config();

const User = require("../../models/user");
const { authTokenVerifyMiddleware } = require("../../middlewares/middleware");
const { getUserId } = require("../../utils/customIdUtil");

const admin = require("firebase-admin");
const serviceAccount = require("../../config/bantucerdas-firebase.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  admin.app();
}

const getUserDataById = async (req, res, next) => {
  await authTokenVerifyMiddleware(req, res, next);

  try{ 
    const token = req.headers.authorization?.split(" ")[1];
    const uid = await getUserId(token);
    console.log("Ini UID nya:", uid);
  
    const user = await User.findOne({
      where: {
        id_user: uid,
      },
    });
  
    if (!user) {
      return res.status(404).json({
        code: 404,
        error: true,
        message: "User not found",
      });
    }
  
    res.status(200).json({
      code: 200,
      error: false,
      message: "Success get user data",
      data: user,
    });

    next();
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: true,
      message: error.message,
    });
  }
};

const updateUserData = async (req, res, next) => {
  await authTokenVerifyMiddleware(req, res, next);

  try {
    const token = req.headers.authorization?.split(" ")[1];
    const uid = await getUserId(token);
    console.log("Ini UID nya:", uid);

    const updateData = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      photoProfile: req.body.photoProfile,
      gender: req.body.gender,
      birthDate: req.body.birthDate,
    };

    await User.update(updateData, {
      where: {
        id_user: uid,
      },
    });

    await admin.auth().updateUser(uid, {
      displayName: req.body.name,
      photoURL: req.body.photoProfile,
    });

    res.status(200).json({
      code: 200,
      error: false,
      message: "Success update user data",
    });

    next();
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: true,
      message: error.message,
    });
  }
};

const deleteUserDataAndAccount = async (req, res, next) => {
  await authTokenVerifyMiddleware(req, res, next);

  try {
    const token = req.headers.authorization?.split(" ")[1];
    const uid = await getUserId(token);
    console.log("Ini UID nya:", uid);

    await User.destroy({
      where: {
        id_user: uid,
      },
    });

    await admin.auth().deleteUser(uid);

    res.status(200).json({
      code: 200,
      error: false,
      message: "Success delete user account and data",
    });

    next();
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: true,
      message: error.message,
    });
  }
};

module.exports = {
  getUserDataById,
  updateUserData,
  deleteUserDataAndAccount,
};

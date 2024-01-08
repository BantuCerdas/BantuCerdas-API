require("dotenv").config();

const User = require("../../models/user");

const admin = require("firebase-admin");
const serviceAccount = require("../../config/bantucerdas-firebase.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  admin.app();
}

const getUserDataById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id: id,
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
};

const updateUserData = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      photoProfile: req.body.photoProfile,
      gender: req.body.gender,
      birthDate: req.body.birthDate,
    };

    await User.update(updateData, {
      where: {
        id: id,
      },
    });

    await admin.auth().updateUser(id, {
      displayName: req.body.name,
      photoURL: req.body.photoProfile,
    });

    res.status(200).json({
      code: 200,
      error: false,
      message: "Success update user data",
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: true,
      message: error.message,
    });
  }
};

const deleteUserDataAndAccount = async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({
      where: {
        id: id,
      },
    });

    await admin.auth().deleteUser(id);

    res.status(200).json({
      code: 200,
      error: false,
      message: "Success delete user account and data",
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
  getUserDataById,
  updateUserData,
  deleteUserDataAndAccount,
};

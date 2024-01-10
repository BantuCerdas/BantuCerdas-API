const express = require("express");
const router = express.Router();

const {
  getUserDataById,
  updateUserData,
  deleteUserDataAndAccount,
} = require("../../controllers/app/AppUserController");

router.get("/account", getUserDataById);
router.put("/account", updateUserData);
router.delete("/account", deleteUserDataAndAccount);

module.exports = router;

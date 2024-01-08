const express = require("express");
const router = express.Router();

const {
  getUserDataById,
  updateUserData,
  deleteUserDataAndAccount,
} = require("../../controllers/app/AppUserController");

router.get("/account/:id", getUserDataById);
router.put("/account/:id", updateUserData);
router.delete("/account/:id", deleteUserDataAndAccount);

module.exports = router;

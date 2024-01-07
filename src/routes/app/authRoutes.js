const express = require("express");
const router = express.Router();

const {
    signIn,
    register,
} = require("../../controllers/app/authController");

const baseURL = "/api/v1/app";

router.post(baseURL + "/login", signIn);
router.post(baseURL + "/register", register);

module.exports = router;
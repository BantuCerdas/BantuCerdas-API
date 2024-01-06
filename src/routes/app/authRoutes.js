const express = require("express");
const router = express.Router();

const {
    signIn,
} = require("../../controllers/app/authController");

const baseURL = "/api/v1/app";

router.post(baseURL + "/login", signIn);

module.exports = router;
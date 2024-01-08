const express = require("express");
const router = express.Router();

const {
    signIn,
    register,
} = require("../../controllers/app/AppAuthController");

router.post("/login", signIn);
router.post("/register", register);

module.exports = router;
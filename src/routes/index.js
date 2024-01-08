const express = require("express");
const router = express.Router();

const AppAuthRoutes = require("./app/AppAuthRoutes");
const AppUserRoutes = require("./app/AppUserRoutes");

const baseAuthURL = "/api/v1/app/auth";
const baseUserURL = "/api/v1/app/user";

router.use(baseAuthURL, AppAuthRoutes);
router.use(baseUserURL, AppUserRoutes);

module.exports = router;
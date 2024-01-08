const express = require("express");
const router = express.Router();
const AppUserRoutes = require("./app/AppUserRoutes");

const baseUserURL = "/api/v1/app/user";

router.use(baseUserURL, AppUserRoutes);

module.exports = router;
const express = require("express");
const router = express.Router();

// app routes
const AppAuthRoutes = require("./app/AppAuthRoutes");
const AppUserRoutes = require("./app/AppUserRoutes");
const AppCampaignRoutes = require("./app/AppCampaignRoutes");

// base url
const baseAuthURL = "/api/v1/auth";
const baseUserURL = "/api/v1/user";
const baseCampaignURL = "/api/v1/campaign";

// app endpoints
router.use(baseAuthURL + "/app", AppAuthRoutes);
router.use(baseUserURL + "/app", AppUserRoutes);
router.use(baseCampaignURL + "/app", AppCampaignRoutes);

module.exports = router;
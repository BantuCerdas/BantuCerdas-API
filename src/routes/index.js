const express = require("express");
const router = express.Router();

// app routes
const AppAuthRoutes = require("./app/AppAuthRoutes");
const AppUserRoutes = require("./app/AppUserRoutes");
const AppCampaignRoutes = require("./app/AppCampaignRoutes");
const AppDonationRoutes = require("./app/AppDonationRoutes");

// admin routes
const AdminCampaignRoutes = require("../routes/admin/AdminCampaignRouter");

// base url
const baseAuthURL = "/api/v1/auth";
const baseUserURL = "/api/v1/user";
const baseCampaignURL = "/api/v1/campaign";
const baseDonationURL = "/api/v1/donation";

// app endpoints
router.use(baseAuthURL + "/app", AppAuthRoutes);
router.use(baseUserURL + "/app", AppUserRoutes);
router.use(baseCampaignURL + "/app", AppCampaignRoutes);
router.use(baseDonationURL + "/app", AppDonationRoutes);

// admin endpoints
router.use(baseCampaignURL + "/admin", AdminCampaignRoutes);

module.exports = router;
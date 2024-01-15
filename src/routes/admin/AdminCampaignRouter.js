const express = require("express");
const router = express.Router();

const {
  getAdminAllCampaigns,
} = require("../../controllers/admin/AdminCampaignController");

router.get("/all-data", getAdminAllCampaigns);

module.exports = router;
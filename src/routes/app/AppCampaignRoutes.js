const express = require("express");
const router = express.Router();

const {
  createCampaign,
  getCampaignByUserId,
  getCampaignByCampaignId,
  updateCampaign,
} = require("../../controllers/app/AppCampaignController");

router.post("/create", createCampaign);
router.get("/all-data/:id_user", getCampaignByUserId);
router.get("/detail/:campaignId", getCampaignByCampaignId);
router.put("/update/:id", updateCampaign);
// router.delete("/champaign/:id", deleteChampaign);

module.exports = router;
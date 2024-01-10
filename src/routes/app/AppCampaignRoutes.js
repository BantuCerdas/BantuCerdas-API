const express = require("express");
const router = express.Router();

const {
  createCampaign,
  getAllCampaign,
  getCampaignDetail,
  getCampaignByUserId,
  updateCampaign,
} = require("../../controllers/app/AppCampaignController");

router.post("/create", createCampaign);
router.get("/all-data", getAllCampaign);
router.get("/detail/:campaignId", getCampaignDetail);
router.get("/all-data/:id_user", getCampaignByUserId);
router.put("/update/:id", updateCampaign);
// router.delete("/champaign/:id", deleteChampaign);

module.exports = router;
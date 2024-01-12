const express = require("express");
const router = express.Router();

const {
  createItemDonation,
  createMoneyDonation,
  getDonationByUserId,
  getDonationDetailByUserId,
} = require("../../controllers/app/AppDonationController");

router.post("/item/create/:id_campaign", createItemDonation);
router.post("/money/create/:id_campaign", createMoneyDonation);
router.get("/by-userId", getDonationByUserId);
router.get("/detail/:id_donation", getDonationDetailByUserId);

module.exports = router;
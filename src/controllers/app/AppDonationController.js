require("dotenv").config();

const { authTokenVerifyMiddleware } = require("../../middlewares/middleware");

const Donation = require("../../models/donation");
const Campaign = require("../../models/campaign");

const { getUserId } = require("../../utils/customIdUtil");

const admin = require("firebase-admin");
const serviceAccount = require("../../config/bantucerdas-firebase.json");

const axios = require("axios");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  admin.app();
}

const createItemDonation = async (req, res, next) => {
  await authTokenVerifyMiddleware(req, res, next);

  try {
    const token = req.headers.authorization?.split(" ")[1];
    const uid = await getUserId(token);
    console.log("Ini UID nya:", uid);
    
    const campaign = await Campaign.findOne({
      where: {
        id_campaign: req.params.id_campaign,
      },
    });
    if (!campaign) {
      throw new Error("Campaign not found");
    }

    const createData = {
      id_campaign: req.params.id_campaign,
      id_user: uid,
      donation_type: req.body.donation_type,
      item_name: req.body.item_name,
      item_qty: req.body.item_qty,
      delivery_receipt: req.body.delivery_receipt,
      delivery_provider: req.body.delivery_provider,
    };

    const donationSave = await Donation.create(createData);
    console.log("Donation created:", donationSave);

    const updatedCurrentItems = campaign.current_items + req.body.item_qty;
    await Campaign.update(
      { current_items: updatedCurrentItems },
      { where: { id_campaign: req.params.id_campaign } }
    );

    res.status(201).json({
      message: "Donation created",
      donation: donationSave,
    });

    next();
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: true,
      message: error.message,
    });
  }
};

const createMoneyDonation = async (req, res, next) => {
  await authTokenVerifyMiddleware(req, res, next);

  try {
    const token = req.headers.authorization?.split(" ")[1];
    const uid = await getUserId(token);
    console.log("Ini UID nya:", uid);
    
    const campaign = await Campaign.findOne({
      where: {
        id_campaign: req.params.id_campaign,
      },
    });
    if (!campaign) {
      throw new Error("Campaign not found");
    }

    const createData = {
      id_campaign: req.params.id_campaign,
      id_user: uid,
      donation_type: req.body.donation_type,
      amount: req.body.amount,
      transaction_receipt: req.body.transaction_receipt,
    };

    const donationSave = await Donation.create(createData);
    console.log("Donation created:", donationSave);

    const updatedCurrentMoney = campaign.current_money + req.body.amount;
    await Campaign.update(
      { current_money: updatedCurrentMoney },
      { where: { id_campaign: req.params.id_campaign } }
    );

    res.status(201).json({
      message: "Donation created",
      donation: donationSave,
    });

    next();
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: true,
      message: error.message,
    });
  }
};

const getDonationByUserId = async (req, res, next) => {
  await authTokenVerifyMiddleware(req, res, next);

  try {
    const token = req.headers.authorization?.split(" ")[1];
    const uid = await getUserId(token);
    console.log("Ini UID nya:", uid);

    const donation = await Donation.findAll({
      where: {
        id_user: uid,
      },
    });

    if (!donation) {
      return res.status(404).json({
        code: 404,
        error: true,
        message: "Donation not found",
      });
    }

    res.status(200).json({
      code: 200,
      error: false,
      message: "Success get donation data",
      data: donation,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: true,
      message: error.message,
    });
  }
};

const getDonationDetailByUserId = async (req, res, next) => {
  await authTokenVerifyMiddleware(req, res, next);

  try {
    const token = req.headers.authorization?.split(" ")[1];
    const uid = await getUserId(token);
    console.log("Ini UID nya:", uid);

    const donation = await Donation.findOne({
      where: {
        id_donation: req.params.id_donation,
        id_user: uid,
      },
    });

    if (!donation) {
      return res.status(404).json({
        code: 404,
        error: true,
        message: "Donation not found",
      });
    }

    const deliveryReceipt = donation.delivery_receipt;
    const deliveryProvider = donation.delivery_provider;

    const trackingUrl = `https://api.binderbyte.com/v1/track?api_key=4c96e88339b76f7553de7ed768ef75e1fd8ecb5f6af431b7f3ba04d765d1f4d2&courier=${deliveryProvider}&awb=${deliveryReceipt}`;

    const response = await axios.get(trackingUrl);
    const trackingStatus = response.data.data;

    res.status(200).json({
      code: 200,
      error: false,
      message: "Success get donation data",
      data: {
        donation,
        trackingStatus,
      },
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: true,
      message: error.message,
    });
  }
};

module.exports = {
  createItemDonation,
  createMoneyDonation,
  getDonationByUserId,
  getDonationDetailByUserId,
};
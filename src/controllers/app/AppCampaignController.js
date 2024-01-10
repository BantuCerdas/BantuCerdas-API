require("dotenv").config();

const { authTokenVerifyMiddleware } = require("../../middlewares/middleware");

const Campaign = require("../../models/campaign");
const Receiver = require("../../models/receiver");

const { getUserId } = require("../../utils/customIdUtil");

const admin = require("firebase-admin");
const serviceAccount = require("../../config/bantucerdas-firebase.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  admin.app();
}

const createCampaign = async (req, res, next) => {
  await authTokenVerifyMiddleware(req, res, next);

  try {
    const receiverData = {
      receiver_name: req.body.receiver_name,
      receiver_address: req.body.receiver_address,
      receiver_photo: req.body.receiver_photo,
      receiver_phone: req.body.receiver_phone,
      receiver_email: req.body.receiver_email,
      receiver_people_count: req.body.receiver_people_count,
    };

    const receiverSave = await Receiver.create(receiverData);
    console.log("Receiver created:", receiverSave);

    const token = req.headers.authorization?.split(" ")[1];
    const uid = await getUserId(token);
    console.log("Ini UID nya:", uid);

    const createData = {
      id_user: uid,
      title: req.body.title,
      description: req.body.description,
      champaign_photo: req.body.champaign_photo,
      target_items: req.body.target_items,
      target_money: req.body.target_money,
      current_items: req.body.current_items,
      current_money: req.body.current_money,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      donation_type: req.body.donation_type,
      id_receiver: receiverSave.id_receiver,
      permission_letter: req.body.permission_letter,
      inisiator_name: req.body.inisiator_name,
      inisiator_phone: req.body.inisiator_phone,
      inisiator_job: req.body.inisiator_job,
      inisiator_workplace: req.body.inisiator_workplace,
      inisiator_sosmed: req.body.inisiator_sosmed,
    };

    const campaign = await Campaign.create(createData);
    console.log("Campaign created:", campaign);
    res.status(201).json({
      message:
        "Your campaign created successfully, we will review it. Please wait",
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

const getAllCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findAll();

    if (!campaign) {
      return res.status(404).json({
        code: 404,
        error: true,
        message: "Campaign not found",
      });
    }

    res.status(200).json({
      code: 200,
      error: false,
      message: "Success get campaign data",
      data: campaign,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: true,
      message: error.message,
    });
  }
};

const getCampaignDetail = async (req, res, next) => {
  try {
    const { campaignId } = req.params;

    const campaign = await Campaign.findOne({
      where: {
        id_champaign: campaignId,
      },
    });

    next();

    if (!campaign) {
      return res.status(404).json({
        code: 404,
        error: true,
        message: "Campaign not found",
      });
    }

    res.status(200).json({
      code: 200,
      error: false,
      message: "Success get campaign data",
      data: campaign,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: true,
      message: error.message,
    });
  }
};

const getCampaignByUserId = async (req, res, next) => {
  await authTokenVerifyMiddleware(req, res, next);

  try {
    const token = req.headers.authorization?.split(" ")[1];
    const uid = await getUserId(token);
    console.log("Ini UID nya:", uid);

    const campaign = await Campaign.findAll({
      where: {
        id_user: uid,
      },
    });

    if (!campaign) {
      return res.status(404).json({
        code: 404,
        error: true,
        message: "Campaign not found",
      });
    }

    res.status(200).json({
      code: 200,
      error: false,
      message: "Success get campaign data",
      data: campaign,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      error: true,
      message: error.message,
    });
  }
};

const updateCampaign = async (req, res) => {
  await authTokenVerifyMiddleware(req, res, next);

  try {
    const uid = await getUserId(req.headers["authorization"]);
    console.log(uid);

    const { id_campaign } = req.params;

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      champaign_photo: req.body.champaign_photo,
      target_items: req.body.target_items,
      target_money: req.body.target_money,
      current_items: req.body.current_items,
      current_money: req.body.current_money,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      donation_type: req.body.donation_type,
      id_receiver: req.body.id_receiver,
      permission_letter: req.body.permission_letter,
      inisiator_name: req.body.inisiator_name,
      inisiator_phone: req.body.inisiator_phone,
      inisiator_job: req.body.inisiator_job,
      inisiator_workplace: req.body.inisiator_workplace,
      inisiator_sosmed: req.body.inisiator_sosmed,
    };

    await Campaign.update(updateData, {
      where: {
        id_champaign: id_campaign,
        id_user: uid,
      },
    });

    res.status(200).json({
      code: 200,
      error: false,
      message: "Success update your campaign data",
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
  createCampaign,
  getAllCampaign,
  getCampaignDetail,
  getCampaignByUserId,
  updateCampaign,
};

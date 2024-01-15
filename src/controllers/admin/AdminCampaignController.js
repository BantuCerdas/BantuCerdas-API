require("dotenv").config();

const { authTokenVerifyMiddleware } = require("../../middlewares/middleware");

const User = require("../../models/user");
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

const getAdminAllCampaigns = async (req, res, next) => {
  await authTokenVerifyMiddleware(req, res, next);

  try {
    const token = req.headers.authorization?.split(" ")[1];
    const uid = await getUserId(token);
    console.log("Ini UID nya:", uid);

    const userRole = await User.findOne({
      where: {
        id_user: uid,
      },
    });

    const userAdmin = userRole.role;

    if (userAdmin === "ADMIN") {
      const campaigns = await Campaign.findAll({
        include: [
          {
            model: Receiver,
            as: "receiver",
          },
        ],
      });
      console.log("Campaigns:", campaigns);

      res.status(200).json({
        message: "Get all campaigns success",
        data: campaigns,
      });
    } else {
      res.status(403).json({
        code: 403,
        error: true,
        message: "Unauthorized Access, only admin can access this",
      });

    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminAllCampaigns,
};

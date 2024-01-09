const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require("./user");
const Receiver = require("./receiver");

const Campaign = sequelize.define(
  "campaign",
  {
    id_campaign: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      indexes: [
        {
          unique: true,
          fields: ["id_campaign"],
        },
      ],
    },
    id_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_receiver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    champaign_photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    donation_type: {
      type: DataTypes.ENUM,
      values: ["ITEM", "MONEY"],
      allowNull: false,
    },
    target_items: {
      type: DataTypes.INTEGER,
    },
    target_money: {
      type: DataTypes.INTEGER,
    },
    current_items: {
      type: DataTypes.INTEGER,
    },
    current_money: {
      type: DataTypes.INTEGER,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    permission_letter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inisiator_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inisiator_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inisiator_job: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inisiator_workplace: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inisiator_sosmed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["ACTIVE", "INACTIVE"],
      defaultValue: "INACTIVE",
    },
    validation_status: {
      type: DataTypes.ENUM,
      values: ["PENDING", "ACCEPTED", "REJECTED"],
      defaultValue: "PENDING",
    },
  },
  {
    tableName: "campaign",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

// Campaign.belongsTo(User, { foreignKey: "userID" });

// Campaign.belongsTo(Receiver, { foreignKey: "receiverID" });

sequelize.sync();

module.exports = Campaign;

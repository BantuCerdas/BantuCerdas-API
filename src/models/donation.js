const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Donation = sequelize.define(
  "donation",
  {
    id_donation: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      indexes: [
        {
          unique: true,
          fields: ["id_donation"],
        },
      ],
    },
    id_campaign: {
      type: DataTypes.STRING,
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
      indexes: [
        {
          unique: true,
          fields: ["id_user"],
        },
      ],
    },
    donation_type: {
      type: DataTypes.ENUM,
      values: ["ITEM", "MONEY"],
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    transaction_receipt: {
      type: DataTypes.STRING,
    },
    item_name: {
      type: DataTypes.INTEGER,
    },
    item_qty: {
      type: DataTypes.INTEGER,
    },
    delivery_receipt: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "donation",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

sequelize.sync();

module.exports = Donation;
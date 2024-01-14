const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Campaign = require("./campaign");
const User = require("./user");

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
      type: DataTypes.UUID,
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
    delivery_provider: {
      type: DataTypes.ENUM,
      values: ["JNE", "POS", "JNT", "JNT_CARGO", "SICEPAT", "ANTERAJA", "NINJA", "WAHANA"],
    },
  },
  {
    tableName: "donation",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
  {
    classMethods: {
      associate: function (models) {
        Donation.hasMany(models.Campaign);
      },
    },
  }
);

Donation.belongsTo(Campaign, {
  foreignKey: "id_campaign",
  targetKey: "id_campaign",
});

Donation.belongsTo(User, {
  foreignKey: "id_user",
  targetKey: "id_user",
});

sequelize.sync();

module.exports = Donation;
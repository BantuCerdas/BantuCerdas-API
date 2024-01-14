const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Receiver = sequelize.define(
  "receiver",
  {
    id_receiver: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      indexes: [
        {
          unique: true,
          fields: ["id_receiver"],
        },
      ],
    },
    receiver_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiver_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    receiver_photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiver_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiver_email: {
      type: DataTypes.STRING,
    },
    receiver_people_count: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "receiver",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
  {
    classMethods: {
      associate: function (models) {
        Receiver.hasMany(models.Campaign);
      },
    },
  }
);

sequelize.sync();

module.exports = Receiver;

const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  "user",
  {
    id_user: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      indexes: [
        {
          unique: true,
          fields: ["id_user"],
        },
      ],
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photoProfile: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["MALE", "FEMALE"],
    },
    birthDate: {
      type: DataTypes.DATE,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["USER", "ADMIN"],
      defaultValue: "USER",
    },
    status: {
      type: DataTypes.ENUM,
      values: ["REGISTERED", "UNREGISTERED"],
      defaultValue: "REGISTERED",
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
  {
    classMethods: {
      associate: function (models) {
        User.hasMany(models.Campaign);
      },
    },
  }
);

sequelize.sync();

module.exports = User;
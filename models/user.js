const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class User extends Model {}
User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize, modelName: "user", timestamps: false }
);

module.exports = User;

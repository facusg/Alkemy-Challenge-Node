const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Character extends Model {}
Character.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    weight: { type: DataTypes.FLOAT, allowNull: false },
    story: { type: DataTypes.STRING, allowNull: false },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize, modelName: "characters", timestamps: false }
);

module.exports = Character;

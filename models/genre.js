const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Genre extends Model {}
Genre.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "genre", timestamps: false }
);

module.exports = Genre;

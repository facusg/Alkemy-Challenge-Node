const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Movie extends Model {}
Movie.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    rate: { type: DataTypes.INTEGER, allowNull: false },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize, modelName: "movies", timestamps: false }
);

module.exports = Movie;

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class MovieGenre extends Model {}
MovieGenre.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: "movie_genre", timestamps: false }
);

module.exports = MovieGenre;

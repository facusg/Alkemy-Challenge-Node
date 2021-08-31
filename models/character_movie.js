const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class CharacterMovie extends Model {}
CharacterMovie.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: "character_movie", timestamps: false }
);

module.exports = CharacterMovie;

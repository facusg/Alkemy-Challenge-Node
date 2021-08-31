const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Movie = require("../models/movie");
const Character = require("../models/character");

class CharacterMovie extends Model {
  static associate() {
    // association
    CharacterMovie.belongsTo(Movie, {
      foreignKey: "movieId",
      onDelete: "cascade",
    });
    CharacterMovie.belongsTo(Character, {
      foreignKey: "characterId",
      onDelete: "cascade",
    });
  }
}
CharacterMovie.init(
  {
    characterId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
  },
  { sequelize, modelName: "character_movie", timestamps: false }
);

module.exports = CharacterMovie;

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Movie = require("../models/movie");
const Genre = require("./genre");

class MovieGenre extends Model {
  static associate() {
    // association
    MovieGenre.belongsTo(Movie, {
      foreignKey: "movieId",
      onDelete: "cascade",
    });
    MovieGenre.belongsTo(Genre, {
      foreignKey: "genreId",
      onDelete: "cascade",
    });
  }
}
MovieGenre.init(
  {
    genreId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
  },
  { sequelize, modelName: "movie_genre", timestamps: false }
);

module.exports = MovieGenre;

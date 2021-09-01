const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Character = require("./character");

class Movie extends Model {}
Movie.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE, allowNull: false },
    rate: { type: DataTypes.FLOAT, allowNull: false },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize, modelName: "movies", timestamps: false }
);

Movie.associations = () => {
  Movie.belongsTo(Character, {
    as: "characters",
    through: "character_movie",
    foreignKey: "movieId",
  });

  Movie.belongsTo(Genre, {
    as: "genre",
    through: "movie_genre",
    foreignKey: "genreId",
  });
};

module.exports = Movie;

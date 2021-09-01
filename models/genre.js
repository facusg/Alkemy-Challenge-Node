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

Genre.associations = () => {
  Genre.belongsTo(Movie, {
    as: "movies",
    through: "movie_genre",
    foreignKey: "movieId",
  });
};

module.exports = Genre;

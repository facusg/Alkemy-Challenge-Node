const Movie = require("../models/movie");
const Genre = require("../models/genre");
const Character = require("../models/character");

//NaN
//user.addBand user.getBands

Character.belongsToMany(Movie, {
  through: "character_movie",
  foreignKey: "characterId",
  otherKey: "movieId",
});
Movie.belongsToMany(Character, {
  through: "character_movie",
  foreignKey: "movieId",
  otherKey: "characterId",
});

Genre.belongsToMany(Movie, {
  through: "movie_genre",
  foreignKey: "genreId",
  otherKey: "movieId",
});
Movie.belongsToMany(Genre, {
  through: "movie_genre",
  foreignKey: "movieId",
  otherKey: "genreId",
});

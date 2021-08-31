const Character = require("../models/character");
const Movie = require("../models/movie");

const existCharacterbyId = async (id) => {
  const existCharacter = await Character.findByPk(id);
  if (!existCharacter) {
    throw new Error(`Id not exist in database`);
  }
};

const existMoviebyId = async (id) => {
  const existMovie = await Movie.findByPk(id);
  if (!existMovie) {
    throw new Error(`Id not exist in database`);
  }
};

module.exports = { existCharacterbyId, existMoviebyId };

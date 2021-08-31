const { response } = require("express");
const Character = require("../models/character");
const Movie = require("../models/movie");
const CharacterMovie = require("../models/character_movie");

const charactersList = async (req, res = response) => {
  const { limit = 5, since = 0 } = req.query;
  const query = { state: true };

  const [total, characters] = await Promise.all([
    Character.count(query),
    Character.findAll({
      where: query,
      attributes: ["id", "name", "img"],
      limit: Number(limit),
      offset: Number(since),
    }),
  ]);

  res.json({ total, characters });
};

const characterDetails = async (req, res = response) => {
  const { id } = req.params;
  const character = await Character.findByPk(id, {
    include: { model: Movie, as: "movies", attribute: ["id", "title"] },
  });

  res.json({ character });
};

const createCharacter = async (req, res = response) => {
  const { name, ...body } = req.body;
  const characterDB = await Character.findOne({ where: { name } });

  if (characterDB) {
    return res.status(401).json({ msg: `${name} is already a character ` });
  }

  const data = {
    ...body,
    name: name.toUpperCase(),
  };

  const character = new Character(data);

  await character.save();

  res.status(201).json(character);
};

const updateCharacter = async (req, res = response) => {
  const { id } = req.params;
  const { state, ...data } = req.body;

  await Character.update({ ...data, state }, { where: { id } });

  const character = await Character.findByPk(id);

  res.json({ character });
};

const deleteCharacter = async (req, res = response) => {
  const { id } = req.params;

  const characterDelete = await Character.findByPk(id);

  characterDelete.state = false;

  await characterDelete.save();

  res.json({ characterDelete });
};

const addMovieToCharacter = async (req, res = response) => {
  const { id, movieId } = req.params;

  const character = await Character.findByPk(id);

  const movie = await Movie.findByPk(movieId);

  if (!(await character.hasMovie(movie))) {
    character.addMovie(movie);
  }

  res.json({ character });
};

const removeMovieToCharacter = async (req, res = response) => {
  const { id, movieId } = req.params;

  const character = await Character.findByPk(id);

  const movie = await Movie.findByPk(movieId);

  if (await character.hasMovie(movie)) {
    character.removeMovie(movie);
  }

  res.json({ character });
};

module.exports = {
  charactersList,
  characterDetails,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  addMovieToCharacter,
  removeMovieToCharacter,
};

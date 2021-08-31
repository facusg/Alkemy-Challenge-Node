const { response } = require("express");
const Movie = require("../models/movie");

const { dateCheck } = require("../helpers/dateCheck");
const Genre = require("../models/genre");
const Character = require("../models/character");

const moviesList = async (req, res = response) => {
  const { limit = 5, since = 0 } = req.query;
  const query = { state: true };

  const [total, movies] = await Promise.all([
    Movie.count(query),
    Movie.findAll({
      where: query,
      attributes: ["id", "title", "img", "date"],
      limit: Number(limit),
      offset: Number(since),
    }),
  ]);

  res.json({ total, movies });
};

const movieDetails = async (req, res = response) => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id, {
    include: { model: Character, as: "characters", attribute: ["id", "name"] },
  });

  res.json({ movie });
};

const createMovie = async (req, res = response) => {
  const { title, date, ...body } = req.body;
  const movieDB = await Movie.findOne({ where: { title } });

  if (movieDB) {
    return res.status(401).json({ msg: `${title} is already a movie` });
  }
  const validDate = dateCheck(date);

  if (!validDate) {
    return res.status(401).json({ msg: "Invalid format date" });
  }
  const data = {
    ...body,
    date: validDate,
    title: title.toUpperCase(),
  };

  const movie = new Movie(data);

  await movie.save();

  res.status(201).json(movie);
};

const updateMovie = async (req, res = response) => {
  const { id } = req.params;
  const { state, rate, date, ...data } = req.body;

  if (rate) {
    if (!(rate >= 1 && rate <= 5)) {
      return res.status(401).json({ msg: "Rate must be between 1 - 5 " });
    }
  }

  let validDate;
  if (date) {
    validDate = dateCheck(date);
    if (!validDate) {
      return res.status(401).json({ msg: "Invalid format date" });
    }
    await Movie.update({ ...data, state, rate, date }, { where: { id } });
  } else {
    await Movie.update({ ...data, state, rate }, { where: { id } });
  }

  const movie = await Movie.findByPk(id);

  res.json({ movie });
};

const deleteMovie = async (req, res = response) => {
  const { id } = req.params;

  const movieDelete = await Movie.findByPk(id);

  movieDelete.state = false;

  await movieDelete.save();

  res.json({ movieDelete });
};

const addCharacaterToMovie = async (req, res = response) => {
  const { id, characterId } = req.params;

  const movie = await Movie.findByPk(id);

  const character = await Character.findByPk(characterId);

  if (!(await movie.hasCharacter(character))) {
    movie.addCharacter(character);
  }

  res.json({ movie });
};
const deleteCharacaterToMovie = async (req, res = response) => {
  const { id, characterId } = req.params;

  const movie = await Movie.findByPk(id);

  const character = await Character.findByPk(characterId);

  if (await movie.hasCharacter(character)) {
    movie.removeCharacter(character);
  }

  res.json({ movie });
};

module.exports = {
  moviesList,
  movieDetails,
  createMovie,
  updateMovie,
  deleteMovie,
  addCharacaterToMovie,
  deleteCharacaterToMovie,
};

const { response } = require("express");
const Movie = require("../models/movie");

const { dateCheck } = require("../helpers/dateCheck");
const Genre = require("../models/genre");

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
  const movie = await Movie.findByPk(id, {});

  res.json({ movie });
};

const createMovie = async (req, res = response) => {
  const { title, ...body } = req.body;
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
    title: title.toUpperCase(),
  };

  const movie = new Movie(data);

  await movie.save();

  res.status(201).json(movie);
};

const updateMovie = async (req, res = response) => {
  const { id } = req.params;
  const { state, rate, date, ...data } = req.body;

  const validDate = dateCheck(date);

  if (!validDate) {
    return res.status(401).json({ msg: "Invalid format date" });
  }

  if (rate) {
    if (!(rate >= 1 && rate <= 5)) {
      return res.status(401).json({ msg: "Rate must be between 1 - 5 " });
    }
  }

  await Movie.update(
    { ...data, state, rate, date: validDate },
    { where: { id } }
  );

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

module.exports = {
  moviesList,
  movieDetails,
  createMovie,
  updateMovie,
  deleteMovie,
};

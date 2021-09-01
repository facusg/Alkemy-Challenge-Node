const { response } = require("express");

const { Op } = require("sequelize");

const Character = require("../models/character");
const Movie = require("../models/movie");
const Genre = require("../models/genre");

const charactersSearch = async (req, res) => {
  const { name, weight, age, movie } = req.query;

  if (movie) {
    const search = await Character.findAll({
      include: {
        model: Movie,
        as: "movies",
        attribute: ["id", "name"],
        where: { id: movie },
      },
    });

    return res.json({ results: search });
  }

  let query = { [Op.or]: [] };
  if (name) {
    query[Op.or].push({ name: name });
  }
  if (weight) {
    query[Op.or].push({ weight: weight });
  }
  if (age) {
    query[Op.or].push({ age: age });
  }

  const search = await Character.findAll({
    where: query,
  });

  res.json({ results: search });
};

const moviesSearch = async (req, res) => {
  const { title = "", genre, order = "DESC" } = req.query;

  if (genre) {
    const search = await Movie.findAll({
      include: {
        model: Genre,
        as: "genres",
        attribute: ["id", "name"],
        where: { id: genre },
      },
    });

    return res.json({ results: search });
  }

  const search = await Movie.findAll({
    where: { title: title },
    order: [["date", order]],
  });

  res.json({ results: search });
};

module.exports = { charactersSearch, moviesSearch };

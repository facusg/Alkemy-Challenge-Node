const { response } = require("express");
const Genre = require("../models/genre");

const listGenres = async (req, res) => {
  const { limit = 5, since = 0 } = req.query;
  const query = { state: true };

  const [total, genres] = await Promise.all([
    Genre.count(query),
    Genre.findAll({
      attributes: ["id", "name", "img"],
      limit: Number(limit),
      offset: Number(since),
    }),
  ]);

  res.json({ total, genres });
};

const createGenre = async (req, res) => {
  const { name, ...body } = req.body;
  const genreDB = await Genre.findOne({ where: { name } });

  if (genreDB) {
    return res.status(401).json({ msg: `${name} is already a movie` });
  }

  const data = {
    ...body,
    name: name.toUpperCase(),
  };

  const genre = new Genre(data);

  await genre.save();

  res.status(201).json(genre);
};

const updateGenre = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  await Genre.update({ data }, { where: { id } });

  const genre = await Genre.findByPk(id);

  res.json({ genre });
};

module.exports = { listGenres, createGenre, updateGenre };

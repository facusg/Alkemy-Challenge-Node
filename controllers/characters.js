const { response } = require("express");
const Character = require("../models/character");

const charactersList = async (req, res = response) => {
  const { limit = 5, since = 0 } = req.query;
  const query = { state: true };

  const [total, characters] = await Promise.all([
    Character.count(query),
    Character.findAll({
      where: query,
      limit: Number(limit),
      offset: Number(since),
    }),
  ]);

  res.json({ total, characters });
};

const characterDetails = async (req, res = response) => {
  const { id } = req.params;
  const character = await Character.findByPk(id);

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

const updateCharacter = (req, res = response) => {
  res.json({ msg: "updateCharacter" });
};

const deleteCharacter = (req, res = response) => {
  res.json({ msg: "deleteCharacter" });
};

module.exports = {
  charactersList,
  characterDetails,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};

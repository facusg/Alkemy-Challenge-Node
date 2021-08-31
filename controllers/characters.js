const { response } = require("express");
const Character = require("../models/character");

const charactersList = (req, res = response) => {
  res.json({ msg: "character list" });
};

const characterDetails = (req, res = response) => {
  res.json({ msg: "characterDetails" });
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

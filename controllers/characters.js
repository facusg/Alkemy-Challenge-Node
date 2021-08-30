const { response } = require("express");

const charactersList = (req, res = response) => {
  res.json({ msg: "character list" });
};

const characterDetails = (req, res = response) => {
  res.json({ msg: "characterDetails" });
};

const createCharacter = (req, res = response) => {
  res.json({ msg: "createCharacter" });
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

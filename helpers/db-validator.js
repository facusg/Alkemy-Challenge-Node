const Character = require("../models/character");

const existCharacterbyId = async (id) => {
  const existCharacter = await Character.findByPk(id);
  if (!existCharacter) {
    throw new Error(`Id not exist in database`);
  }
};

module.exports = { existCharacterbyId };

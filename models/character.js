const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const CharacterMovie = require("./character_movie");

class Character extends Model {}
Character.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER, allowNull: false },
    weight: { type: DataTypes.FLOAT, allowNull: false },
    story: { type: DataTypes.STRING, allowNull: false },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize, modelName: "characters", timestamps: false }
);

Character.associations = () => {
  Character.belongsTo(Movie, {
    as: "movies",
    through: "character_movie",
    foreignKey: "characterId",
  });
};

module.exports = Character;

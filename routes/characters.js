const { Router } = require("express");
const { check } = require("express-validator");

const {
  charactersList,
  characterDetails,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} = require("../controllers/characters");

const { fieldValidator } = require("../middlewares/field-validator");

const router = Router();

router.get("/", charactersList);

router.get("/:id", characterDetails);

router.post("/", createCharacter);

router.put("/:id", updateCharacter);

router.delete("/:id", deleteCharacter);

module.exports = router;

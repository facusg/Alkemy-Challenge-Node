const { Router } = require("express");
const { check } = require("express-validator");

const {
  charactersList,
  characterDetails,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} = require("../controllers/characters");

const { existCharacterbyId } = require("../helpers/db-validator");
const { checkJWT } = require("../middlewares/checkJWT");

const { fieldValidator } = require("../middlewares/field-validator");

const router = Router();

router.get("/", charactersList);

router.get(
  "/:id",
  [
    check("id", "Id not vañid").isInt(),
    check("id").custom(existCharacterbyId),

    fieldValidator,
  ],
  characterDetails
);

router.post(
  "/",
  [
    checkJWT,
    check("name", "Name is required").not().isEmpty(),
    check("age", "Age is required").not().isEmpty(),
    check("age", "Age required a number").isInt(),
    check("weight", "Weight is required").not().isEmpty(),
    check("weight", "Weight required a number").isFloat(),
    check("story", "Story is required").not().isEmpty(),
    fieldValidator,
  ],
  createCharacter
);

router.put(
  "/:id",
  [
    checkJWT,
    check("id", "Id not vañid").isInt(),
    check("id").custom(existCharacterbyId),
    fieldValidator,
  ],
  updateCharacter
);

router.delete(
  "/:id",
  [
    checkJWT,
    check("id", "Id not vañid").isInt(),
    check("id").custom(existCharacterbyId),
    fieldValidator,
  ],
  deleteCharacter
);

module.exports = router;

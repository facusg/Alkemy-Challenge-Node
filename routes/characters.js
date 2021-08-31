const { Router } = require("express");
const { check } = require("express-validator");

const {
  charactersList,
  characterDetails,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} = require("../controllers/characters");
const { checkJWT } = require("../middlewares/checkJWT");

const { fieldValidator } = require("../middlewares/field-validator");

const router = Router();

router.get("/", charactersList);

router.get("/:id", characterDetails);

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

router.put("/:id", updateCharacter);

router.delete("/:id", deleteCharacter);

module.exports = router;

const { Router } = require("express");
const { check } = require("express-validator");

const { checkJWT } = require("../middlewares/checkJWT");
const { fieldValidator } = require("../middlewares/field-validator");

const {
  listGenres,
  createGenre,
  updateGenre,
} = require("../controllers/genres");
const { existGenrebyId } = require("../helpers/db-validator");

const router = Router();

router.get("/", listGenres);

router.post(
  "/",
  [checkJWT, check("name", "Name is required").not().isEmpty(), fieldValidator],
  createGenre
);

router.put(
  "/:id",
  [
    checkJWT,
    check("id", "Id not valid").isInt(),
    check("id").custom(existGenrebyId),
    fieldValidator,
  ],
  updateGenre
);

module.exports = router;

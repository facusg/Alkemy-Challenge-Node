const { Router } = require("express");
const { check } = require("express-validator");

const { checkJWT } = require("../middlewares/checkJWT");
const { fieldValidator } = require("../middlewares/field-validator");

const {
  listGenres,
  createGenre,
  updateGenre,
  addMovieToGenre,
  removeMovieToGenre,
} = require("../controllers/genres");
const { existGenrebyId, existMoviebyId } = require("../helpers/db-validator");

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

router.put(
  "/:id/:movieId",
  [
    checkJWT,
    check("id", "Id not vañid").isInt(),
    check("id").custom(existGenrebyId),
    check("movieId").custom(existMoviebyId),
    fieldValidator,
  ],
  addMovieToGenre
);

router.delete(
  "/:id/:movieId",
  [
    checkJWT,
    check("id", "Id not vañid").isInt(),
    check("id").custom(existGenrebyId),
    check("movieId").custom(existMoviebyId),
    fieldValidator,
  ],
  removeMovieToGenre
);

module.exports = router;

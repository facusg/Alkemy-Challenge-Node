const { Router } = require("express");
const { check } = require("express-validator");

const { checkJWT } = require("../middlewares/checkJWT");
const { fieldValidator } = require("../middlewares/field-validator");

const {
  moviesList,
  movieDetails,
  createMovie,
  updateMovie,
  deleteMovie,
  addCharacaterToMovie,
  deleteCharacaterToMovie,
} = require("../controllers/movies");
const {
  existMoviebyId,
  existCharacterbyId,
} = require("../helpers/db-validator");
const { isRateValid } = require("../helpers/rateCheck");

const router = Router();

router.get("/", moviesList);

router.get(
  "/:id",
  [
    check("id", "Id not valid").isInt(),
    check("id").custom(existMoviebyId),
    fieldValidator,
  ],
  movieDetails
);

router.post(
  "/",
  [
    checkJWT,
    check("title", "Title is required").not().isEmpty(),
    check("rate", "Rate is required").not().isEmpty(),
    check("rate").custom(isRateValid),
    check("date", "date is required").not().isEmpty(),
    fieldValidator,
  ],
  createMovie
);

router.put(
  "/:id",
  [
    checkJWT,
    check("id", "Id not valid").isInt(),
    check("id").custom(existMoviebyId),
    fieldValidator,
  ],
  updateMovie
);

router.put(
  "/:id/:characterId",
  [
    checkJWT,
    check("id", "Id not vañid").isInt(),
    check("id").custom(existMoviebyId),
    check("characterId").custom(existCharacterbyId),
    fieldValidator,
  ],
  addCharacaterToMovie
);

router.delete(
  "/:id/:characterId",
  [
    checkJWT,
    check("id", "Id not vañid").isInt(),
    check("id").custom(existMoviebyId),
    check("characterId").custom(existCharacterbyId),
    fieldValidator,
  ],
  deleteCharacaterToMovie
);

router.delete(
  "/:id",
  [
    checkJWT,
    check("id", "Id not vañid").isInt(),
    check("id").custom(existMoviebyId),
    fieldValidator,
  ],
  deleteMovie
);

module.exports = router;

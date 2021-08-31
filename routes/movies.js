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
} = require("../controllers/movies");
const { existMoviebyId } = require("../helpers/db-validator");
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
    check("date", "date is required").isDate(),
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

router.delete("/:id", [], deleteMovie);

module.exports = router;

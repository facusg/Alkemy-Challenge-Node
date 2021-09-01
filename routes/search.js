const { Router } = require("express");
const { check } = require("express-validator");
const { charactersSearch, moviesSearch } = require("../controllers/search");

const { fieldValidator } = require("../middlewares/field-validator");

const router = Router();

router.get("/characters", charactersSearch);

router.get("/movies", moviesSearch);

module.exports = router;

const { Router } = require("express");
const { check } = require("express-validator");

const { checkJWT } = require("../middlewares/checkJWT");
const { fieldValidator } = require("../middlewares/field-validator");

const router = Router();

router.get("/", moviesList);

router.get("/:id", movieDetails);

router.post("/", createMovie);

router.put("/:id", updateMovie);

router.delete("/:id", deleteMovie);

const { Router } = require("express");
const { check } = require("express-validator");

const { fieldValidator } = require("../middlewares/field-validator");

const { login, register } = require("../controllers/auth");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    fieldValidator,
  ],
  login
);

router.post(
  "/register",
  [
    check("email", "Email is required").isEmail(),
    check("name", "Name is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must be at least 8 characters").isLength({
      min: 8,
    }),
    fieldValidator,
  ],
  register
);

module.exports = router;

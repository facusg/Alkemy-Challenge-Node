const { response } = require("express");

const login = (req, res = response) => {
  res.json({ msg: "Login" });
};

const register = (req, res = response) => {
  res.json({ msg: "Register" });
};

module.exports = { login, register };

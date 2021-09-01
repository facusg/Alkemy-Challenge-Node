const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const { createJWT } = require("../helpers/createJWT");
const { sendEmail } = require("../helpers/sendMail");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  console.log(email);

  try {
    //check Email in database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: "Incorrect email or password." });
    }

    // chech State=true
    if (!user.state) {
      return res.status(400).json({ msg: "Incorrect email or password." });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Incorrect email or password." });
    }

    //Create JWT
    const token = await createJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const register = async (req, res = response) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ where: { email } });

  if (user) {
    return res.status(401).json({ msg: "Email is already registered" });
  }

  user = new User({ name, email, password });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  //Create JWT
  const token = await createJWT(user.id);

  sendEmail(email, name);

  res.json({
    user,
    token,
  });
};

module.exports = { login, register };

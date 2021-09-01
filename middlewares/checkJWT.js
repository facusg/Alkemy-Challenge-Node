const { response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const checkJWT = async (req, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ msg: "Not Token" });
  }
  try {
    const { userId } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ msg: "Invalid token - user dont exist" });
    }
    if (!user.state) {
      return res.status(400).json({ msg: "Invalid token -  user.state:false" });
    }
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = {
  checkJWT,
};

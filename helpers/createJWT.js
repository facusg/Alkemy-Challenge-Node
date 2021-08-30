const jwt = require("jsonwebtoken");

const createJWT = (userId = "") => {
  return new Promise((resolve, reject) => {
    const payload = { userId };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Token could not be created");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { createJWT };

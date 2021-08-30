const express = require("express");
const cors = require("cors");

const sequelize = require("../database/db");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.paths = { auth: "/auth" };

    //Database
    this.dbConnection();

    this.middlewares();

    this.routes();
  }

  async dbConnection() {
    try {
      await sequelize.authenticate();
      console.log("Database online");
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    // Public
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server online in port 8080 ");
    });
  }
}

module.exports = Server;

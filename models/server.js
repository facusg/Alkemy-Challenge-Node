const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server online in port 8080 ");
    });
  }
}

module.exports = Server;

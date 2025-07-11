const express = require("express");
const bodyparser = require("body-parser");
const empRoutes = require("./src/config/EmpolyeeRoutes");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./src/model/db");
const port = 8000;
const Url = "127.0.0.1";
app.use(cors());
app.use(bodyparser.json());
app.get("/", (req, res) => {
  res.send("you are loggined");
});
app.get("/ping", (req, res) => {
  res.send("PONG");
});
app.use("/api/empolyes", empRoutes);
app.listen(port, Url, (err) => {
  if (!err) {
    console.log(`the port is listen ${Url}:${port}`);
  }
});

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

//init midlle ware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
require("dotenv").config();

//init db
require("./dbs/init.mongodb");
//init routes
app.get("/", (req, res, next) => {
  return res.status(200).json("hihi".repeat(100));
});
//handling error

module.exports = app;

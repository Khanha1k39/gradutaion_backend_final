const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();
const path = require("path");

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

//init midlle ware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
require("dotenv").config();

//init db
require("./dbs/init.mongodb");
//init routes
app.use("/v1/api", require("./routes/index"));
//handling error
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.status || 500;

  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;

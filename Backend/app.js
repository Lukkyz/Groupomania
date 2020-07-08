var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let Sequelize = require("sequelize");
let dotenv = require("dotenv").config();
let db = require("./db");

db.authenticate()
  .then(console.log("Connection established"))
  .catch((err) => {
    console.error(err);
  });

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
let postRouter = require("./routes/post");
let commentRouter = require("./routes/comment");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

module.exports = app;

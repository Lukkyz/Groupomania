var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let Sequelize = require("sequelize");
let dotenv = require("dotenv").config();
let db = require("./db");
let cors = require("cors");
let relation = require("./models/relations");

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

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

module.exports = app;

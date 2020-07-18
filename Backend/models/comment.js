let Sequelize = require("sequelize");
let db = require("../db");
let Comment = db.define("comment", {
  body: {
    type: Sequelize.STRING,
  },
});

module.exports = Comment;

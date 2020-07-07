let Sequelize = require("sequelize");
let db = require("../db");

let Comment = db.define("comment", {
  body: {
    type: Sequelize.STRING,
  },
});

Comment.hasMany(Comment, { foreignKey: "parent_comment_id" });

module.exports = Comment;

let Sequelize = require("sequelize");
let User = require("./user");
let Comment = require("./comment");
let db = require("../db");

let Post = db.define("post", {
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  body: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
});

Post.hasMany(Comment, { as: "comments", foreignKey: "postId" });

db.sync()
  .then()
  .catch((err) => console.error(err));

module.exports = Post;

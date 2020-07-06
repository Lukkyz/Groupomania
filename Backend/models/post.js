let Sequelize = require("sequelize");
let User = require("./user");
let db = require("../db");

let Post = db.define("post", {
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  text: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
});

db.sync()
  .then()
  .catch((err) => console.error(err));

module.exports = Post;

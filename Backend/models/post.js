let Sequelize = require("sequelize");
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
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  dislikes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});

db.sync()
  .then()
  .catch((err) => console.error(err));

module.exports = Post;

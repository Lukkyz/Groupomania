let Sequelize = require("sequelize");
let db = require("../db");
let User = require("../models/user");
let Post = require("../models/post");

let postLike = db.define(
  "postLike",
  {
    isLiked: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId", "postId"],
      },
    ],
  }
);

db.sync()
  .then()
  .catch((err) => console.error(err));

module.exports = postLike;

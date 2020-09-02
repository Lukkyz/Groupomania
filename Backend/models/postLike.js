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

postLike.beforeDestroy(async (postLike, options) => {
  console.log(postLike);
  if (postLike.isLiked == 1) {
    Post.findOne({
      where: {
        id: postLike.postId,
      },
    }).then((post) => {
      post.score += -1;
      post.save();
    });
  } else if (postLike.isLiked == 0) {
    Post.findOne({
      where: {
        id: postLike.postId,
      },
    }).then((post) => {
      post.score += 1;
      post.save();
    });
  }
});

db.sync()
  .then()
  .catch((err) => console.error(err));

module.exports = postLike;

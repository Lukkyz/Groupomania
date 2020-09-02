let User = require("../models/user");
let Comment = require("../models/comment");
let Post = require("../models/post");
let postLike = require("../models/postLike");

User.hasMany(Post, {
  as: "posts",
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "cascade",
});

User.hasMany(Comment, {
  as: "comments",
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "cascade",
});

Comment.belongsTo(User);
Post.belongsTo(User, { foreignKey: { name: "userId" } });

Post.hasMany(Comment, { as: "comments", foreignKey: "postId" });
Post.belongsTo(User, { foreignKey: { name: "userId" } });

User.hasMany(postLike, {
  as: "userLiked",
  foreignKey: "userId",
  onDelete: "cascade",
  hooks: true,
});

Post.hasMany(postLike, {
  as: "postLiked",
  foreignKey: "postId",
  onDelete: "cascade",
  hooks: true,
});

postLike.belongsTo(User, {
  as: "userLike",
  foreignKey: "userId",
  hooks: true,
});

postLike.belongsTo(Post, {
  as: "postLike",
  foreignKey: "postId",
  hooks: true,
});

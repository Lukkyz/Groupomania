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

postLike.belongsTo(User, { as: "userLike", foreignKey: "userId" });
postLike.belongsTo(Post, { as: "postLike", foreignKey: "postId" });

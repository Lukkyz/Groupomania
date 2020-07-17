let Sequelize = require("sequelize");
let db = require("../db");
let bcrypt = require("bcryptjs");
let Comment = require("./comment");
let Post = require("./post");

let User = db.define("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: {
        args: [/^[\s\w-éàëêâ]{2,23}\w$/],
        msg:
          "Le prénom est invalide. Il doit faire entre 2 et 24 caractères et ne doit pas contenir de caractères spéciaux",
      },
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: {
        args: [/^[\s\w-éàëêâ]{2,23}\w$/],
        msg:
          "Le nom est invalide. Il doit faire entre 2 et 24 caractères et ne doit pas contenir de caractères spéciaux",
      },
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      is: {
        args: [/^\w{3,}@\w{3,}\.\w{2,3}$/],
        msg: "L'email est invalide (ex: john@doe.com)",
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: {
        args: [/^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,24}$/],
        msg:
          "Le mot de passe doit faire entre 8 et 24 caractères, doit contenir une lettre majuscule et minuscule, un chiffre et un caractère spécial",
      },
    },
  },
});

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

Post.belongsTo(User, { foreignKey: { name: "userId" } });

User.beforeCreate(async (user, options) => {
  let salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

db.sync()
  .then()
  .catch((err) => console.error(err));

module.exports = User;

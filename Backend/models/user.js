let Sequelize = require("sequelize");
let db = require("../db");

let User = db.define("user", {
  firstName: {
    type: Sequelize.STRING,
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
    validate: {
      is: {
        args: [/^\w{3,}@\w{3,}\.\w{2,3}$/],
        msg: "L'email est invalide (ex: john@doe.com)",
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      is: {
        args: [/^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,24}$/],
        msg:
          "Le mot de passe doit faire entre 8 et 24 caractères, doit contenir une lettre majuscule et minuscule, un chiffre et un caractère spécial",
      },
    },
  },
});

db.sync()
  .then()
  .catch((err) => console.error(err));

module.exports = User;

let User = require("../models/user");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let dotenv = require("dotenv").config();

exports.signup = (req, res, next) => {
  console.log(req.body);
  let { firstName, lastName, email, password } = req.body;
  User.create({
    firstName,
    lastName,
    email,
    password,
  })
    .then((data) =>
      res.status(201).json({ message: "Vous êtes maintenant inscris !" })
    )
    .catch((err) => console.error(err));
};

exports.login = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(401).json({ error: "Cette utilisateur n'existe pas'" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.status(405).json({ error: "Mot de passe incorrect ! " });
          }
          res.status(200).json({
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
              expiresIn: "1h",
            }),
          });
        })
        .catch((err) => res.status(500).json({ err }));
    })
    .catch((err) => res.status(500).json({ msg: "NON" }));
};

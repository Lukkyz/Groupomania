let User = require("../models/user");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let dotenv = require("dotenv").config();

exports.signup = (req, res, next) => {
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
    .then(async (user) => {
      if (!user) {
        res.status(401).json({ error: "Cette utilisateur n'existe pas'" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({ error: "Mot de passe incorrect ! " });
          } else {
            let refreshToken = jwt.sign(
              { userId: user.id },
              process.env.JWT_REFRESH_SECRET,
              {
                expiresIn: "7d",
              }
            );
            res.cookie("refreshtoken", refreshToken, {
              httpOnly: true,
              path: "user/refresh_token",
            });
            let accessToken = jwt.sign(
              { userId: user.id },
              process.env.JWT_SECRET,
              { expiresIn: "15m" }
            );
            res.status(200).json({
              userId: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              token: accessToken,
            });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.refreshToken = (req, res, next) => {
  let token = req.cookies.refreshtoken;
  if (!token) return res.send({ accesstoken: "" });
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    console.log(payload);
    User.findOne({
      where: {
        id: payload.userId,
      },
    }).then((user) => {
      let newToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1m",
      });
      res.send({
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        token: newToken,
      });
    });
  } catch (err) {
    return res.send({ accesstoken: "" });
  }
};

exports.logOut = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json();
  } catch (e) {
    res.status(400);
  }
};

let Comment = require("../models/comment");

exports.modify = (req, res, next) => {
  let body = req.body.body;
  Comment.findOne({
    where: {
      id: req.params.id,
    },
  }).then(async (comment) => {
    comment
      .update({
        body,
      })
      .then(() =>
        res
          .status(200)
          .json({ message: "Votre commentaire a bien été modifié" })
      )
      .catch((err) => res.status(500).json({ err }));
  });
};

exports.delete = (req, res, next) => {
  Comment.findOne({
    where: {
      id: req.params.id,
    },
  }).then((comment) => {
    comment
      .destroy()
      .then(() =>
        res.status(200).json({ message: "Le commentaire a bien été supprimé" })
      )
      .catch((err) => res.status(500).json({ err }));
  });
};

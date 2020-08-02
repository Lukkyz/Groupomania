let Comment = require("../models/comment");
let User = require("../models/user");

exports.getAll = (req, res, next) => {
  Comment.findAll({
    order: [["parent_comment_id", "ASC"]],
  }).then((comments) => res.status(201).json(comments));
};

exports.commentUser = (req, res, next) => {
  Comment.findAll({
    where: {
      userId: req.params.userid,
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["firstName", "lastName"],
      },
    ],
  }).then((comment) => res.status(201).json(comment));
};

exports.create = (req, res, next) => {
  console.log(req.body);
  let { body, parentCommentId, postId, userId } = req.body;
  Comment.create(
    {
      body,
      parent_comment_id: parentCommentId,
      postId,
      userId,
    },
    {
      include: [
        { model: User, as: "user", attributes: ["firstName", "lastName"] },
      ],
    }
  )
    .then((comment) => {
      return comment.reload();
    })
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((err) => res.status(500).json({ err }));
};

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

let Post = require("../models/post");
let Comment = require("../models/comment");
let User = require("../models/user");

exports.getAll = (req, res, next) => {
  Post.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["firstName", "lastName"],
      },
      {
        model: Comment,
        as: "comments",
        include: [
          {
            model: User,
            as: "user",
            attributes: ["firstName", "lastName"],
          },
        ],
      },
    ],
  }).then((posts) => {
    res.status(200).json(posts);
  });
};

exports.getOne = (req, res, next) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Comment,
      as: "comments",
    },
  }).then((post) => res.status(200).json(post));
};

exports.create = (req, res, next) => {
  console.log(req.body);
  let { title, body, userId } = req.body;
  Post.create(
    {
      title,
      body,
      userId,
    },
    {
      include: [
        { model: User, as: "user", attributes: ["firstName", "lastName"] },
      ],
    }
  )
    .then((post) => {
      return post.reload();
    })
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => res.status(500).json({ err }));
};

exports.modify = async (req, res, next) => {
  let { title, body } = req.body;
  let post = await Post.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (post) {
    await post.update({
      title,
      body,
    });
    res.json(200).json({ message: "Votre topic a bien été modifié !" });
  }
};

exports.delete = async (req, res, next) => {
  let post = await Post.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (post) {
    post
      .destroy()
      .then(() => {
        res.status(200).json({ message: "Votre post a bien été supprimé" });
      })
      .catch((err) => res.status(500).json({ err }));
  }
};

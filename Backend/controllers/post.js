let Post = require("../models/post");
let Comment = require("../models/comment");
let User = require("../models/user");
let postLike = require("../models/postLike");

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

exports.postUser = (req, res, next) => {
  Post.findAll({
    where: {
      userId: req.params.userid,
    },
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
  }).then((posts) => res.status(201).json(posts));
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

exports.manageLike = (req, res, next) => {
  let like = 0;
  let dislike = 0;
  switch (req.body.like) {
    case 1:
      postLike
        .create({
          isLiked: 1,
          postId: req.params.id,
          userId: req.body.userId,
        })
        .then(() => res.status(200).json({ message: "Post liké !" }));
      like = 1;
      break;
    case 0:
      postLike
        .findOne({
          where: {
            postId: req.params.id,
            userId: req.body.userId,
          },
        })
        .then((postLike) => {
          if (postLike == 0) {
            dislike = -1;
          } else {
            like = -1;
          }
          postLike
            .destroy()
            .then(() => res.status(200).json({ message: "Action annulé" }));
        })
        .catch((err) => res.status(500).json({ err }));
      break;
    case -1:
      postLike
        .create({
          isLiked: 0,
          postId: req.params.id,
          userId: req.body.userId,
        })
        .then(() => res.status(200).json({ message: "Post disliké !" }));
      dislike = 1;
      break;
  }
  Post.findOne({
    where: {
      id: req.params.id,
    },
  }).then((post) => {
    post.likes += like;
    post.dislikes += dislike;
    post.save();
  });
};

exports.getDisliked = (req, res, next) => {
  postLike
    .findAll({
      where: {
        isLiked: 1,
        userId: req.params.userId,
      },
    })
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json(err));
};

exports.getLiked = (req, res, next) => {
  postLike
    .findAll({
      where: {
        isLiked: 1,
        userId: req.params.userId,
      },
      attributes: ["postId"],
    })
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json(err));
};

exports.getDisliked = (req, res, next) => {
  postLike
    .findAll({
      where: {
        isLiked: 0,
        userId: req.params.userId,
      },
      attributes: ["postId"],
    })
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json(err));
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

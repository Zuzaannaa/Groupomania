const db = require("../models");
const User = db.users;
const Post = db.posts;
//const Op = db.Sequelize.Op;
//const config = require("../config/config");

exports.createPost = (req, res, next) => {
  const post = new Post({
    message: req.body.message,
    userId: req.body.userId,
    // image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  post
    // Posts.create(post)
    //   .then((post) => {
    // res.send(post);
    .save()
    .then(() => res.status(201).json({ message: "Post created!" }))
    .catch((error) => res.status(400).json({ error }));

  //  .catch((error) => res.status(500).json({ error }));
  // };

  //  //   })

  //     .catch((err) => {
  //       res.status(500).send({
  //         message: err.message || "Cannot post",
  //       });
  //     });
  // };

  exports.getOnePost = (req, res, next) => {
    const id = req.params.id;
    Post.findByPk(id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Cannot find post of id: =" + id,
        });
      });
  };
};

exports.findAll = (req, res, next) => {
  Post.findAll({
    include: [{ model: User }],
    order: [
      ["updatedAt", "DESC"],
      ["createdAt", "DESC"],
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error displaying all posts",
      });
    });
};

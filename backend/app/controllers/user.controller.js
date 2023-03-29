const db = require("../models");
const User = db.users;
const config = require("../config/config");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create and Save a new User
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "User created!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  //const project = await Project.findOne({ where: { title: 'My Title' } });
  User.findOne({ where: { email: req.body.email } })

    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found!" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Incorrect password" });
          }
          let token_gen = jwt.sign({ userId: user.id }, `${config.JWT_TOKEN}`, {
            expiresIn: "24h",
          });

          res.status(200).json({
            userId: user.id,
            token: token_gen,
            message: "User logged in!",
          });
        })
        .catch((error) => res.status(500).json({ error: "Other error" }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.delete = (req, res) => {
  console.log("User Id", req.params.id);
  try {
    User.destroy({ where: { id: req.params.id } })
      .then(() => {
        console.log("User deleted");
        res.status(200);
      })
      .catch((error) => res.status(400).json(error));
  } catch {
    (error) => res.status(500).json(error);
  }
};

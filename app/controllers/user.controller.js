const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
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
          let token_gen = jwt.sign(
            { userId: user._id },
            //"123456",

            `${config.JWT_TOKEN}`,
            { expiresIn: "24h" }
          );

          res.status(200).json({
            userId: user._id,
            token: token_gen,
            message: "User logged in!",
          });
        })
        .catch((error) => res.status(500).json({ error: "Other error" }));
    })
    .catch((error) => res.status(500).json({ error }));
};

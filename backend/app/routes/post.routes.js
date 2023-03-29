const express = require("express");
const path = require("path");
module.exports = (app) => {
  const multer = require("../../middleware/multer-config");
  var router = require("express").Router();
  const post = require("../controllers/post.controller.js");

  //const auth = require("../middleware/auth.js");
  const auth = require("../../middleware/auth");

  //create a post
  router.post("/", post.createPost);

  //get one post
  //router.get("/:id", auth, post.getOnePost);

  //get all posts
  //router.get("/", auth, post.findAll); ADD BACK!

  router.get("/", post.findAll);

  app.use("/api/posts", router);
  app.use("/images", express.static(path.join(__dirname, "images")));

  console.log("post route loaded");
};

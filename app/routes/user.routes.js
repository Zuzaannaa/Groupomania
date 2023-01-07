module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.post("/signup", users.signup);
  router.post("/login", users.login);
  app.use("/api/users", router);

  console.log("user route loaded");
};

const express = require("express");
const cors = require("cors");
const config = require("./app/config/config.js");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync({ force: false, alter: true }).then(() => {
  console.log(" re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "It's My app" });
});

require("./app/routes/user.routes")(app);
require("./app/routes/post.routes")(app);

// set port, listen for requests
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

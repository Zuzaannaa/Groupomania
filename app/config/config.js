const path = require("path");

//dotenv.config({
//  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
//});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "dev",
  JWT_TOKEN: process.env.JWT_TOKEN,
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 8080,
};

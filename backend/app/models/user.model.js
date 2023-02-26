/*"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        onDelete: "cascade",
        foreignKey: { name: "id", allowNull: false },
        hooks: true,
      });
    }
  }

  User.init(
    {
      email: { type: Sequelize.STRING, allowNull: false, unique: false }, //change back to true
      password: Sequelize.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
}; */

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },

    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
  });

  return User;
};

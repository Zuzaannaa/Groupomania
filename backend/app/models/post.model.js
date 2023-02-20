/*"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        onDelete: "cascade",
        foreignKey: { name: "id", allowNull: false },
        hooks: true,
      });
    }
  }
  Post.init(
    {
      message: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
}; */

module.exports = (sequelize, Sequelize, user) => {
  const Posts = sequelize.define(
    "post",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
        required: false,
      },
    },
    {
      tableName: "Posts",
      freezeTableName: true,
    }
  );

  Posts.associate = function (models) {
    Posts.belongsTo(models.User, {
      foreignKey: "id",
      as: "author",
      onDelete: "cascade",
    });
  };
  return Posts;
};

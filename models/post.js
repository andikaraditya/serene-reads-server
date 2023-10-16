'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
      Post.belongsTo(models.Book)
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: "title cannot be null",
        notEmpty: "title cannot be empty"
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: "content cannot be null",
        notEmpty: "content cannot be empty"
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: "UserId cannot be null",
        notEmpty: "UserId cannot be empty"
      }
    },
    BookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: "BookId cannot be null",
        notEmpty: "BookId cannot be empty"
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
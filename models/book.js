'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.Post)
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: "title cannot be null",
        notEmpty: "title cannot be empty"
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: "author cannot be null",
        notEmpty: "author cannot be empty"
      }
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: "summary cannot be null",
        notEmpty: "summary cannot be empty"
      }
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: "isbn cannot be null",
        notEmpty: "isbn cannot be empty"
      }
    },
    imageUrl: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
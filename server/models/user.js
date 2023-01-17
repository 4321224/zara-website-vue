"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        foreignKey: "authorId",
      });
      User.hasMany(models.Wishlist, {
        foreignKey: "authorId"
      })
    }
  }
  User.init(
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "username is required",
          },
          notNull: {
            msg: "username is required",
          },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: {
          msg: "email must be unique",
        },
        validate: {
          notEmpty: {
            msg: "email is required",
          },
          notNull: {
            msg: "email is required",
          },
          isEmail: {
            msg: "format email is required",
          },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,

        validate: {
          notEmpty: {
            msg: "password is required",
          },
          notNull: {
            msg: "password is required",
          },
          len: {
            args: 5,
            msg: "password min 5"
          },
        },
      },
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};

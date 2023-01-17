"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
      Product.belongsTo(models.User, {
        foreignKey: "authorId",
      });
      Product.hasMany(models.Wishlist, {
        foreignKey: "productId"
      })
    }
  }
  Product.init(
    {
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "name is required",
          },
          notNull: {
            msg: "name is required",
          },
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "description is required",
          },
          notNull: {
            msg: "description is required",
          },
        },
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "price is required",
          },
          notNull: {
            msg: "price is required",
          },
          min: {
            args: 5,
          },
        },
      },
      stock: DataTypes.INTEGER,
      imgUrl: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};

const { Product } = require("../models");
const authorization = async (req, res, next) => {
  try {
    let product = await Product.findByPk(req.params.id);

    if (!product) {
      throw { name: "product not found" };
    }
    if (product.authorId == req.user.id || req.user.role === "admin") {
      next();
    } else {
      throw { name: "forbidden" };
    }
  } catch (error) {
    next(error);
  }
};

const authorizationStatus = async (req, res, next) => {
  try {
    // console.log("masuk author");
    const { id } = req.params;
    let product = await Product.findByPk(id);
    if (!product) throw { name: "Product not found" };
    if (req.user.role !== "admin") throw { name: "Forbidden" };
    
    next();
  } catch (error) {
    next(error);
  }
};

const authorizationWishlist = async (req, res, next) => {
  try {
    if ( req.user.role === "customer") {
      next();
    } else {
      throw { name: "forbidden" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authorization, authorizationStatus, authorizationWishlist };

const { generateToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const { User, Product, Category, Wishlist } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { Op, where } = require("sequelize");

class CustomController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      await User.create({
        username,
        email,
        password,
        role: "customer",
        phoneNumber,
        address,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Register success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { message: "validation is required" };
      const data = await User.findOne({ where: { email } });
      if (!data) {
        throw { name: "User not found" };
      }
      const isPasswordMatch = comparePassword(password, data.password);
      if (!isPasswordMatch) {
        throw { name: "invalid email/password" };
      }

      const token = generateToken({
        id: data.dataValues.id,
        username: data.dataValues.username,
        email: data.dataValues.email,
        role: data.dataValues.role,
      });

      res.status(200).json({
        statusCode: 200,
        access_token: token,
        username: data.dataValues.username,
        role: data.dataValues.role,
        message: "login success",
      });
    } catch (error) {
      next(error);
    }
  }
  static async googleLogIn(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_LOGIN);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.GOOGLE_LOGIN,
      });
      const payload = ticket.getPayload();
      console.log(payload, "<<< ini payload");
      const data = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "ini dari google",
          role: "customer",
          phoneNumber: "12345",
          address: "jakarta",
        },
        hooks: false,
      });
      let user = data[0];
      const access_token = generateToken({
        id: user.id,
      });
      console.log(access_token, "ini access token");
      res.status(201).json({
        statusCode: 201,
        access_token: access_token,
        username: user.username,
        id: user.id,
        role: user.role,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async allProduct(req, res, next) {
    try {
      const { search, page } = req.query;
      const pagination = {
        limit: 8,
        where: {
          status: "active",
        },
      };
      if (page) {
        pagination.offset = (page - 1) * 8;
      }
      if (search) {
        pagination.where.name = {
          [Op.iLike]: `%${search}%`,
        };
      }
      const product = await Product.findAndCountAll(pagination);
      const totalPage = Math.ceil(product.count / 8);
      if (!totalPage) {
        throw { name: "Not Found" };
      }
      res.status(200).json({
        statusCode: 200,
        data: product.rows,
        totalPage: totalPage,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getProductById(req, res, next) {
    try {
      const id = req.params.id;
      console.log(id, "<<< ini id product");
      if (!id) throw { name: "Not found" };
      let product = await Product.findOne({
        where: { id },
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
        ],
      });
      if (!product) throw { name: "Not Found" };
      res.status(200).json({
        statusCode: 200,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
  static async wishListProduct(req, res, next) {
    try {
      const { id, role } = req.user;
      if (role !== "customer") {
        throw { name: "Forbidden" };
      }
      const product = await Product.findByPk(req.params.id);
      console.log(product.dataValues, "<-- ");
      if (!req.params.id || !product) {
        throw { name: "Product Not found" };
      }
      let data = await Wishlist.create({
        authorId: id,
        productId: req.params.id,
      });
      res.status(201).json({
        code: 201,
        data: data,
        dataProduct: product.dataValues,
        message: "success add to my list",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async readWishlist(req, res, next) {
    try {
      let wishlist = await Wishlist.findAll({
        where: { authorId: req.user.id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Product,
            include: [
              {
                model: Category,
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          { model: User, attributes: { exclude: ["createdAt", "updatedAt"] } },
        ],
      });
      if (!wishlist) throw { name: "data not found" };
      res.status(200).json({
        statusCode: 200,
        data: wishlist,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomController;

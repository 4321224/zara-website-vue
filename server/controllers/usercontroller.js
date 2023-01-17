const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      await User.create({
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });

      res.status(201).json({
        code: 201,
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
      console.log(data.dataValues, "<== ini data");
      const token = generateToken({
        id: data.dataValues.id,
        username: data.dataValues.username,
        email: data.dataValues.email,
        role: data.dataValues.role,
      });
      // console.log(token, "<<<ini access token");
      res.status(200).json({
        Code: 200,
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
      const data = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "ini dari google",
          role: "Staff",
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
      // console.log(err, "<<<<");
      res.status(500).json(err);
    }
  }
}

module.exports = UserController;

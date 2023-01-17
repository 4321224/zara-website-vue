const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  // console.log("masuk authen", req.headers.access_token );
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw { name: "nggak bisa masuk dong" };
    }
    let payload = verifyToken(access_token);
    // console.log(payload, "ini payload");
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Invalid email or password" };
    }
    req.user = {
      id: user.id,
      email: user.email,
      name: user.username,
      role: user.role,
    };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = authentication;

const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

const admin = {
  username: "kareen",
  email: "kareen@mail.com",
  password: "12345",
  role: "admin",
  phoneNumber: "08237828224",
  address: "Jakarta",
};

const customer = {
  username: "nana",
  email: "nana@mail.com",
  password: "12345",
  role: "customer",
  phoneNumber: "08917386242",
  address: "Jakarta",
};

let user = require("../data/user.json");
user.forEach((el) => {
  el.password = hashPassword(el.password);
  el.createdAt = new Date();
  el.updatedAt = new Date();
});
let category = require("../data/category.json");
category.forEach((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
});
let product = require("../data/product.json");
product.forEach((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
});
let wishlist = require("../data/wishlist.json");
wishlist.forEach((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
});

let access_token_cus;
let access_token_admin;

beforeAll(async () => {
  const registeredCustomer = await User.create(customer);
  access_token_cus = generateToken({
    id: registeredCustomer.id,
    email: registeredCustomer.email,
  });

  const registeredAdmin = await User.create(admin);
  access_token_admin = generateToken({
    id: registeredAdmin.id,
    email: registeredAdmin.email,
  });
  await queryInterface.bulkInsert("Users", user, null);
  await queryInterface.bulkInsert("Categories", category, null);
  await queryInterface.bulkInsert("Products", product, null);
  await queryInterface.bulkInsert("Wishlists", wishlist, null);
});

afterAll(async () => {
  await queryInterface.bulkDelete("Products", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("Wishlists", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("GET  /pub/wishlist", () => {
  test("Hit GET /pub/wishlist from customer, get 200 - OK", () => {
    return request(app)
      .get("/pub/wishlist")
      .set("access_token", access_token_cus)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("statusCode", 200);
        expect(response.body).toHaveProperty("data", expect.any(Array));
      });
  });
  test("Hit POST /pub/wishlist from , get 201 - OK", () => {
    return request(app)
      .post("/pub/wishlist/5")
      .set("access_token", access_token_cus)
      .then((response) => {
        // console.log(response.body, "ini respon wishlist");
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("code", 201);
        expect(response.body).toHaveProperty("data", expect.any(Object));
        expect(response.body).toHaveProperty("dataProduct", expect.any(Object));
        expect(response.body.message).toEqual("success add to my list");
      });
  });
  test("Hit GET /pub/wishlist from customer, get 404 - Not found", () => {
    return request(app)
    .get("/pub/wishlist/21")
    .set("access_token", access_token_cus)
    .then((response) => {
      console.log(response, "<--ini wishlist 404");
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("statusCode", 404);
        expect(response.body.error.statusMessage).toEqual("Not Found");

    });
  } )
  test("Hit GET /pub/wishlist from customer without access token , get 401 -Unauthorized ", () => {
    return request(app)
      .get("/pub/wishlist")
      .then((response) => {
        // console.log(response, "<<< 401");
        expect(response.statusCode).toBe(401);
        expect(response.body.error.message).toEqual("Invalid email or password");
      });
  });
  test("Hit GET /pub/wishlist from admin, get 403 - forbidden", () => {
    return request(app)
      .get("/pub/wishlist")
      .set("access_token", access_token_admin)
      .then((response) => {
        // console.log(response, "<<<403");
        expect(response.statusCode).toBe(403);
        expect(response.body.error.message).toEqual("Cannot delete this product");
      });
  });
});

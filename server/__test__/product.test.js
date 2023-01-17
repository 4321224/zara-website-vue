const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt");

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

beforeAll(async () => {
  await queryInterface.bulkInsert("Users", user, null);
  await queryInterface.bulkInsert("Categories", category, null);
  await queryInterface.bulkInsert("Products", product, null);
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
});

describe("GET /pub/products", () => {
  test("Hit GET /pub/products without any query/search parameter , get 200 - OK ", () => {
    return request(app)
      .get("/pub/products")
      .then((response) => {
        // console.log(response.body, "<<<<");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("statusCode", 200);
        expect(response.body).toHaveProperty("data", expect.any(Array));
        expect(response.body).toHaveProperty("totalPage", expect.any(Number));
      });
  });
  test("Hit GET /pub/products with any query/search parameter , get 200 - OK ", () => {
    return request(app)
      .get("/pub/products?search=mini")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("statusCode", 200);
        expect(response.body).toHaveProperty("data", expect.any(Array));
        expect(response.body).toHaveProperty("totalPage", expect.any(Number));
      });
  });
  test("Hit GET /pub/products with pagination parameter , get 200 - OK ", () => {
    return request(app)
      .get("/pub/products?page=2")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("data", expect.any(Array));
        expect(response.body).toHaveProperty("totalPage", expect.any(Number));
      });
  });
  test("Hit GET /pub/products with params id , get 200 - OK ", () => {
    return request(app)
      .get("/pub/products/2")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("data");
      });
  });
  test("Hit GET /pub/products with params not found, get 404 - Not Found ", () => {
    return request(app)
      .get("/pub/products/25")
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body.error.message).toEqual("Product not found");
      });
  });
});

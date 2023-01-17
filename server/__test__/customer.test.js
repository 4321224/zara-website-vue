const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt");
const { generateToken}  = require("../helpers/jwt")

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
let wishlist = require("../data/wishlist.json")
wishlist.forEach((el) => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
})

beforeAll(async () => {
  await queryInterface.bulkInsert("Users", user, null);
})  

afterAll(async () => {
  // await User.destroy({
  //   truncate: true,
  //   cascade: true,
  //   restartIdentity: true,
  // });
  await queryInterface.bulkDelete('Users', null, {
    truncate: true,
    restartIdentity: true,
    cascade: true
})
});

//success register
describe("POST /pub/register", () => {
  test("Hit POST /pub/register to get status code 201 - Created ", () => {
    return request(app)
      .post("/pub/register")
      .send({
        username: "dinda",
        email: "dinda@gmail.com",
        password: "123456",
        role: "customer",
        phoneNumber: "0814243467",
        address: "Jakarta",
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toEqual("Register success");

        // expect(response.body).toHaveProperty("message");
      });
  });

  //Email tidak diberikan / tidak diinput, ini tidak bisa jalan error di message malah kasih output []
  test("Hit POST /pub/register without email to get status code 400 - Bad request ", () => {
    return request(app)
      .post("/pub/register")
      .send({
        username: "nana",
        password: "123456",
        role: "customer",
        phoneNumber: "0814243467",
        address: "Jakarta",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.error.message).toEqual(["email is required"]);
      });
  });
  test("Hit POST /pub/register without password to get status code 400 - Bad request ", () => {
    return request(app)
      .post("/pub/register")
      .send({
        username: "nana",
        email: "nana@gmail.com",
        role: "customer",
        phoneNumber: "0814243467",
        address: "Jakarta",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.error.message).toEqual(["password is required"]);
      });
  });
  test("Hit POST /pub/register without email value to get status code 400 - Bad request ", () => {
    return request(app)
      .post("/pub/register")
      .send({
        username: "nana",
        email: "",
        password: "123456",
        role: "customer",
        phoneNumber: "0814243467",
        address: "Jakarta",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.error.message).toEqual([
          "email is required",
          "format email is required",
        ]);
      });
  });
  test("Hit POST /pub/register without password value to get status code 400 - Bad request ", () => {
    return request(app)
      .post("/pub/register")
      .send({
        username: "nana",
        email: "nana@gmail.com",
        password: "",
        role: "customer",
        phoneNumber: "0814243467",
        address: "Jakarta",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.error.message).toEqual([
          "password is required",
          "password min 5",
        ]);
      });
  });
  test("Hit POST /pub/register with registed account to get status code 400 - Bad request ", () => {
    return request(app)
      .post("/pub/register")
      .send({
        username: "dinda",
        email: "dinda@gmail.com",
        password: "123456",
        role: "customer",
        phoneNumber: "0814243467",
        address: "Jakarta",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.error.message).toEqual(["email must be unique"]);
      });
  });
  test("Hit POST /pub/register with wrong email format to get status code 400 - Bad request ", () => {
    return request(app)
      .post("/pub/register")
      .send({
        username: "nana",
        email: "nana-gmail.com",
        password: "123456",
        role: "customer",
        phoneNumber: "0814243467",
        address: "Jakarta",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.error.message).toEqual([
          "format email is required",
        ]);
      });
  });
});

//success login
describe("POST /pub/login", () => {
  test("Hit POST /pub/login to get status code 200 - OK ", () => {
    return request(app)
      .post("/pub/login")
      .send({
        email: "nana@gmail.com",
        password: "123456",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("statusCode");
        expect(response.body).toHaveProperty("access_token");
        expect(response.body).toHaveProperty("username");
        expect(response.body).toHaveProperty("role");
        expect(response.body).toHaveProperty("message");
      });
  });
  test("Hit POST /pub/login with wrong password to get status code 401 - Unauthorized ", () => {
    return request(app)
      .post("/pub/login")
      .send({
        email: "nana@gmail.com",
        password: "111111",
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.body.error.message).toEqual(
          "Invalid email or password",
        );
      });
  });
  test("Hit POST /pub/login with user not found to get status code 404 - Not Found ", () => {
    return request(app)
      .post("/pub/login")
      .send({
        email: "anne@gmail.com",
        password: "111111",
      })
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body.error.message).toEqual(
          "User Not Found",
        );
      });
  });
});

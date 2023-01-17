if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = require("./router");
const cors = require('cors')
const errorHandler = require("./middleware/errorHanddler");
const app = express();


app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

app.use(errorHandler)



module.exports = app

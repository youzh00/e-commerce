const print = (args) => console.log(args);

//!--------------Requirement---------------//
const express = require("express");
const products = require("./data/products");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const connect = require("./DB_Config/dataBase");
const colors = require("colors");
const productsRouter = require("./routes/productsRoutes");
const { notFound, errorHandler } = require("./middleware/errorMidlleware");

//!-------------Code part------------------//
connect();
app.use(productsRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  print(`your server runnning up on ${port}`.yellow.bold);
});

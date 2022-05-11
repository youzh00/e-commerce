const print = (args) => console.log(args);

//!--------------Requirement---------------//
require("express-async-errors");
const express = require("express");
const products = require("./data/products");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const colors = require("colors");
const productsRouter = require("./routes/productsRoutes");
const { notFound, errorHandler } = require("./middleware/errorMidlleware");

//!-------------Code part------------------//

app.use("/products", productsRouter);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      print(`your server runnning up on ${port}`.yellow.bold);
    });
  } catch (error) {
    console.error(error);
  }
};

start();

const print = (args) => console.log(args);

//!--------------Requirement---------------//
require("express-async-errors");
const express = require("express");
const products = require("./data/products");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const paypalClientID = process.env.PAYPAL_CLIENT_ID;
const connectDB = require("./config/db");
const colors = require("colors");
const productsRouter = require("./routes/productsRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const { notFound, errorHandler } = require("./middleware/errorMidlleware");

//!-------------Code part------------------//

app.use(express.json());
app.use(cors());

app.get("/config/paypal", (req, res) => res.send({ paypalClientID }));
app.use("/products", productsRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    console.log("before db");
    await connectDB();
    app.listen(port, () => {
      print(`your server runnning up on ${port}`.yellow.bold);
    });
  } catch (error) {
    console.log("error");
    console.error(error);
  }
};

start();

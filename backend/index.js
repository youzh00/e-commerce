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

//!-------------Code part------------------//
connect();
app.use(productsRouter);
app.get("/", (req, res) => {
  res.send("hahahhahaa");
});

// app.get("/api/products", (req, res) => {
//   res.send(products);
// });

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.send(product);
});

app.listen(port, () => {
  print(`your server runnning up on ${port}`.yellow.bold);
});

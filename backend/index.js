//!--------------Requirement---------------//
const express = require("express");
const products = require("./data/products");
const app = express();
const port = process.env.PORT || 5000;

//!-------------Code part------------------//

app.get("/", (req, res) => {
  res.send("hahahhahaa");
});

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.send(product);
});

app.listen(port, () => {
  console.log(`your server runnning up on ${port}`);
});

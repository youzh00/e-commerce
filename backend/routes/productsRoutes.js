const print = (args) => console.log(args);
//!--------------Requirement---------------//
const mongoose = require("mongoose");
const Product = require("../models/productModel");
const express = require("express");
const colors = require("colors");
const router = express.Router();
const asyncHandler = require("express-async-handler");
//!-------------Code part------------------//
//get products from the database
router.get(
  "/products",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

//get only one product from the database
router.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      res.send(product);
    } else {
      throw new Error("Product not found");
    }
  })
);

module.exports = router;

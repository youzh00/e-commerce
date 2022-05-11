const print = (args) => console.log(args);
//!--------------Requirement---------------//
const mongoose = require("mongoose");
const Product = require("../models/productModel");
const express = require("express");
const colors = require("colors");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
} = require("../controllers/productsController");
//!-------------Code part------------------//
//get products from the database
router.route("/").get(getAllProducts);

//get only one product from the database
router.route("/:id").get(getProduct);

module.exports = router;

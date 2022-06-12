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
  deleteProduct,
  updateProduct,
  createProduct,
  createReview,
} = require("../controllers/productsController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

//!-------------Code part------------------//
//get products from the database
router.route("/").get(getAllProducts).post(protect, isAdmin, createProduct);

//get only one product from the database
router.route("/:id/reviews").post(protect, createReview);
router
  .route("/:id")
  .get(getProduct)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

module.exports = router;

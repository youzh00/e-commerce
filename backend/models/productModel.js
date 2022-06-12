const print = (args) => console.log(args);
//!--------------Requirement---------------//
const mongoose = require("mongoose");
//!-------------Model part------------------//

//review schema
const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      ref: "User",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

//productSchema
const productSchema = mongoose.Schema(
  {
    user: {
      ref: "User",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
    brand: {
      required: true,
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numViews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

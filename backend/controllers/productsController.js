const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    res.status(200).json(product);
  } else {
    throw new Error("Product not found");
  }
};

// delete product by an admin
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.delete();
    res.json({ message: "Product deleted successfully" });
  } else {
    res.status(404);
    throw Error("User not found");
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  deleteProduct,
};

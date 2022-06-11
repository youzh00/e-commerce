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

// create a new product by an admin
const createProduct = async (req, res) => {
  const product = new Product({
    name: "Product Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Brand",
    category: "Category",
    countInStock: 0,
    numReviews: 0,
    description: "Description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// update an existing product by an admin
// products/:id
const updateProduct = async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw Error("User not found");
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
};

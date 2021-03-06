const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: { $regex: req.query.keyword, $options: "i" },
      }
    : {};

  const count = await Product.count({ ...keyword });
  console.log(count);

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
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
    name: "Produit",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Marque",
    category: "Catégorie",
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

// Create new review
// products/:id/review
const createReview = async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((sum, review) => review.rating + sum, 0) /
      product.reviews.length;

    await product.save();
    res.status(200).json({ message: "Review saved successfully" });
  } else {
    res.status(404);
    throw Error("User not found");
  }
};

// getting top rated products
// /products/top
const getTopProducts = async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
};

module.exports = {
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
  createReview,
  getTopProducts,
};

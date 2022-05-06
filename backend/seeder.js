const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const users = require("./data/users");
const products = require("./data/products");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const Orser = require("./models/orderModel");
const connect = require("./DB_Config/dataBase");
const Order = require("./models/orderModel");

dotenv.config();
connect();

const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data importes successfully".green.bold);
  } catch (error) {
    console.log(`${error}`.red.underline);
  }
};
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log("Data destroyes");
  } catch (error) {
    console.log(`${error}`.red.underline);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

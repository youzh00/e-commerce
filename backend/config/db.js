const print = (args) => console.log(args);
//!-------------Requirement--------------//
const mongoose = require("mongoose");

const connectDB = async () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/test");
};
module.exports = connectDB;

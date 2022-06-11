const print = (args) => console.log(args);
//!-------------Requirement--------------//
const mongoose = require("mongoose");

const connectDB = async () => {
  return mongoose.connect(process.env.MONGODB_URL);
};
module.exports = connectDB;

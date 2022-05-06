const print = (args) => console.log(args);
//!--------------Requirement---------------//
const mongoose = require("mongoose");
const validator = require("validator");
//!-------------Model part------------------//
const userSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address !!");
        }
      },
    },
    password: {
      required: true,
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

const print = (args) => console.log(args);
//!--------------Requirement---------------//
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);

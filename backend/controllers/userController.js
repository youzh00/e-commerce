const User = require("../models/userModel");

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: user.generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: user.generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw Error("User not found");
  }
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: updateUser.generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw Error("User not found");
  }
};

// access {{url}}/admin/users
// getting all users for admin account
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// access {{url}}/admin/users/:id
// delete user account

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.delete();
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw Error("User not found");
  }
};

module.exports = {
  authUser,
  registerUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};

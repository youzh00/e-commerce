const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = payload;
    req.user = await User.findById(id).select("-password");
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("Not authorized to access this route");
  }
};

module.exports = { protect };

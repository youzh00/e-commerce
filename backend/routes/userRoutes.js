const mongoose = require("mongoose");
const express = require("express");
const colors = require("colors");
const router = express.Router();
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.route("/").post(registerUser).get(protect, isAdmin, getAllUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/:id").delete(protect, isAdmin, deleteUser);

module.exports = router;

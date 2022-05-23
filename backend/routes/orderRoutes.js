const mongoose = require("mongoose");
const express = require("express");
const colors = require("colors");
const router = express.Router();
const addOrderitems = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, addOrderitems);

module.exports = router;

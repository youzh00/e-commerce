const mongoose = require("mongoose");
const express = require("express");
const colors = require("colors");
const router = express.Router();
const { addOrderitems } = require("../controllers/orderController");
const { getOrderById } = require("../controllers/orderController");
const { updateOrderToPaid } = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, addOrderitems);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

module.exports = router;

const mongoose = require("mongoose");
const express = require("express");
const colors = require("colors");
const router = express.Router();
const { addOrderitems } = require("../controllers/orderController");
const { getOrderById } = require("../controllers/orderController");
const { updateOrderToPaid } = require("../controllers/orderController");
const { getUserOrders } = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, addOrderitems);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/myorders").get(protect, getUserOrders);

module.exports = router;

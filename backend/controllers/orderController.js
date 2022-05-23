const Order = require("../models/orderModel");

// create a new order
// Poste to /orders
//Private
const addOrderitems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = res.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(200).json(createdOrder);
  }
};

// Get orer by id
// get /orders/:id
//Private
const getOrderById = async (req, res) => {
  const order = await order
    .findById(req.params.id)
    .populate("user", "name email");
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};
module.exports = { addOrderitems, getOrderById };

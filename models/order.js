/* The code is defining a Mongoose schema and model for an "Order" object. */
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  products: [],
  firstName: String,
  lastName: String,
  number: Number,
  address: String,
  total: String,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

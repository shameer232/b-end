/* This code is defining a Mongoose schema and model for an "Order" object. */
const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: String,
    price: Number,
    img: String,
  },
  {
    timestamps: true,
  }
);":"

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

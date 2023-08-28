/* The code is importing the necessary dependencies and modules for the router. */
const express = require("express");
const router = express.Router();
const Order = require("../models/order");

/* The code `router.post("/checkout", async (req, res) => { ... })` is defining a route for handling
HTTP POST requests to the "/checkout" endpoint. */
router.post("/checkout", async (req, res) => {
  try {
    const { products, firstName, lastName, number, address, total } = req.body;

    if (!products || !firstName || !lastName || !number || !address || !total) {
      return res.status(400).json({ message: "Missing information." });
    }

    const newOrder = new Order({
      products,
      firstName,
      lastName,
      number,
      address,
      total,
    });

    const savedOrder = await newOrder.save();
    res
      .status(201)
      .json({ message: "Order placed successfully.", order: savedOrder });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
});

/* The code `router.get("/list", async (req, res) => { ... })` is defining a route for handling HTTP
GET requests to the "/list" endpoint. */
router.get("/list", async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
});

module.exports = router;

/* The code is importing the necessary modules and files for the router. */
const express = require("express");
const router = express.Router();
const Product = require("../models/products");

/* The code `router.post("/add", async (req, res) => { ... })` is defining a route for handling a POST
request to add a new product. */
router.post("/add", async (req, res) => {
  try {
    const { name, price, img } = req.body;

    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with the same name already exists" });
    }

    const newProduct = new Product({
      name,
      price,
      img,
    });

    const savedProduct = await newProduct.save();
    console.log(savedProduct);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

/* The code `router.delete("/delete/:productId", async (req, res) => { ... })` is defining a route for
handling a DELETE request to delete a product. */
router.delete("/delete/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Deleted product:", deletedProduct);
    res.status(200).json({ message: "Product Deleted successfully" }); // No content response
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

/* The code `router.get("/list", async (req, res) => { ... })` is defining a route for handling a GET
request to retrieve a list of all products. */
router.get("/list", async (req, res) => {
  try {
    const allProducts = await Product.find();
    console.log(allProducts);

    res.status(200).json(allProducts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

/* The code `router.get("/:_id", async (req, res) => { ... })` is defining a route for handling a GET
request to retrieve the details of a specific product. */
router.get("/:_id", async (req, res) => {
  try {
    const productId = req.params._id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productDetails = {
      name: product.name,
      price: product.price,
      img: product.img,
    };

    res.status(200).json(productDetails);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

module.exports = router;

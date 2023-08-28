/* These lines of code are importing the necessary modules and dependencies for the code to work
properly. */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
/* The code you provided is a route handler for the "/register" endpoint. */
const jwt = require("jsonwebtoken");

/* The code `router.post("/register", async (req, res) => { ... })` is defining a route handler for the
HTTP POST request to the "/register" endpoint. */
router.post("/register", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ userName, password: hashedPassword });
    const savedUser = await user.save();
    console.log(savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

/* The code `router.post("/login", async (req, res) => { ... })` is defining a route handler for the
HTTP POST request to the "/login" endpoint. */
router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.jwt_token, {
      expiresIn: "30d",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

/* `module.exports = router;` is exporting the `router` object so that it can be used in other files.
In Node.js, the `module.exports` object is used to define what should be exported from a module. In
this case, the `router` object is being exported, which contains the defined routes for the
"/register" and "/login" endpoints. Other files can then import this module and use the defined
routes. */
module.exports = router;

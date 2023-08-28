/* This code is defining a Mongoose schema and model for a user in a Node.js application. */
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };

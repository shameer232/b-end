/* These lines of code are importing the necessary modules for the application. */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

/* The code snippet is performing the following tasks: */
dotenv.config();
const app = express();
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(cors());


/* The code `mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true
})` is establishing a connection to a MongoDB database using the Mongoose library. */
mongoose.connect(process.env.MONGOURI, {
  /* The `useNewUrlParser: true` option is used to parse the MongoDB connection string using the new
  URL parser. This is necessary because the old URL parser is deprecated and will be removed in a
  future version of Mongoose. */
  useNewUrlParser: true,
  /* The `useUnifiedTopology: true` option is used to enable the new unified topology engine in
  Mongoose. This engine replaces the old MongoDB driver's connection management engine and provides
  better handling of replica sets and sharded clusters. It is recommended to set this option to
  `true` for new applications or when upgrading to a new version of Mongoose. */
  useUnifiedTopology: true,
});

/* The code `const db = mongoose.connection;` creates a variable `db` that represents the connection to
the MongoDB database. */
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

/* The code `const usersRouter = require("./routes/users");` is importing the `usersRouter` module from
the `./routes/users.js` file. */

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

/* The code `const productRouter = require("./routes/products");` is importing the `productRouter`
module from the `./routes/products.js` file. */
const productRouter = require("./routes/products");
app.use("/products", productRouter);

/* The code `const orderRouter = require("./routes/orders");` is importing the `orderRouter` module
from the `./routes/orders.js` file. */
const orderRouter = require("./routes/orders");
app.use("/orders", orderRouter);


/* The code `app.listen(port, () => { console.log(`Server is running on port `); });` is
starting the server and listening for incoming requests on the specified port. When the server
starts successfully, it will log a message indicating that the server is running on the specified
port. */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

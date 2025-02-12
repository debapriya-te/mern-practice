require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { connectToDB } = require("./db_connection");

// routes
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const recipeRoute = require("./routes/recipeRoute");
const apiRateLimiter = require("./middleware/rateLimit");

const app = express();
const port = process.env.PORT || 5000;

// middlewires
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(apiRateLimiter(1 * 60 * 1000, 10));
app.use((req, res, next) => {
  // logger
  console.log(req.path, req.method, req.body);
  next();
});

app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/recipe", recipeRoute);

app.listen(port, () => {
  connectToDB();
  console.log("Express app is up and running on port: ", port);
});

app.get("/api", (req, res) => {
  res.json({ msg: "welcome to express, server is up and running !!" });
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Database
const connectDB = require("./config/db");

// Routers
const AuthRouter = require("./routes/AuthRouter");
const ProductRouter = require("./routes/ProductRouter");
const WishlistRouter = require("./routes/WishlistRouter");
const CartRouter = require("./routes/CartRouter");
const OrdersRouter = require("./routes/OrderRoutes"); // ✅ Matches your file

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());

// API Routes
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/wishlist", WishlistRouter);
app.use("/cart", CartRouter);
app.use("/orders", OrdersRouter); // ✅ Matches import

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Connect Database
connectDB();

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

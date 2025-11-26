const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./routes/AuthRouter");
const ProductRouter = require("./routes/ProductRouter");
const WishlistRouter = require("./routes/WishlistRouter");
const CartRouter = require("./routes/CartRouter");

require('dotenv').config();
const connectDB = require("./config/db");




// Middleware
app.use(bodyParser.json());
app.use(cors());


app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/wishlist', WishlistRouter);
app.use('/cart', CartRouter);



// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Connect DB
connectDB();


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

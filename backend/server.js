const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

// Models
const User = require("./models/User");
const Product = require("./models/Product");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongo_link = "mongodb+srv://gurpreet:1234@cluster0.bnpj2bc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongo_link, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ Mongo Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


// -------------------------------------------------------------------
// USER SIGNUP API
// -------------------------------------------------------------------
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ status: "error", error: "Email already exists" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword 
    });

    res.json({ status: "ok", user });
  } catch (err) {
    res.json({ status: "error", error: "Something went wrong" });
  }
});


// -------------------------------------------------------------------
// GET ALL PRODUCTS (to show on frontend)
// -------------------------------------------------------------------
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);  // send products to frontend
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


// -------------------------------------------------------------------
// START SERVER
// -------------------------------------------------------------------
app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));

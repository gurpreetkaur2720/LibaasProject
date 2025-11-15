require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// ROUTES
const authRoutes = require('./routes/auth');          // Login/Register
const userDataRoutes = require('./routes/userData');  // Cart + Wishlist API

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS Settings
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));

// API Routes
app.use("/api/auth", authRoutes);       // Auth Routes
app.use("/api/user", userDataRoutes);   // Cart + Wishlist Routes

// Test Route
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// MongoDB + Server Start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) =>
    console.error("❌ MongoDB connection failed:", err.message)
  );

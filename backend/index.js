require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// ROUTES
const authRoutes = require('./routes/auth');
const userDataRoutes = require('./routes/userData');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ⭐ VERY IMPORTANT — FIXED CORS SETTINGS ⭐
app.use(
  cors({
    origin: "http://localhost:3000",      // frontend URL
    credentials: true,                    // allow sending cookies + token
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "x-auth-token", "Authorization"],
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userDataRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// MongoDB + Server Start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

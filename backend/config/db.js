// config/db.js
const mongoose = require("mongoose");

const ConnUrl = "mongodb+srv://prasenjitagt:8119@cluster0.fywalr2.mongodb.net/?appName=Cluster0";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ConnUrl);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1); // Stop server if DB fails
    }
};

module.exports = connectDB;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./routes/AuthRouter");

require('dotenv').config();
const connectDB = require("./config/db");




// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);


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

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },

  // full URL or local image path — same works
  image: { type: String, required: true },

  category: { type: String, required: true },

  description: { type: String, default: "" },

  stock: { type: Number, default: 10 },   // OPTIONAL – future cart fix
  createdAt: { type: Date, default: Date.now }  // OPTIONAL – sorting use
});

module.exports = mongoose.model("Product", productSchema);

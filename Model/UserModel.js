const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String, // base64 or image URL
});

module.exports = mongoose.model("Product", productSchema);

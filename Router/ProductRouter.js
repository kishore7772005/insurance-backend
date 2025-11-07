// Router/ProductRouter.js
const express = require("express");
const router = express.Router();
const Product = require("../Model/ProductModel");

// 🟢 Add new product
router.post("/", async (req, res) => {
  try {
    console.log("📦 Received Product Data:", req.body);
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      message: "✅ Product added successfully",
      product: savedProduct,
    });
  } catch (err) {
    console.error("❌ Error adding product:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🟡 Fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products); // ✅ Return array directly
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🔵 Update product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ Error updating product:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 🔴 Delete product
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "🗑️ Product deleted" });
  } catch (err) {
    console.error("❌ Error deleting product:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

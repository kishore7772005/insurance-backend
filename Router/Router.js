// Router/Router.js
const express = require("express");
const router = express.Router();

const productRouter = require("./ProductRouter");

// ✅ Final API path: /api/products
router.use("/products", productRouter);

module.exports = router;

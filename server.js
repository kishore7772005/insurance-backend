const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Config/db");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://insuretech.netlify.app",
    "https://incredible-jelly-3c0529.netlify.app", // Add this
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


// Middleware to parse JSON requests, with payload size limit
app.use(express.json({ limit: "50mb" }));

// API Routes
app.use("/api", require("./Router/Router"));

// Root route for testing backend connectivity
app.get("/", (req, res) => {
  res.status(200).send("✅ Backend is running successfully 🚀");
});

// Handle undefined routes (404)
app.use((req, res) => {
  console.warn(`⚠️  Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

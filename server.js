const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Config/db");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS Configuration - allow your frontend origins here
app.use(cors({
  origin: [
    "http://localhost:5173",                      // Vite dev frontend default
    "http://localhost:5174",                      // Sometimes Vite picks another port
    "http://192.168.29.160:5000",                 // Your frontend local IP with port
    "https://insurance-project-admin.onrender.com", // Your deployed admin frontend URL
    "https://insurance-backend-jiuc.onrender.com"   // Your deployed backend URL (for completeness)
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 204
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

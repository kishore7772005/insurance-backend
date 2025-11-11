// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Config/db");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

/* =====================================================
   ✅ DYNAMIC CORS CONFIGURATION
   - Allows localhost, LAN IPs, and your deployed frontend
   - Prevents "No 'Access-Control-Allow-Origin'" errors
===================================================== */
const allowedOrigins = [
  "http://localhost:5173",                       // Vite default
  "http://localhost:5174",                       // Alternate Vite port
  "http://192.168.29.160:5000",                  // Local LAN IP (example)
  "http://10.242.155.81:5000",                   // Your current local IP
  "https://insurance-project-admin.onrender.com", // Deployed frontend
  "https://insurance-backend-jiuc.onrender.com"   // Deployed backend
];

// ✅ Dynamic CORS handling for flexibility
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow mobile apps, Postman, etc.
    if (allowedOrigins.includes(origin) || origin.startsWith("http://10.") || origin.startsWith("http://192.")) {
      callback(null, true);
    } else {
      console.warn(`❌ Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 204
}));

// Middleware to parse JSON requests
app.use(express.json({ limit: "50mb" }));

// API Routes
app.use("/api", require("./Router/Router"));

// Root route (for testing)
app.get("/", (req, res) => {
  res.status(200).send("✅ Backend is running successfully 🚀");
});

// 404 - Not Found handler
app.use((req, res) => {
  console.warn(`⚠️  Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.message || err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

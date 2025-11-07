// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Config/db");

dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ CORS Configuration (for local + deployed frontend)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite default port
      "http://localhost:5174", // sometimes Vite uses another port
      "https://insuretech.netlify.app", // your deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json({ limit: "50mb" }));

// ✅ API routes
app.use("/api", require("./Router/Router"));

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully 🚀");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

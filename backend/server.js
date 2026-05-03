const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔥 IMPORTANT: Root test route
app.get("/", (req, res) => {
  res.status(200).send("🚀 Backend is LIVE");
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/task"));
app.use("/api/projects", require("./routes/project"));
app.use("/api/admin", require("./routes/admin"));

// ❗ Catch all route (IMPORTANT)
app.use("*", (req, res) => {
  res.status(404).send("Route not found");
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Error:", err);
  });
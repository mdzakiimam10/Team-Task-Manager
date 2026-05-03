const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes import
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const projectRoutes = require("./routes/project");
const adminRoutes = require("./routes/admin");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/admin", adminRoutes);
// app.use("/api/auth", require("./routes/auth"));


// Test route (optional)
app.get("/", (req, res) => {
  res.send("API Running...");
});

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// Server start
const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const auth = require("../middleware/auth");


// ================= CREATE TASK =================
router.post("/", auth, async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || "pending",
      assignedTo: req.body.assignedTo || req.user.id,
      project: req.body.project || null,
      user: req.user.id,
      dueDate: req.body.dueDate   // 🔥 IMPORTANT FIX
    });

    const savedTask = await task.save();
    res.json(savedTask);

  } catch (err) {
    console.error("Create Task Error:", err.message);
    res.status(500).json({ msg: err.message });
  }
});


// ================= GET ALL TASKS =================
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "email")
      .populate("project", "name");

    res.json(tasks);

  } catch (err) {
    console.error("Fetch Task Error:", err.message);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
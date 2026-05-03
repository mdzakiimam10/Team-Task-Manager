const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ❗ optional rakho (warna crash hoga)
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    // ❗ optional rakho
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // ✅ important
  }
);

module.exports = mongoose.model("Task", taskSchema);
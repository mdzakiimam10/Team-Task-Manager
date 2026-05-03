const express = require("express");
const router = express.Router();

const User = require("../models/User");
const auth = require("../middleware/auth");
const role = require("../middleware/role");


// ================= GET ALL USERS =================
router.get("/users", auth, role("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= DELETE USER =================
router.delete("/user/:id", auth, role("admin"), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= UPDATE ROLE =================
router.put("/user/:id", auth, role("admin"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.role = req.body.role;
    await user.save();

    res.json({ msg: "Role updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= STATS =================
router.get("/stats", auth, role("admin"), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const admins = await User.countDocuments({ role: "admin" });
    const members = await User.countDocuments({ role: "member" });

    res.json({
      totalUsers,
      admins,
      members,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
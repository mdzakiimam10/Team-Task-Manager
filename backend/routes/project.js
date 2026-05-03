const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");
const role = require("../middleware/role");


// 🔥 CREATE PROJECT (admin + member allowed)
router.post("/", auth, role("admin", "member"), async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json("Project name is required");
    }

    const project = new Project({
      name: req.body.name,
      members: [req.user.id]
    });

    const saved = await project.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err.message);
  }
});


// 🔥 GET PROJECTS (all logged-in users)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("members", "-password");

    res.json(projects);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 🔥 DELETE PROJECT
router.delete("/:id", auth, role("admin", "member"), async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json({ msg: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});


module.exports = router;
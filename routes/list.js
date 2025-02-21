const router = require("express").Router();
const List = require("../models/list");
const User = require("../models/user");

// ADD TASK
router.post("/addTask", async (req, res) => {
  const { title, body, id } = req.body;
  try {
    const newTask = new List({ title, body });
    const savedTask = await newTask.save();

    await User.findByIdAndUpdate(id, {
      $push: { list: savedTask._id },
    });

    res.status(200).json({ message: "Task added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add task" });
  }
});

// GET TASKS
router.get("/getTasks/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("list");
    res.status(200).json({ list: user.list });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

module.exports = router;

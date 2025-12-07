const { Router } = require("express");
const courseRouter = Router();
const { courseModel } = require("../db");


courseRouter.get("/preview", async (req, res) => {
  try {
    const courses = await courseModel.find({});
    return res.json({ message: "All courses", courses });
  } catch (err) {
    return res.status(500).json({ message: "Error", error: err.message });
  }
});

module.exports = {
  courseRouter,
};

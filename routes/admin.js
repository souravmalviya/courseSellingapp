const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/admin");

const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;


adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(20),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input format",
      error: parsed.error,
    });
  }

  try {
    const exists = await adminModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashed = await bcrypt.hash(password, 5);

    await adminModel.create({
      email,
      password: hashed,
      firstName,
      lastName,
    });

    return res.json({ message: "Admin registered successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error", error: err.message });
  }
});


adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.status(403).json({ message: "Admin does not exist" });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET_ADMIN);

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({
      message: "Signin error",
      error: err.message,
    });
  }
});


adminRouter.post("/course", adminMiddleware, async (req, res) => {
  try {
    const { title, description, price, imageURL } = req.body;

    if (!title || !description || !price || !imageURL) {
      return res.status(400).json({ message: "All fields required" });
    }

    const course = await courseModel.create({
      title,
      description,
      price,
      imageURL,
      creatorId: req.adminId,
    });

    return res.status(201).json({
      message: "Course created",
      courseId: course._id,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error", error: err.message });
  }
});


adminRouter.put("/course/:courseId", adminMiddleware, async (req, res) => {
  try {
    const { courseId } = req.params;

    const updates = {};
    ["title", "description", "price", "imageURL"].forEach((key) => {
      if (req.body[key]) updates[key] = req.body[key];
    });

    const updated = await courseModel.findOneAndUpdate(
      { _id: courseId, creatorId: req.adminId },
      updates,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Course not found or unauthorized",
      });
    }

    return res.json({
      message: "Course updated",
      course: updated,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error updating course", error: err.message });
  }
});


adminRouter.get("/bulk", adminMiddleware, async (req, res) => {
  try {
    const courses = await courseModel.find({ creatorId: req.adminId });

    return res.json({
      message: "Your courses",
      courses,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching courses", error: err.message });
  }
});

module.exports = {
  adminRouter,
};

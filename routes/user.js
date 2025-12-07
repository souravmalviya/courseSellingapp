const { Router } = require("express");
const userRouter = Router();
const { userModel, purchasesModel, courseModel } = require("../db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middleware/user");

const JWT_SECRET = process.env.JWT_SECRET;


userRouter.post("/signup", async (req, res) => {
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
      message: "Invalid input",
      error: parsed.error,
    });
  }

  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashed = await bcrypt.hash(password, 5);

    await userModel.create({
      email,
      password: hashed,
      firstName,
      lastName,
    });

    return res.json({ message: "User registered" });
  } catch (err) {
    return res.status(500).json({ message: "Error", error: err.message });
  }
});


userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


userRouter.post("/purchase/:courseId", userMiddleware, async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await purchasesModel.create({
      userId: req.userId,
      courseId,
    });

    return res.json({ message: "Purchased successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error purchasing", error: err.message });
  }
});


userRouter.get("/purchases", userMiddleware, async (req, res) => {
  try {
    const purchases = await purchasesModel.find({ userId: req.userId });

    const courseIds = purchases.map((p) => p.courseId);

    const courses = await courseModel.find({ _id: { $in: courseIds } });

    return res.json({
      message: "Purchased courses",
      courses,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error", error: err.message });
  }
});

module.exports = {
  userRouter,
};

const { Router } = require("express");
const userRouter = Router();
const { userModel } = require("../db");
//app.use(express.json());

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Zod schema
  const requireBody = z.object({
    email: z.string().email().min(3).max(50),
    password: z.string().min(3).max(20),
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20)
  });

  // Safe parse
  const parsed = requireBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Incorrect format",
      error: parsed.error,
    });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to DB
    await userModel.create({
      email,
      password: hashedPassword,  // ✔ store hashed password
      firstName,
      lastName,
    });

    return res.json({
      message: "You are signed up",
    });

  } catch (e) {
    return res.status(400).json({
      message: "User already exists, try signing in",
    });
  }
});


userRouter.post("/signin", (req, res) => {

});

userRouter.get("/purchases", (req, res) => {
    
});

module.exports = {
  userRouter: userRouter
};

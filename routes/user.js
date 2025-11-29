const { Router } = require("express");
const userRouter = Router();
const { userModel } = require("../db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const requireBody = z.object({
    email: z.string().email().min(3).max(50),
    password: z.string().min(3).max(20),
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
  });

  const parsed = requireBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Incorrect format",
      error: parsed.error,
    });
  }

  try {
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "Email already in use Try again With Different Email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    console.log(hashedPassword)

    return res.json({
      message: "You are signed up",
    });
  } catch (e) {
    
    return res.status(500).json({
      message: "Something went wrong",
      error: e.message,
    });
  }
});



userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        // find user by emailll
        const response = await userModel.findOne({ email });

        if (!response) {
            return res.status(403).json({
                message: "User doesn't exist in our DB"
            });
        }

        // compare password
        const passwordMatch = await bcrypt.compare(password, response.password);

        if (!passwordMatch) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }

        // create JWT token
        const token = jwt.sign(
            { id: response._id.toString() },
            JWT_SECRET
        );

        return res.json({ token });

    } catch (err) {
        console.log("Signin error:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});


userRouter.get("/purchases", (req, res) => {
    
});

module.exports = {
  userRouter: userRouter
};

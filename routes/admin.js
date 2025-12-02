const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const bcrypt = require("bcrypt");
const {z, string}= require("zod");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/admin");
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;

adminRouter.post("/signup", async (req, res) => {
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
        message: "Incorrect format for your input",
        error: parsed.error,
      });
    }
  
    try {
      const userExists = await adminModel.findOne({ email });
      if (userExists) {
        return res.status(400).json({
          message: "Email already in use Try again With Different Email",
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 5);
      await adminModel.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });
      //console.log(hashedPassword)
  
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

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  
      try {
          // find user by emailll
          const admin = await adminModel.findOne({ email });
  
          if (!admin) {
              return res.status(403).json({
                  message: "User doesn't exist in our DB"
              });
          }
  
          // compare passwordd
          const passwordMatch = await bcrypt.compare(password, admin.password);
  
          if (!passwordMatch) {
              return res.status(403).json({
                  message: "Incorrect credentials"
              });
          }
  
          // create JWT token
          const token = jwt.sign(
              { id: admin._id.toString() },
              JWT_SECRET_ADMIN
          );// we can add cookie and session based authentication 
  
          return res.json({ token });
  
      } catch (err) {
          console.log("Signin error:", err);
          return res.status(500).json({
              message: "Internal server error",
              error: err.message
          });
      }

});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  try {
    const { title, description, price, imageURL } = req.body;

    // basic validation (optional)
    if (!title || !description || !price || !imageURL) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // get admin id from middleware
    const creatorId = req.adminId;

    // create course
    const course = await courseModel.create({
      title,
      description,
      price,
      imageURL,
      creatorId,
    });

    return res.status(201).json({
      message: "Course created successfully",
      courseId: course._id,
    });

  } catch (err) {
    console.log("Course creation error:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message
    });
  }
});


adminRouter.put("/", (req, res) => {
  //here the user wants to update the course title or update price or update any other settings he should be able to do

});

adminRouter.get("/bulk", (req, res) => {
    
});

module.exports = {
  adminRouter: adminRouter
};

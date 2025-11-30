const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const bcrypt = require("bcrypt");
const {z, string}= require("zod");
const jwt = require("jsonwebtoken");
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

adminRouter.post("/", (req, res) => {

});

adminRouter.put("/", (req, res) => {

});

adminRouter.get("/bulk", (req, res) => {
    
});

module.exports = {
  adminRouter: adminRouter
};

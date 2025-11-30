const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const bcrypt = require("bcrypt");
const {z, string}= require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
//wanye to add bcrypt for hashing , zod for validation and jwt for sessions 

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
      const userExists = await userModel.findOne({ email });
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

adminRouter.post("/signin", (req, res) => {

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

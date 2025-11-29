const { Router } = require("express");
const userRouter = Router();
const { userModel } = require("../db");
const bcrypt = require("bcrypt");
const { z } = require("zod");


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



userRouter.post("/signin", async (req, res) =>{
    //user sign in we need to get the salt 
    const {email, password}= req.body;

    const response = await UserModel.findOne({
        email: email,
       
    });
    
    if (!response){
        res.status(403).json({
            message: "user dont exist in our DB "

        })
    }
   //after user exists need to check the db 
    const passwordMatch = await bcrypt.compare(password, response.password) // im comparing the password 

    if (passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })

    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


userRouter.get("/purchases", (req, res) => {
    
});

module.exports = {
  userRouter: userRouter
};

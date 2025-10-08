const { Router} = require('express')
const adminRouter = Router();
const {adminModel}= require("../db")

adminRouter.post("/signup", (req, res)=>{
    //we need email name password 
    const name= req.body.name;
    const email= req.body.email;
    const password= req.body.password;  
    
})

adminRouter.post("/signin", (req, res)=>{
    
})

//adminRoute.use(adminMiddlewear());


adminRouter.post("/course", (req, res)=>{
    
})

adminRouter.put("/course", (req, res)=>{
    //admin can chnge the coure can change the pro=ice of the course 
    
})

adminRouter.get("/course", (req, res)=>{
    
})


module.exports={
adminRouter: adminRouter
}
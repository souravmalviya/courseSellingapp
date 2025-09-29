const { Router} = require('express')
const adminRouter = Router();
adminRouter.post("/signup", (req, res)=>{
    //we need email name password 
    const name= req.body.name;
    const email= req.body.email;
    const password= req.body.password;  
    
})

adminRouter.post("/signin", (req, res)=>{
    
})

adminRoute.use(adminMiddlewear());


adminRouter.post("/course", (req, res)=>{
    
})


module.exports={
adminRouter: adminRouter
}
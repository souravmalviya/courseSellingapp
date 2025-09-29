
const {Router}= require("express");
const userRouter= Router() // created an instance for the router class 


//ugly way to create an routes is to define them in a functon and then using export it can be done 
userRouter.post("/user/signup", (req, res)=>{
    //we need email name password 
    const name= req.body.name;
    const email= req.body.email;
    const password= req.body.password;  
    
})

userRouter.post("/user/signin", (req, res)=>{
    
})

userRouter.get("/purchases", (req,res)=>{

})


module.exports={
    userRouter:userRouter
}
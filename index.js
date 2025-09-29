const express= require("express");
const app= express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
app.use(express.json());// this is an middlewear


app.post("/user/signup", (req, res)=>{
    //we need email name password 
    const name= req.body.name;
    const email= req.body.email;
    const password= req.body.password;  
    
})

app.post("/user/signin", (req, res)=>{
    
})
app.post("/courses/purchases", (req, res)=>{
    
})
app.get('user/purchases', (req, res)=>{

})

app.get('/courses', (req, res)=>{

})



app.listen(3000, ()=>{
    console.log("Your app is Running on 3000 Port")
})
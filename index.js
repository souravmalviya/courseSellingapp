const express= require("express");
const app= express();
//importing th euserRounter
const {userRouter } = require("./routes/user")
const {courseRouter} = require("./routes/course")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
app.use(express.json());// this is an middlewear


app.use("/user", userRouter);
app.use("/courses", courseRouter)


app.listen(3000, ()=>{
    console.log("Your app is Running on 3000 Port")
})
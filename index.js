const express= require("express");
const app= express();
//importing th euserRounter
const {userRouter } = require("./routes/user")
const {courseRouter} = require("./routes/course")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { adminRouter } = require("./routes/admin");
app.use(express.json());// this is an middlewear


app.use("api/v1/user", userRouter);
app.use("api/v1/user/admin",adminRouter)
app.use("api/v1/courses", courseRouter)


async function main(){
    await mongoose.connect("mongodb+srv://admin:Admin123456789@cluster0.mnlum0e.mongodb.net/coursera-app")
    app.listen(3000, ()=>{
    console.log("Your app is Running on 3000 Port")
})

}
main();

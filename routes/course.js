const { Router} = require('express')
const courseRouter = Router();



courseRouter.get("/purchases", (req, res)=>{

})

courseRouter.get("/preview", (req, res)=>{

})


// exporting to main index.js 
module.exports={
    courseRouter: courseRouter
}
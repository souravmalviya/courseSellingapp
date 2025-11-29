const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
//wanye to add bcrypt for hashing , zod for validation and jwt for sessions 

adminRouter.post("/signup", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
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

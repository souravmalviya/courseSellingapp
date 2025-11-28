const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");

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

adminRouter.get("/", (req, res) => {
    
});

module.exports = {
  adminRouter: adminRouter
};

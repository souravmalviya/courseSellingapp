require("dotenv").config();
const express = require("express");
const bcrypt= require("bcrypt");
const app = express();
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const {z, string}= require("zod");

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(process.env.PORT, () => {
    console.log("Your app is running on port " + process.env.PORT);
  });
}

main();

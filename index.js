require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { courseRouter } = require("./routes/course");

app.use(express.json());

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
  });
}

main();

require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS

const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { courseRouter } = require("./routes/course");

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGO_URI);
  
  // Listen on port 3000
  app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
  });
}

main();
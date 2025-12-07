const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const Admin = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const Course = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageURL: String,
  creatorId: mongoose.Types.ObjectId,
});

const Purchases = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  courseId: mongoose.Types.ObjectId,
});

const userModel = mongoose.model("users", Users);
const adminModel = mongoose.model("admin", Admin);
const courseModel = mongoose.model("course", Course);
const purchasesModel = mongoose.model("purchase", Purchases);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchasesModel,
};

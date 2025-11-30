const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const Users = new Schema({
  name: String,
  email: { type: String, unique: true },
  firstName: String,
  password: String,
  lastName: String
});

const Admin = new Schema({
  name: String,
  email: { type: String, unique: true },
  firstName: String,
  lastName: String
});

const Course = new Schema({
  title: String,
  description: String,
  price: Number,
  imageURL: String,
  creatorId: ObjectId
});

const Purchases = new Schema({
  userId: ObjectId,
  courseId: ObjectId //refferencing hspprning 
});

const userModel = mongoose.model("users", Users);
const adminModel = mongoose.model("admin", Admin);
const courseModel = mongoose.model("course", Course);
const purchasesModel = mongoose.model("purchase", Purchases);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchasesModel
};

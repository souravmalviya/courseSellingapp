// i will create schema in Mongoose  i will design a schema at veryfirst 

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Users = new Schema({
  name: String,
  email: { type: String, unique: true },
  Firstname: String,
  Lastname : String
});

const admin = new Schema({
  name: String,
  email: { type: String, unique: true },
  Firstname: String,
  Lastname : String
});

const course = new Schema({
  title: String,
  description: String,
  price: Number,
  imageURL: String,
  creatorId: ObjectId
});

const purchases = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
  userId: ObjectId
});

const UserModel = mongoose.model('users', Users);
const AdminModel = mongoose.model('admin', admin );
const CourseModel= mongoose.model('course', course);
const PurchasesModel = mongoose.model('purchase', purchases);

module.exports = {
  UserModel,
  AdminModel,
  CourseModel,
  PurchasesModel
}


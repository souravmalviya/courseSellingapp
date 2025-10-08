const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const Users = new Schema({
  name: String,
  email: { type: String, unique: true },
  firstName: String,
  lastName : String
});

const admin = new Schema({
  name: String,
  email: { type: String, unique: true },
  firstName: String,
  lastName : String
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
  courseId: ObjectId, // learing Refferences 

});

const userModel = mongoose.model('users', Users);
const adminModel = mongoose.model('admin', admin );
const courseModel= mongoose.model('course', course);
const purchasesModel = mongoose.model('purchase', purchases);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchasesModel
}


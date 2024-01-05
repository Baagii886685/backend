const mongoose = require("mongoose");
const infoNews = new mongoose.Schema({
    infoTitle: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Мэдээний гарчиг оруулна уу"],
  },
  textOne: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Мэдээний текстийг оруулна уу"],
  },
  photoOne: {
    type: String,
    required: [true, "Хичээлийн Профайл зураг оруулна уу"],
  },
  textTwo: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Мэдээний текстийг оруулна уу"],
  },
  photoTwo: {
    type: String,
    required: [true, "Мэдээний текстийг оруулна уу"],
  },
  textThree: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Мэдээний текстийг оруулна уу"],
  },
  createUserId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: [true, "Дахин нэвтэрж мэдээ оруулна уу"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("infoNews", infoNews);
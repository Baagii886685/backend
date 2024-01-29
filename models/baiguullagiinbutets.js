const mongoose = require("mongoose");
const baiguullagiinButets = new mongoose.Schema({
  photoOne: {
    type: String,
    required: [true, "Хичээлийн Профайл зураг оруулна уу"],
  },
  description:{
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  createUserId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: [true, "Дахин нэвтэрж мэдээ оруулна уу"],
  },
}, {timestamps: true});

module.exports = mongoose.model("baiguullagiinButets", baiguullagiinButets);
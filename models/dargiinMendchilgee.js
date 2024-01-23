const mongoose = require("mongoose");
const mendchilgee = new mongoose.Schema({
    photo: {
        type: String,
        required: [true, "Профайл зураг оруулна уу"],
      },
  textarea1: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Боомтын цагын хуваарь оруулна уу"],
  },
  textarea2: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Боомтын цагын хуваарь оруулна уу"],
  },
  textarea3: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Боомтын цагын хуваарь оруулна уу"],
  },
  textarea4: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Боомтын цагын хуваарь оруулна уу"],
  },
  textarea5: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Боомтын цагын хуваарь оруулна уу"],
  },
  input1: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Боомтын цагын хуваарь оруулна уу"],
  },
  input2: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Боомтын цагын хуваарь оруулна уу"],
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

module.exports = mongoose.model("mendchilgee", mendchilgee);
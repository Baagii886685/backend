const mongoose = require("mongoose");
const borderPort = new mongoose.Schema({
    name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Боомтын нэр оруулна уу"],
  },
  ognoo: {
    type: String,
    trim: true,
    // unique: true,
    required: [true, "Боомт байгуулагдсан огноо оруулна уу"],
  },
  desc: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Боомтын газар нутгийн байршилыг оруулна уу"],
  },
  borderKm: {
    type: String,
    trim: true,
    // unique: true,
    required: [true, "Хилээс хэдэн метр зайтай байдагыг оруулна уу"],
  },
  sumiinTovKm: {
    type: String,
    trim: true,
    // unique: true,
    required: [true, "Сумын төвөөс хэдэн метр зайтай байдагыг оруулна уу"],
  },
  clanKm: {
    type: String,
    trim: true,
    // unique: true,
    required: [true, "Аймгийн төвөөс хэдэн метр зайтай байдагыг оруулна уу"],
  },
  cityKm: {
    type: String,
    trim: true,
    // unique: true,
    required: [true, "Улаанбаатар хотоос хэдэн метр зайтай байдагыг оруулна уу"],
  },
  desc1: {
    type: String,
    trim: true,
    // unique: true,
    required: [true, "Боомтын тайлбарыг оруулна уу"],
  },
  desc2: {
    type: String,
    trim: true,
    // unique: true,
    required: [true, "Боомтын тайлбарыг оруулна уу"],
  },
  desc3: {
    type: String,
    trim: true,
    // unique: true,
    required: [true, "Боомтын мэдээлэл оруулна уу"],
  },
  region: {
    type: String,
    // trim: true,
    // unique: true,
    required: [true, "Боомтын хиллэдэг улсыг сонгоно уу"],
  },
  portImage1: {
    type: String,
    required: [true, "Боомтын зураг оруулна уу"],
  },
  portImage2: {
    type: String,
    trim: true,
    // unique: true,
    required: [true, "Боомтын зураг оруулна уу"],
  },
  location: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Боомтын уртраг өргөрөг оруулна уу"],
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

module.exports = mongoose.model("borderPort", borderPort);
const mongoose = require("mongoose");
const portTimeTable = new mongoose.Schema({
  // desc: {
  //   type: Boolean,
  //   default: true,
  // },
  // ognoo: {
  //   type: String,
  //   trim: true,
  //   // unique: true,
  //   required: [true, "Боомтын цагын хуваарь оруулна уу"],
  // },
  portOgnoo: [
    {
      value:{
        type: Boolean,
        select: false,
      },
      time:[ Date, Date ],
    },
  ],
  createUserId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: [true, "Дахин нэвтэрж мэдээ оруулна уу"],
  },
  borderPortId: {
    type: mongoose.Schema.ObjectId,
    ref: "borderPort",
    required: [true, "Дахин нэвтэрж мэдээ оруулна уу"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("portTimeTable", portTimeTable);
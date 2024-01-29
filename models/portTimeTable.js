const mongoose = require("mongoose");
const portTimeTable = new mongoose.Schema({
  additionalTransportation: {
    type: Boolean,
    default: true,
  },
  portWork: {
    type: Boolean,
    default: true,
  },
  checked: {
    type: Boolean,
    default: true,
  },
  nemeltChecked: {
    type: Boolean,
    default: true,
  },
  nemeltAmraltiinOdor: {
    type: Boolean,
    default: true,
  },
  amraltiinOdor: {
    type: Boolean,
    default: true,
  },
  additionTsaiEndTime:{
    type: String,
    trim: true,
  },
  startTime: {
    type: String,
    trim: true,
    // unique: true,
    // required: [true, "Боомтын эхлэх цаг хуваарь оруулна уу"],
  },
  endTime: {
    type: String,
    trim: true,
    // required: [true, "Боомтын хаах цагын хуваарь оруулна уу"],
  },
  tsaiStartTime: {
    type: String,
    trim: true,
    // required: [true, "Боомтын хаах цагын хуваарь оруулна уу"],
  },
  tsaiEndTime: {
    type: String,
    trim: true,
    // required: [true, "Боомтын хаах цагын хуваарь оруулна уу"],
  },
  portDescription: {
    type: String,
    trim: true,
    // required: [true, "Боомтын хаах цагын хуваарь оруулна уу"],
  },
  value1:[Date, Date],
  additionName: {
    type: String,
    trim: true,
    // required: [true, "Боомтын хаах цагын хуваарь оруулна уу"],
  },
  additionStartTime: {
    type: String,
    trim: true,
    // required: [true, "Боомтын хаах цагын хуваарь оруулна уу"],
  },
  additionEndTime: {
    type: String,
    trim: true,
    // required: [true, "Боомтын хаах цагын хуваарь оруулна уу"],
  },
  additionTsaiStartTime: {
    type: String,
    trim: true,
    // required: [true, "Боомтын хаах цагын хуваарь оруулна уу"],
  },
  checkboxGroup1: [
    {
      type: String,
      trim: true,
      // required: [true, "Боомтын амрах гараг сонгоно уу"],
    }
  ],
  checkboxGroup2: [
    {
      type: String,
      trim: true,
      // required: [true, "Боомтын амрах гараг сонгоно уу"],
    }
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
}, {timestamps: true});

module.exports = mongoose.model("portTimeTable", portTimeTable);
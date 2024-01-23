const mongoose = require("mongoose");
const taniltsuulga = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Боомтын нэр оруулна уу"],
    },
    text1: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Алсын хараа оруулна уу"],
    },

    text2: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Алсын хараа оруулна уу"],
    },
    text3: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Алсын хараа оруулна уу"],
    },
    text4: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Боомтын мэдээлэл оруулна уу"],
    },
    text5: {
        type: String,
        trim: true,
    },
    createUserId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: [true, "Дахин нэвтэрж мэдээ оруулна уу"],
    },
}, {timestamps: true});

module.exports = mongoose.model("taniltsuulga", taniltsuulga);
const mongoose = require("mongoose");
const baiguullagiinTuuh = new mongoose.Schema({
    text1: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Нэр оруулна уу"],
    },
    togtoolDugaar: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Тогтоол дугаар оруулна уу"],
    },
    togtoolLink: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Тогтоол линк оруулна уу"],
    },
    text2: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Текст оруулна уу"],
    },
    createUserId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: [true, "Дахин нэвтэрч оруулна уу"],
    },

}, {timestamps: true});

module.exports = mongoose.model("baiguullagiinTuuh", baiguullagiinTuuh);
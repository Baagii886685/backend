const mongoose = require("mongoose");
const boomtTsagiinHuvaariNew = new mongoose.Schema({
    tsagiinHuwaariTailbar: {
        type: String,
        trim: true,
    },
    isAdditionalTransportation: {
        type: Boolean,
        default: true,
    },
    isPortWork: {
        type: Boolean,
        default: true,
    },
    isChecked: {
        type: Boolean,
        default: true,
    },
    isNemeltChecked: {
        type: Boolean,
        default: true,
    },
    isNemeltAmraltiinOdor: {
        type: Boolean,
        default: true,
    },
    isAmraltiinOdor: {
        type: Boolean,
        default: true,
    },
    isAdditionTsaiEndTime: {
        type: String,
        trim: true,
    },
    isStartTime: {
        type: String,
        trim: true,
        // unique: true,
        // required: [true, "Боомтын эхлэх цаг хуваарь оруулна уу"],
    },
    isEndTime: {
        type: String,
        trim: true,
        // required: [true, "Боомтын хаах цагийн хуваарь оруулна уу"],
    },
    isTsaiStartTime: {
        type: String,
        trim: true,
        // required: [true, "Боомтын хаах цагийн хуваарь оруулна уу"],
    },
    isTsaiEndTime: {
        type: String,
        trim: true,
        // required: [true, "Боомтын хаах цагийн хуваарь оруулна уу"],
    },
    isPortDescription: {
        type: String,
        trim: true,
        // required: [true, "Боомтын хаах цагийн хуваарь оруулна уу"],
    },
    isValue1: [Date, Date],
    isAdditionName: {
        type: String,
        trim: true,
        // required: [true, "Боомтын хаах цагийн хуваарь оруулна уу"],
    },
    isAdditionStartTime: {
        type: String,
        trim: true,
        // required: [true, "Боомтын хаах цагийн хуваарь оруулна уу"],
    },
    isAdditionEndTime: {
        type: String,
        trim: true,
        // required: [true, "Боомтын хаах цагийн хуваарь оруулна уу"],
    },
    isAdditionTsaiStartTime: {
        type: String,
        trim: true,
        // required: [true, "Боомтын хаах цагийн хуваарь оруулна уу"],
    },
    isCheckboxGroup1: [
        {
            type: String,
            trim: true,
            // required: [true, "Боомтын амрах гараг сонгоно уу"],
        }
    ],
    isCheckboxGroup2: [
        {
            type: String,
            trim: true,
            // required: [true, "Боомтын амрах гараг сонгоно уу"],
        }
    ],

    isCreateUserId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: [true, "Дахин нэвтэрж мэдээ оруулна уу"],
    },
    isBorderPortId: {
        type: mongoose.Schema.ObjectId,
        ref: "borderPort",
        required: [true, "Дахин нэвтэрж мэдээ оруулна уу"],
    },
}, { timestamps: true });

module.exports = mongoose.model("boomtTsagiinHuvaariNew", boomtTsagiinHuvaariNew);
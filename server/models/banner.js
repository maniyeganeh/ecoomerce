
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    largeText: {
        type: String
    },
    midText: {
        type: String
    },
    saleTime: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    creator: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
}, { timestamps: true })

module.exports = mongoose.model("Banner", bannerSchema)
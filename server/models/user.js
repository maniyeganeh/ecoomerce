const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: false
    },
    address2: {
        type: String,

    },
    zipCode: {
        type: Number,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comments"
    }],
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Products"
    }],
    order: [{
        type: Schema.Types.ObjectId,
        ref: "Order"
    }],
    banners: [{
        type: Schema.Types.ObjectId,
        ref: "Banner"
    }],

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)
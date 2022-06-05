
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sales: {
        type: Boolean,

    },
    off: {
        type: Number
    },
    tags: {
        type: [String],
        default: []
    },
    category: {
        type: [String],
        default: []
    },
    newProd: {
        type: Boolean,
        default: false
    },
    images: {
        type: Array,
        required: true
    },
    comments: {
        type: [String],
        default: []
    },
    creator: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

}, { timestamps: true })
module.exports = mongoose.model("Products", productsSchema)
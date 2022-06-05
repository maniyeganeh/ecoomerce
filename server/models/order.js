const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: {
        type: [String],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    shippingOption: {
        type: String
    },
    payment: {
        type: String
    },
    creator: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
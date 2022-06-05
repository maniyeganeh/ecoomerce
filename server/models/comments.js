
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    comment: {
        type: String
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Comments = mongoose.model("Comments", commentsSchema)
export default Comments
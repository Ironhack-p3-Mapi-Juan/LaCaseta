const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
    userFrom: {type: Schema.Types.ObjectId, ref: "User"},
    userTo: {type: Schema.Types.ObjectId, ref: "User"},
    content: String,
})

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
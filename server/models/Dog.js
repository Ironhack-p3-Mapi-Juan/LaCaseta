const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dogSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    name: {type: String, require: true},
    age: Number,
    breed: {type: String, default: "Mestizo"},
    tips: String,
    treatment: String,
    picDog: {type: String}

})

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;








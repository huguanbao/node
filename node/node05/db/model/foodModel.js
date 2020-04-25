const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    name: { type: String, require: true },
    price: { type: String, require: true },
    desc: { type: String, require: true },
    img: { type: String, require: false },
    foodType: { type: String, require: true }
})

let foodModel = mongoose.model("food", schema);

module.exports = foodModel;
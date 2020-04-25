const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    mail: { type: String, require: true },
    pass: { type: String, require: true },
})

let userModel = mongoose.model("users", schema);

module.exports = userModel;
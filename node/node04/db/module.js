const mongoose = require("mongoose");
// 创建schema对象
var schema = new mongoose.Schema({
    user: { type: String },
    pass: { type: Number }
});

var foodModle = mongoose.model('food', schema);

module.exports = foodModle;
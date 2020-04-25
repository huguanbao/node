// 链接数据库
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/1911', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
// 错误提示
db.on('error', (err) => {
    console.log("链接失败");
});
// 成功提示
db.once('open', function() {
    // we're connected!
    console.log("链接成功");
});

// 创建schema对象
var schema = new mongoose.Schema({
    name: { type: String },
    age: { type: Number }
});

var foodModle = mongoose.model('food', schema);

// 执行语句
foodModle.insertMany({ name: "小胡", age: 12 })
    .then((data) => {
        console.log("then", data);
    })
    .catch((err) => {
        console.log("catch", err);
    })
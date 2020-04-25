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
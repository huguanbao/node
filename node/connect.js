// 链接数据库
var url = 'mongodb+srv://nz1911@heheda-ntz6p.mongodb.net/admin?replicaSet=heheda-shard-0&readPreference=primary&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1&3t.uriVersion=3&3t.connection.name=heheda-shard-0&3t.databases=admin,test'
var mongoose = require('mongoose');
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
// 错误提示
db.on('error', (err) => {
    console.log("链接失败");
});
// 成功提示
db.once('open', function () {
    // we're connected!
    console.log("链接成功");
});

let schema = new mongoose.Schema({
    name:{type:String},
    pass:{type:String}
})

let foodModel = mongoose.model("food", schema);

foodModel.insertMany({name:'小胡',pass:123})
.then(()=>{
    console.log('添加成功');
    
})
.catch((err)=>{
    console.log(err);
    
})

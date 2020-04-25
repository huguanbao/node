### 中间件

    自定义中间件1 (自己写的中间件)
    第三方中间件  (别人写好的我们下载来用)
    内置中间件    (静态资源路径)

### 跨域
 jsonp 
 cors 通过下载第三方中间件然后引入使用，
 服务器代理 通过下载第三方中间件axios 

 ### 路由
 个人理解是为了页面简洁，在一个页面中如果有几百个接口就会很难看，
 所以路由就很好的解决的这个问题。

### 长连接
第一种方法
websocket怎么使用
前端
<input type="text" id="msg">
<button onclick="sendMsg()">发送信息</button>
let ws = new WebSocket("ws://localhost:3003") 连接服务器端口号
ws.onopen = ()=>{
    console.log("服务端已连接");
}

ws.onmessage = (msg)=>{
    console.log("接收服务器端的消息",msg);
}

ws.onclose = (msg)=>{
    console.log("接收服务器端主动断开的消息",msg);
}
写一个函数方法作为客户端给服务器端发送消息
function sendMsg(){
    let msg = document.getElementById("msg").value;
    ws.send("客户端向服务器端发送消息",msg);
}

服务端

1.先下载第三方模块 npm install ws
2.require引入第三方模块
const websocket = require("ws");
3.创建服务器端的端口号
const ws = new websocket.Server({ port: 3003 })
4.监听客户端是否连接
ws.on("connection", (client) => {
    // client客户端连接对象
    console.log("客户端连接了");
    // 服务端向客户端发消息
    client.send("你好小姐姐");

    client.on("message", (msg) => {
        console.log("来自客户端的消息", msg);
    })
    监听客户端断开连接
    client.on("close",()=>{
        console.log("客户端主动断开连接");
    })

})

第二种方法
socket.io
前端
1.引入script文件 socket.io.js
2.let socket = io.connect('http://127.0.0.1:8081'); 链接服务器
3.创建自定义事件，监听服务器发来的消息
socket.on("hehe", (data) => {
            console.log("来自服务端的消息", data);
        })
4.触发服务器端的创建的自定义事件 就是客户端向服务端发消息
socket.emit("xixi", msg);

后端
var express = require('express')
var app = express()
    // 将socket服务器 和express 绑定到一起
var server = require('http').Server(app);
var io = require('socket.io')(server);

//监听客户端是否连接
io.on("connection", (client) => {
    console.log("客户端连接");
    // 触发客户端的自定义事件 hehe 参数 123 向客户端发消息
    client.emit("hehe", 123);
    // 服务器端创建一个叫xixi的自定义事件监听 等待前端触发 (接收客户端发消息)
    client.on("xixi", (data) => {
        console.log("来自客户端你的消息", data);
    })
})


server.listen(8081, () => {
    console.log('server start')
});

### 整理jwt鉴权相关的笔记资料

1.先通过命令行下载jsonwebtoken $ npm install jsonwebtoken
2.引入jsonwebtoken模块，const jsonwebtoken= require("jsonwebtoken"); 
3.获取token的值，
a.首先创建一个要加密的数据 let data = {name:'网易',ps:123}
b.还有创建一个秘钥，let  secret = "wawadadwadf123",
c.然后进行签名获取token的值，let token =jsonwebtoken.sign(data,secret)
console.log(token);
4.拿到token的值之后进行验证是否合法性
//参数1 要验证的token 参数2产生token的秘钥
let result = jsonwebtoken.verify(token,secret)
console.log(result);

### 分析聊天室实现思路

1.创建客户端和服务器端
2.客户端连接上之后，服务器端需要保存客户端的信息和用户名
3.将信息发送到服务器端，推送给除自己外的其他人
 

### 以api接口为核心回顾总结node知识体系

### api接口的构成
接口四要素： 接口地址url 请求方法 传递的字段（数据格式） 返回信息
前端： 1.传递数据 传给后端 2.处理后端返回结果
后端： 1.接受前端传递的数据 2.处理数据 3.将处理结果返回给前端

### 获取数据的方式
get数据 req.query
post 数据 req.body 需要使用第三方插件 body-parser 进行解析数据
post 数据格式的多样性
1.x-www-form-urlencode 2.json 3.form-data 格式

前端接口测试工具 postman postwoman ....

### 爬虫的步骤
1.通过http 或者 https 模块 获取网络资源（网页 记事本 图片 音频 视频）request第三方模块进行爬虫

http.get(url,(res)=>{
  let rawData=''
  res.on('data',(chunk)=>{
    <!-- 传递完一段数据就会触发 chunk 传递的每一段数据 -->
    rawData+=chunk
  })

  res.on('end',()=>{
    <!-- 数据传输完毕 -->
  })
})
.on('error',()=>{
})
2.分析内容 （正则表达式） cheerio 获取网页的具体内容信息

### 同步异步问题
1.多个异步操作按照固定的顺序执行 -> 回调嵌套->回调地狱->promise的链式调用->async await(伪同步)
   
### 中间件 middleware （拦截器） 中间的插件
中间件的本质是一个函数 常用的情况下有三个参数 req res next

中间件的分类

自定义中间件 自己写的
内置中间件 静态资源路径就这一种
第三方中间件 cors body-parser 别人写好的我们来使用

### 跨域
浏览器的同源策略 jsonp script 里的src不受同源策略影响 需要提供接口的后端参与 cors 设置请求头 需要提供接口的后端参与 服务器代理 （正向代理 反向代理） 服务器之间的请求没有跨域问题 长连接 。。。

### 路由
根据路径将代码进行拆分模块化

1、将相关的api放到一个路由里

创建一个 userRouter.js文件
const express = require('express')
const router = express.Router()
router.get('/login',(req,res)=>{
  ....
})
module.exports= router
2.server.js文件引入

const useRouter = require('./router/userRouter')
app.use（‘/user’,useRouter）

### 数据库
关系型数据库 mysql 甲骨文 。。。 非关系型数据库 redis mongodb （文档型） nosql

mongodb 数据库的名字 mongod 命令行的一个命令 启动数据库 mongo 命令行的一个命令 命令行里连接数据库 mongoose 第三方模块 node来连接数据库的

### 环境配置
下载安装mongodb
一直安装 install compass 对勾 千万别选
运行 mongod 指令 启动数据库 (先运行第四步)
运行mongo 指令 在命令行连接数据库
show dbs 能显示默认数据库 大吉大利 今晚代码 注意： 1.xxx不是一个内部命令 环境变量的问题 2.mongod 指令运行不起来 缺少数据库文件 c：/data/db
mongod --dbpath 文件路径 指定数据保存目录

### 基本命令 curd
数据库>数据表(集合 collection)>数据(文档 document)

### 数据库的curd
show dbs 显示所有的数据库 db 当前选中的数据库 use dbName
新建一个数据库 如果数据库里没有东西 这个数据库是个临时的数据库
或者切换一个已经有的数据库 db.dropDatabase() 删除数据库

### 集合的curd
db.createCollection('集合名字') 在数据库里创建一个集合 show collections 显示该库下所有的集合 db.集合名.drop()

### 文档的curd
查询操作 db.集合名.find() 查询所有的数据 db.集合名.find().pretty() 查询数据并格式化

添加操作 db.集合名.insert(要添加的数据对象) 添加 默认主键是 _id 不能重复的 db.集合名.save({要添加的数据对象}) 要添加的主键_id是不存在的时候 save 相当于插入

修改操作 db.集合名.update({找到要修改数据的条件},{$set:{要改成什么样}},{multi:true}) 参数3控制修改全部还是一条 db.集合名.save({要修改的数据}) 修改数据里的主键_id 如果已经存在表示修改

删除操作 db.集合名.remove({要删除数据的查询条件})

查询条件

固值查询 固定字段查询值
范值查询 某一个查询范围 $gt $gte $lt $lte $ne
db.user.find({age:{$gt:5}})
交集查询 and db.user.find({$and:[条件1 条件2 ...] })
并集查询 or db.user.find({$or:[{},{}]})
限制条数 db.user.find().limit(2)

跳过 db.user.find().skip(2) 瀑布流 分页 上拉加载 5 条数据 一页显示2条 3页 pageSize 每页多少条数据 page 当前的页码数

1 db.user.find().skip(0).limit(2) 2. db.user.find().skip(2).limit(2) 3. db.user.find().skip(4).limit(2)

db.user.find().skip((page-1)*pageSize).limit(pageSize)

### node 操作数据库 mongoose
1.连接数据库 2.创建连接对象 错误监听 第一次连接的监听 3.创建schema对象 数据表头 4.将schema对象转成数据模型 和数据集合做关联（集合名复数形式） 5.数据模型对象执行增删改查操作

### 上传图片的功能
将本地的图片 file：协议访问 上传到服务器上去 http 协议来访问 1.前端的实现 2.后端的实现 将本地的图片上传到服务器的静态资源路径里 multer 相当于一个中间件 处理文件上传 req.file (req.files) 获得图片相关的数据信息 文件上传必须用post方法

const multer = require('multer')
const uplaod =multer({})

app.post('/file',uplaod.single('hehe'),(req,res)=>{
  req.file 上传的文件信息  文件的数据 buffer 文件的类型 文件的大小  文件原来文件名
  将文件的数据写入到静态资源目录里
  1.文件名不重复 时间戳+随机数
  2.限制上传的类型 gif  png  jpg
  3.限制上传的尺寸
}) 

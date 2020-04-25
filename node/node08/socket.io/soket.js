var express = require('express')
var app = express()
    // 将socket服务器 和express 绑定到一起
var server = require('http').Server(app);
var io = require('socket.io')(server);
//监听客户端是否连接
io.on("connection", (client) => {
    console.log("客户端连接");
    // 触发客户端的自定义事件 hehe 参数 123
    client.emit("hehe", 123);
    // 服务器端创建一个叫xixi的自定义事件监听 等待前端触发 (接收客户端发消息)
    client.on("xixi", (data) => {
        console.log("来自客户端你的消息", data);
    })
})

server.listen(8081, () => {
    console.log('server start')
});
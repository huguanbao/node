const websocket = require("ws");
const ws = new websocket.Server({ port: 4000 })
    // 监听客户端是否连接
let clients = [] //用来保存所有的客户端对象
ws.on("connection", (client) => {
    console.log("客户端连接");

    clients.push(client);
})

// 广播 给所有的用户发送一条消息

function sendAll(reward) {
    let num = parseInt(Math.random * 4);
    for (let index = 0; index < clients.length; index++) {
        if (num == index) {
            clients[index].send("恭喜中奖：获得" + reward);
        } else {
            clients[index].send("谢谢惠顾");
        }
    }
}

module.exports = { sendAll }
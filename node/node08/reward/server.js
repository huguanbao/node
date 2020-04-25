const express = require("express");
const app = express();
const path = require("path");
const { sendAll } = require("./ws.js");
app.use("/public", express.static(path.join(__dirname, "./www")));

app.get("/reward", (req, res) => {
    let { reward } = req.query;
    sendAll(reward)
    res.send({ err: 0, msg: "发送成功" });
});
app.listen(3000, () => {
    console.log("服务器启动");
})
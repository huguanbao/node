const express = require("express");
const app = express();
// 注册
let user = [];
app.get("/reg", (req, res) => {
        let { email, pass } = req.query;
        user.push({ email, pass });
        console.log(user);
        res.send({ err: 0, msg: "注册成功" });
    })
    // 登录

app.get("/login", (req, res) => {
    let { email, pass } = req.query;
    let status = 0;
    for (let index = 0; index < user.length; index++) {
        if (user[index].email == email && user[index].pass == pass) {
            status = 1
        }
    }
    if (status) {
        res.send({ err: 0, msg: "登录成功" })
    } else {
        res.send({ err: -1, msg: "登陆失败" })
    }

})

app.listen(3000, () => {
    console.log("服务器启动");

})
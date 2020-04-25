const express = require("express");
const fs = require("fs");
var bodyParser = require('body-parser')
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get("/html", (req, res) => {
        // 接受前端发来的数据
        // 处理数据
        // 返回结果
        // 返回数据格式 json 至少包含2-3个字段  错误码 错误信息 数据
        let { userName, passWord } = req.query;

        console.log({ userName, passWord });

        // console.log(res);


        if (userName == "胡观保" && passWord == "123") {

            res.send({ err: 0, msg: "成功" });
            fs.writeFile("./data.txt", JSON.stringify({ userName, passWord }), (err) => {
                if (err) {
                    console.log("保存失败");
                } else {
                    console.log("保存成功");
                }
            })

        } else {
            res.send({ err: -1, msg: "失败" });
        }
    })
    // app.post("/post", (req, res) => {
    //     console.log(req.body);

// })
app.listen(4000, () => {
    console.log("成功");

});
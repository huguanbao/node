const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db/connect");
const tokenMiddleWare = require("./middleware/tokenmiddleware")

// post解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public', express.static(path.join(__dirname, './public')))
    // 引入路由
let foodRouter = require("./router/foodRouter");
let userRouter = require("./router/userRouter");
let loadRouter = require("./router/loadRouter");
app.use("/admin", userRouter);
app.use("/load", loadRouter);
app.use("/food", tokenMiddleWare, foodRouter);
app.listen(3000, () => {
    console.log("服务器启动");
})
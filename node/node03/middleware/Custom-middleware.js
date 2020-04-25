const express = require("express");
const app = express();

function middleware1(req, res, next) {
    console.log("这里是中间件1");
    next()
}

function middleware2(req, res, next) {
    console.log("这里是中间件2");
    next();
}

app.get("/test", middleware1, middleware2, (req, res) => {
    console.log(111);

})

app.listen(3000, () => {
    console.log("服务器启动");

})
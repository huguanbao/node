const express = require("express");
const app = express();

function middleware1(req, res, next) {
    console.log("这是中间件");
    next()
}
app.use(middleware1);
app.get("/test", (req, res) => {
    console.log(111);
    res.send("成功1");
})

app.get("/test1", (req, res) => {
    console.log(222);
    res.send("成功2");
})

app.listen(3000, () => {
    console.log("服务器启动");

})
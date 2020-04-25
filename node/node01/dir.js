/*
创建文件夹 mkdir
删除文件夹 rmdir
修改文件夹 rename
读取文件夹 readdir
*/
let fs = require("fs");
fs.mkdir("./dir", (err) => {
    console.log(err);
});
// fs.rmdir("./file", (err) => {
//     console.log(err);
// })
// fs.rename("./dir", "./demo", (err) => {
//     console.log(err);

// })
fs.readdir("./", (err, data) => {
    console.log(err);
    console.log(data);
});
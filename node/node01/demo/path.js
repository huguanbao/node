const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "./xixi.txt"), (err, data) => {
    console.log(err);
    console.log(data.toString());
})
let stat = fs.lstatSync("./xixi.txt");
console.log(stat.isDirectory());
console.log(stat.isFile());
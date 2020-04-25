// 利用promise penning resolve成功回调 then reject 失败回调 catch

function num1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(1);
            resolve();
        }, 3000)
    })
}

function num2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(2);
            resolve();
        }, 2000)
    })
}

function num3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(3);
            resolve();
        }, 1000)
    })
}
num1()
    .then((res) => {
        console.log("num1");

        return num2();
    })
    .then(() => {
        console.log("num2");

        return num3();
    })
    .then(() => {
        console.log("num3");
    })
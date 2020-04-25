// 嵌套实现按顺序的实现异步排序(会发生回调地狱)
function num1() {
    setTimeout(() => {
        console.log(1);
        num2()
    }, 3000)
}

function num2() {
    setTimeout(() => {
        console.log(2);
        num3()
    }, 2000)
}

function num3() {
    setTimeout(() => {
        console.log(3);
    }, 1000)
}
num1();
// num2();
// num3();
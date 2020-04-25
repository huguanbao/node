const userModel = require("../db/model/userModel");
const { createToken } = require("../uitls/jwt");
let userReg = async(mail, pass) => {
    let result;
    let isExist = await userModel.findOne({ mail });
    if (isExist) {
        throw "邮箱已被注册";
    } else {
        result = await userModel.insertMany({ mail, pass });
    }
    return result;
}

let userLogin = async( mail, pass) => {
    let result = await userModel.findOne({ mail, pass })
    if (result) {
        // 登录成功 产生新的token
        let { _id, mail } = result;
        let token = createToken({ _id, mail })
            // 将token更新数据库
        let updateResult = await userModel.updateOne({ _id }, { token })
            // 错误处理判断
        console.log(updateResult);
        return { _id, mail, token }

    } else {
        throw "用户名或密码不存在"
    }

}

// 判断token和用户是否统一
let tokenCheck = async(_id, token) => {
    let result = await userModel.findOne({ _id, token })
    if (result) {
        return result
    } else {
        throw "用户token不匹配"
    }
}

// 退出登录
let logOut = async(_id) => {
    let result = await userModel.updateOne({ _id }, { token: "" })
    if (result) {
        return result
    } else {
        throw "退出失败请重试"
    }
}
module.exports = { userReg, userLogin, tokenCheck, logOut }
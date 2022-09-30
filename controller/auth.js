const bcrypt = require('bcrypt')

const { User } = require("../model/user")

const results = require('../config/result')


//登录用户
exports.login = async(req, res, next) => {
    try {
        let data = req.validator
        let IsEmail = await User.findOne({
            email: data.email
        }).select("+password")
        console.log(IsEmail);
        if (!IsEmail) {
            return results.fail(501, null, "邮箱不存在", res)
        }
        let IsPassword = await bcrypt.compare(data.password, IsEmail.password)
        if (!IsPassword) {
            return results.fail(502, null, "密码错误", res)
        }

        return results.succs(200, IsEmail.generteToken(), "登录成功", res)
    } catch (error) {
        next(error)
    }
}
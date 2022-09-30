const bcrypt = require('bcrypt')


const { User } = require("../model/user")
const results = require('../config/result')


//注册
exports.reigster = async(req, res, next) => {
    try {
        let { email, password, name } = req.validator

        let user = await User.findOne({ email })
        if (user) results.fail(400, { email }, "邮箱已被注册,请换一个", res);

        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt)

        const users = new User({
            email,
            password,
            name
        })
        await users.save()
        results.succ(200, null, "注册成功", res)
    } catch (error) {
        next(error)
    }

}

//查询所有用户
exports.findall = async(req, res, next) => {
    try {
        const data = await User.find();
        if (data)
            return results.succ(200, data, "查询成功", res)
        return results.fail(400, null, "用户列表查询查询失败", res)
    } catch (error) {
        next(error)
    }
}


//查询单个用户
exports.findone = async(req, res, next) => {
    try {

        const data = await User.findById(req.params.id)
        console.log(data, req.params.id);
        if (data)
            return results.succ(200, data, "用户列表查询成功", res)
        return results.fail(400, null, "用户列表查询查询失败", res)

    } catch (error) {
        next(error)
    }
}


//编辑修改
exports.put = async(req, res, next) => {
    try {
        let UserId = req.params.id;
        let userBody = req.body;
        console.log(UserId, userBody);
        const data = await User.findByIdAndUpdate(UserId, userBody);

        if (!data)
            return results.fail(400, null, "更新失败", res)
        return results.succ(200, userBody, "更新成功", res)

    } catch (error) {
        next(error)
    }
}

//删除指定用户
exports.delete = async(req, res, next) => {
    try {
        let UserId = req.params.id;
        const data = await User.findByIdAndDelete(UserId);
        console.log(data);
        if (!data)
            return results.fail(400, null, "删除失败", res)
        return results.succ(200, UserId, "删除成功", res)

    } catch (error) {
        next(error)
    }
}
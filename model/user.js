const mongoose = require("mongoose")

//引入jobi
const joi = require("joi")
joi.objectId = require('joi-objectid')(joi)

const config = require('../config/config')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    __v: {
        type: String,
        select: false
    }
})

//生成token
UserSchema.methods.generteToken = function() {
    return jwt.sign({
        _id: this._id
    }, config.secret, {
        expiresIn: "240h"
    })
}

//创建Model
const User = mongoose.model("User", UserSchema)


// 创建校验
function UserValidator(data) {
    const schema = joi.object({
        email: joi.string().email().trim().lowercase().min(5).max(20).required().messages({
            "any.required": "缺少必要email",
            "string.email": "邮箱格式错误",
            "string.max": "邮箱请不要超长最大长度为20",
            "string.min": "邮箱长度至少为5"
        }),
        name: joi.string().min(3).max(10).required().messages({
            "any.required": "缺少必要name",
            "string.base": "name格式错误",
            "string.max": "name请不要超长最大长度为10",
            "string.min": "name长度至少为3"
        }),
        password: joi.string().min(6).max(18).pattern(/^[0-9A-Za-z]{6,18}$/).required().messages({
            "any.required": "缺少必要password",
            "string.max": "password请不要超长最大长度为18",
            "string.min": "password长度至少为6"
        }),
        _id: joi.objectId()
    })
    return schema.validate(data)
}
module.exports = {
    User,
    UserValidator
}
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const results = require('../config/result')

module.exports = function(req, res, next) {
    const token = req.header("authorization")

    if (!token) {
        return results.fail(400, null, "没有Token", res)
    }
    try {
        const UserToken = jwt.verify(token, config.secret)
        req.UserToken = UserToken
        next()
    } catch (error) {
        return results.fail(401, null, "token无效", res)
    }
}
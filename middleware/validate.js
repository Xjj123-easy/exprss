module.exports = (validator) => {
    return (req, res, next) => {
        const { error, value } = validator(req.body);
        //如果去请求失败，执行返回下面信息
        if (error) {
            return res.status(400).json({
                code: 400,
                value: error._original,
                msg: error.details[0].message
            })
        }
        //数据校验成功,响应校验数据
        req.validator = value
        next()

    }
}
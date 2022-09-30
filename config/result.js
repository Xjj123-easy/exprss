exports.fail = (code, value, msg, res) => {
    return res.status(code).json({
        code: code,
        data: value,
        msg: msg
    })
}

exports.succ = (code, value, msg, res) => {
    return res.status(code).json({
        code: code,
        msg: msg,
        data: value
    })
}


exports.succs = (code, value, msg, res) => {
    return res.status(code).json({
        code: code,
        msg: msg,
        authorization: {
            token: value
        }
    })
}
const results = require('../config/result')
const config = require('../config/config')
const path = `http://localhost:${config.app.port}/`
exports.upload = (req, res, next) => {
    try {
        let paths = path + req.file.filename
        return results.succ(200, paths, '上传成功', res)
            // 一切都好

    } catch (error) {
        next(error)
    }


}
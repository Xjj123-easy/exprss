const results = require('../config/result')

module.exports = (err, req, res, next) => {
    results.fail(500, null, err, res)
}
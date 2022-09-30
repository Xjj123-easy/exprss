const router = require("express").Router();

router.use("/user", require("./user"))
router.use("/login", require("./auth"))
router.use("/upload", require("./upload"))
module.exports = router
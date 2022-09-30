const router = require('express').Router();


const { UserValidator } = require("../model/user")


const Validator = require('../middleware/validate')

const auth = require('../controller/auth')

//登录
router.post("/", Validator(UserValidator), auth.login)


module.exports = router
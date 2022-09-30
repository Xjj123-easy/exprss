const router = require('express').Router();


const { UserValidator } = require("../model/user")


const Validator = require('../middleware/validate')
const auth = require("../middleware/auth")
const user = require('../controller/user')

//注册
router.post("/", Validator(UserValidator), user.reigster)

//查询所有用户
router.get("/", auth, user.findall)

//查询单个用户
router.get("/:id", user.findone)

//编辑修改
router.put("/:id", [auth, Validator(UserValidator)], user.put)


//删除指定用户
router.delete("/:id", auth, user.delete)


module.exports = router
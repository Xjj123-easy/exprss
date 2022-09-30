//请求配置
const config = require('./config/config')
const express = require("express")
const cors = require("cors")
const margon = require("morgan")
const app = express();
//处理Json中间件
app.use(express.json())
    //处理跨域
app.use(cors())
    //处理日志
app.use(margon("dev"))
    //处理路由中间件
app.use('/api', require('./routes/index'))

//静态文件托管
app.use(express.static("public/upload"))
    //引入数据配置
require("./model/index")

//引入错误处理中间件,必须放在路由中间件的后面
app.use(require("./middleware/error"))
app.listen(config.app.port, () => {
    console.log(`http://localhost:${config.app.port} `);
})
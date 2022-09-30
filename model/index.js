const config = require('../config/config')
const mongoose = require("mongoose")

mongoose.connect(config.database.url)
const db = mongoose.connection
db.on("error", error => {
    console.log("连接失败", error);
})
db.on("open", () => {
    console.log("连接成功");
})
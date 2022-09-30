const router = require('express').Router();
const upload = require('../controller/upload')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/upload')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const uploads = multer({ storage: storage })
router.post('/', uploads.single("file"), upload.upload)

module.exports = router
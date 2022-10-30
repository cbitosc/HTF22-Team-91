const path = require('path')
const multer = require('multer')

var storageStudent = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var uploadCertificate = multer({
    storage: storageStudent,
    fileFilter: function (req, file, callback) {
        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})


module.exports = {
    uploadCertificate
}
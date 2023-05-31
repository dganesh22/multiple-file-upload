const fileRoute = require('express').Router()
const FileController = require('../controller/fileController')
const fileMiddleware = require('../middleware/fileMiddleware')

fileRoute.get(`/`, FileController.index)
fileRoute.get(`/file/upload`, FileController.file)

// single upload 
fileRoute.post(`/api/file/upload`, fileMiddleware.single('myFile'), FileController.singleUpload)

// multiple file upload
fileRoute.post(`/api/files/upload`, fileMiddleware.array('myFile',10), FileController.multipleUpload)

//read files
fileRoute.get(`/api/files`, FileController.readFiles)

// delete files
fileRoute.delete(`/api/file/delete/:id`, FileController.removeFile)

fileRoute.all(`/*`, FileController.pnf)

module.exports = fileRoute
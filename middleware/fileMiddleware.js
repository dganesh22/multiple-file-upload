
const express = require('express')
const multer = require('multer')
const path = require('path')

const randomNum = () => {
    return Math.round(Math.random() * 100000); // 0-99999
}

const dateString = () => {
    return new Date().getTime().toString(); // uploading time in decimals
}

// storage
const configStorage = multer.diskStorage({
    destination: (req,file,callback) =>{
         callback(null, "uploads/")
    },
    filename: (req,file,callback) => {
        // callback(null, filename)
        // callback(null, `${file.originalname}`)
        callback(null, `file-${dateString()}${path.extname(file.originalname)}`)
    }
});

// upload 
const upload = multer({
    storage:  configStorage,
    limits: {
        fileSize: 5 * 1024 *  1024 // upto 5Mb
    }
}); 

// default export
module.exports = upload;

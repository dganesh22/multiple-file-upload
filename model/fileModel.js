const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
    fieldname: {
        type: String,
        trim: true 
    },
    originalname: {
        type: String,
        unique: [true, "original name already exists."],
        trim: true 
    },
    encoding: {
        type: String,
        trim: true 
    },
    mimetype: {
        type: String,
        trim: true 
    },
    destination: {
        type: String,
        trim: true 
    },
    filename: {
        type: String,
        unique: true,
        trim: true 
    },
    path: {
        type: String,
        trim: true 
    },
    size: {
        type: Number,
        required: true
    }
},{
    collection: "files",
    timestamps: true
})

module.exports = mongoose.model("File", FileSchema)
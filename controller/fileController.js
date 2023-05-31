const File = require('../model/fileModel')
const fs = require('fs')

const FileController = {
    index: async (req,res) => {
        // rendering view from express
        res.render('index.pug');
    },
    file: async (req,res) => {
        res.render('fileUpload.pug')
    },
    singleUpload: async (req,res) => {
        try {
                    let extFile = await File.findOne({ originalname: req.file.originalname })
                    // if file exists in db
                    if(extFile){
                        fs.unlinkSync(req.file.path)
                        return res.status(400).json({ msg: `File already exists.`});
                    }
                        
                const data = await File.create(req.file) 
                res.json({ data, msg: "File Uploaded successfully" })
    

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    multipleUpload: async (req,res) => {
        try {
                  
            Promise.all(req.files.map(async (file) => {
            const newUpload = File(file);
            return await newUpload.save();
       })).then(() => {
            res.status(200).json({ msg: "All files uploaded successfully"});
       }).catch(err => res.status(400).json({ msg: err.message }))


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    readFiles: async (req,res) => {
            try {
                const data = await File.find()
                return res.status(200).json({ length: data.length, files : data })
            } catch (err) {
                return res.status(500).json({ msg: err.message })
            }
    },
    removeFile: async (req,res) => {
        try {
            const id = req.params.id 
                let extFile = await File.findById({ _id: id })
                    if(!extFile)
                        return res.status(404).json({ msg: "File Doesnot exists"});
                    
                        fs.unlinkSync(extFile.path)
                        await File.findByIdAndDelete({ _id: id })
                    return res.status(200).json({ msg: `File = ${extFile.filename} deleted successfully`})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    pnf: async (req,res) => {
        res.render('pnf.pug')
    }
}

module.exports = FileController
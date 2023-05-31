const express = require('express')
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const connectDb = require('./db/connect')

const port = process.env.PORT


const app = express()

app.set(`view engine`, 'pug')
app.set(`views`, './view')

app.use(express.static('uploads'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(cors())
app.use(cookieParser())

app.use(`/`, require('./route/fileRoute'))

app.listen(port,() => {
    connectDb()
    console.log(`server connected.. @ http://localhost:${port}`)
})
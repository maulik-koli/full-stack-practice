const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./router')
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(cors());
app.use('/users', userRoutes)

const connectionURL = 'mongodb://127.0.0.1:27017/prac'

mongoose.connect(connectionURL, {
    // useNewUrlParser : true,
    // useUnifiedTopology : true
}).then(() => {
    // console.log("connected...")
}).catch((e) => {
    console.log(e)
})

const port = 3000
app.listen(port, () => {
    console.log("running...")
})

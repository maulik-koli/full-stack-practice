const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017/prac2'

mongoose.connect(DB_URL).then(() => {
    console.log('connect')
}).catch(() => {
    console.log('db is not connected')
})
const express = require('express')
const app = express()
const port = 3000
const cors  = require('cors')
const userRouter = require('./router/user.router')
require('./db/mongoose')

app.use(express.json())
app.use(cors())
app.use('/user', userRouter)

app.get('/test', (req, res) => {
    res.send('i am just a guy who is hero for fun')
})

app.listen(port, () => {
    console.log('running',port);
})

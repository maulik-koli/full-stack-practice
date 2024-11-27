const express = require('express')
const router = express.Router()
const User = require('../model/User.model')
const auth = require('../middelware/auth')
const isValid = require('../utils/fuction')

router.get('/', async (req, res) => {
    try{
        const users = await User.find()

        if(users.length < 0){
            return res.status(404).send({ message: 'Threre are no users.' })
        }
        res.status(200).send({ message: "Success!", users })
    }
    catch(e){
        res.status(500).send({ message: "Internal server error." })
    }
})

// signup
router.post('/singup', async (req, res) => {

    if(!isValid(req.body)){
        return res.status(422).send({ message: "Invalid inputs." })
    }
    const user = new User(req.body)

    try{
        await user.save()
        const token = await user.generateToken()
        res.status(201).send({ message: "User is created.", token })
    }
    catch(e){
        res.status(500).send({ message: "Internal server error." })
    }
})

// login
router.post('/login', async (req, res) => {
    if(!isValid(req.body, ['email', 'password'])){
        return res.status(422).send({ message: "Invalid inputs." })
    }

    try{
        const user = await User.userCredentials(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.status(200).send({ message: "Successfully login.", token, user })
    }
    catch(e){
        res.status(500).send({ message: e.message || "Internal server error." })
    }
})

// view profile
router.get('/me', auth, async (req, res) => {
    res.status(200).send({ message: "Success!", user: req.user })
})

// logout
router.post('/hey', auth, async (req, res) => {
    try{
        req.user.token = null
        await req.user.save()
        res.status(200).send({ message: "Successfully logout."})
    }
    catch(e){
        res.status(500).send({ message: "Internal server error.", e })
    }
})

// update
router.patch('/update', auth, async (req, res) => {
    if(!isValid(req.body)){
        return res.status(422).send({ message: "Invalid inputs." })
    }
    const user = req.user

    try{
        Object.keys(req.body).forEach((update) => user[update] = req.body[update])
        await user.save()
        res.status(200).send({ message: "Successfully updated.", user })
    }
    catch(e){
        res.status(500).send({ message: "Internal server error." })
    }
})

// delete
router.delete('/delete', auth, async (req, res) => {
    const user = req.user
    try{
        await user.deleteOne()
        res.status(200).send({ message: "Successfully deleted." })
    }
    catch(e){
        res.status(500).send({ message: "Internal server error." })
    }
})

module.exports = router

const express = require('express')
const User = require('./User')

const router = express.Router()

router.post('/create', async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send({ message: "User created" })
    }
    catch (e) {
        res.status(400).send({ error: e.message })
    }
})

router.get('/read', async (req, res) => {
    try{
        const users = await User.find()
        res.status(200).send(users)
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id
        if(id.length < 24){
            return res.status(404).send({ error: "Entered ID is not valis" })
        }
        const user = await User.findById(id)

        if(!user){
            return res.status(404).send({ error: "User not found" })
        }
        res.status(200).send(user)
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

router.patch('/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })

        if(!user){
            return res.status(404).send({ error: "User not found" })
        }
        res.status(200).send({ message: "User updated" })
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send({ error: "User not found" })
        }
        res.status(200).send({ message: "User deleted"})
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

module.exports = router

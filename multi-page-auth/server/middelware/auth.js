const jwt = require('jsonwebtoken')
const User = require('../model/User.model')

const auth = async (req, res, next) => {
    try{
        const token = req.header("Authorization").replace('Bearer ', '')
        const decode = jwt.verify(token, "lowkeychillguy")
        
        const user = await User.findById(decode._id)
        if(!user){
            throw new Error()
        }
        
        req.token = token
        req.user = user
        next()
    }
    catch(e){
        res.status(401).send({ error: 'Unauthenticate.'})
    }
}

module.exports = auth

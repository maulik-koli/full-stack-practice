const mogoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mogoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(value.length < 8){
                throw new Error('Password is too short')
            }
        }
    },
    token: {
        type: String,
    }
})

userSchema.statics.userCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user){
        throw new Error("Unable to login.")
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error("Unable to login.")
    }
    return user
}

userSchema.methods.generateToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, "lowkeychillguy", { expiresIn: '1h' })

    user.token = token
    await user.save()
    return token
}

userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mogoose.model('User', userSchema)

module.exports = User

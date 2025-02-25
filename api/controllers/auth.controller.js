const  User  = require("../models/user.model")
const bcrypt = require ("bcrypt")
const handleError = require("../utils/error")

module.exports={
    signup:async (req,res, next)=>{
        
        const {username, email, password}= req.body
        const hashPassword=bcrypt.hashSync(password, 10)
        const newUser = new User({username, email, password: hashPassword})

        try {
            await newUser.save()
            res.status(200).json('User is saved successfully hooraayy!!!')
            
        } catch (error) {
            
            next(handleError(550, 'error from the internal function'))
            
        }
       
    }
}
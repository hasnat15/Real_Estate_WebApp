const  User  = require("../models/user.model")
const bcrypt = require ("bcrypt")

module.exports={
    signup:async (req,res)=>{
        
        const {username, email, password}= req.body
        const hashPassword=bcrypt.hashSync(password, 10)
        const newUser = new User({username, email, password: hashPassword})

        try {
            await newUser.save()
            res.status(200).json('User is saved successfully hooraayy!!!')
            
        } catch (error) {

            res.status(500).json(error.message)
            
        }
       
    }
}
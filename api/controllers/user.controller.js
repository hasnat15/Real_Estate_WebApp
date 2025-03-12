const bcrypt= require("bcrypt")
const User = require("../models/user.model")
const handleError = require("../utils/error")


module.exports= {

    test: (req, res)=>{
        res.send("Api route is working")
    },
    updateUser: async (req, res, next)=>{
        
        if (req.user.id !== req.params.id) return next(handleError(401, 'you can only update your own account'))

        try {

            if (req.body.password){
                req.body.password= bcrypt.hashSync(req.body.password, 10)
            }
            const updateUser= await User.findByIdAndUpdate(req.params.id,{
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,    
                    avatar: req.body.avatar
                }
            }, {new: true})

            const {password, ...rest}= updateUser._doc

            res.status(200).json(rest)
            
        } catch (error) {
            next(error)
        }

    },
    deleteUser:async(req, res, next)=>{
        
        if(req.user.id !== req.params.id) return next(handleError(401, 'You can only handle your own account'))

        try{

            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('User has been deleted')

        }catch(error){
            next(error)
        }

    }

}

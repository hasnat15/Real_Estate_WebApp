const  User  = require("../models/user.model")
const bcrypt = require ("bcrypt")
const handleError = require("../utils/error")
const jwt = require ("jsonwebtoken")



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
       
    },
    signin: async (req,res,next)=>{
        const {email, password}=req.body
        
        try {

            const validUser= await User.findOne({email})
            if(!validUser) return next(handleError(404, 'User Not Found'))
            const validPassword= bcrypt.compareSync(password, validUser.password)
            if(!validPassword) return next(handleError(401, 'Wrong Credentials'))
            
            const token= jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
            const {password: pass, ...rest}= validUser._doc
            res.cookie('access_token', token, {httpOnly: true, secure:false}).status(200).json(rest)
           
            
        } catch (error) {
            next(error)
        }
    },
    google: async (req, res, next)=>{
        try {

            const user = await User.findOne({email: req.body.email})
            if(user){
                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
                const {password: pass, ...rest}= user._doc
                res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
            }else{
                const generatedPassword= Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
                const hashedPassword= bcrypt.hashSync(generatedPassword, 10)
                const newUser = new User({
                    username: req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),
                    email: req.body.email,
                    password: hashedPassword,
                    avatar: req.body.photo
                })

                await newUser.save()
                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
                const {password: pass, ...rest}= user._doc
                res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)

            }
            
        } catch (error) {
            next(error)
        }
    },
    signout: async (req, res, next)=>{

        try {
            res.clearCookie('access_token')
            res.status(200).json("User has been loged out successfully")
            
        } catch (error) {
            next(error)
        }
    }
}
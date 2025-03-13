const express= require('express')
const mongoose= require('mongoose')
const dotenv = require('dotenv')
const userRouter= require('./routes/user.route.js')
const authRouter = require('./routes/auth.route.js')
const listingRouter= require('./routes/listing.route.js')
const cookieParser = require('cookie-parser')


// we have to initilize it with config
dotenv.config()
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Connected To MongoDB")
})
.catch((err)=>{
    console.log(err)
})

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/user', userRouter)
app.use("/api/auth", authRouter)
app.use('/api/listing',listingRouter)

// now we are making a middleware for auth error handling
app.use((err, req, res, next)=>{
    const statusCode= err.statusCode || 500
    const message = err.message || 'Internal Server error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
app.listen(3000, () => {
    console.log('server is running on port 3000')
})



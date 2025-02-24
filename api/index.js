const express= require('express')
const mongoose= require('mongoose')
const dotenv = require('dotenv')
const userRouter= require('./routes/user.route.js')


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

app.use('/api/user', userRouter)

app.listen(3000, () => {
    console.log('server is running on port 3000')
})



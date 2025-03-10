
const jwt = require("jsonwebtoken")

const verifyToken =(req, res, next)=>{

    const token = req.cookies.access_token

    console.log("Token received:", token);

    if(!token) return next(errorHandler(401, 'unauthorized'))

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err) return next(errorHandler(403, 'forbidden'))

            req.user=user;
            next()
    })

}   

module.exports= verifyToken
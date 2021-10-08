const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports=(req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.send({error: "user must be logged in"})
    }
    console.log(authorization)
    next();
}
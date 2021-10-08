const app = require('express')()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const requireLogin = require('../middleware/requireLogin')

app.get('/user/:id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    
})

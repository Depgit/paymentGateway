const app = require('express')()
const mongoose = require('mongoose')
const User = mongoose.model("User")

app.post('/signup',(req,res)=>{
    const {name , email,password} = req.body
    if(!email || !password || !name){
        return res.json({error:"Please add all the credential"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.json({error:"user already exist"});
        }
        // we will use bcrypt to hass the password and also to 
        // varify that can use jsonwebtoken but will do that letter
        const user = new User({
            email,
            password,
            name
        })
        user.save()
        .then(user=>{
            res.json({message:"saved successfully"})
        })
        .catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.json({error:"Please add all the credential"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser){
            return res.json({error:"Invalid email or password"});
        }
        const {_id,name,email} = savedUser
        res.json({user:{_id,name,email}})
    }).catch(err=>{
        console.log(err)
    })
})


module.exports = app
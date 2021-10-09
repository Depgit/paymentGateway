const app = require('express')()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const jwt = require('jsonwebtoken')
const {JWT_SECRET,STRIPE_PUBLIC_KEY} = require('../key')



app.get('/signup',(req,res)=>{
    res.render('signup');
})

app.get('/signin',(req,res)=>{
    res.render('signin');
})

app.post('/signup',(req,res)=>{
    const {name , email,password,line1,postal_code,city,state,country} = req.body
    console.log(req.body);
    if(!email || !password || !name || !line1 || !postal_code || !city || !state || !country){
        return res.json({error:"Please add all the credential"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.json({auth: false,error:"user already exist"});
        }
        // we will use bcrypt to hass the password 
        const user = new User({
            email,
            password,
            name,
            address:{
                line1,
                postal_code,
                city,
                state,
                country
            }
        })
        user.save()
        .then(user=>{
            // res.json({message:"saved successfully"})
            res.json({
                success:true,
                user: user
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/signin',(req,res)=>{
    console.log(req.cookies);
    const {email,password} = req.body
    if(!email || !password){
        return res.json({error:"Please add all the credential"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser){
            return res.json({error:"Invalid email or password"});
        }
        if(password===savedUser.password){
            const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
            savedUser.token = token
            res.cookie('auth',savedUser.token).json({
                isAuth : true,
                user:savedUser
            })
        }else{
            return res.json({error: "invalid password"})
        }
    }).catch(err=>{
        console.log(err)
        res.json({error:"invalid email or password"})
    })
})



module.exports = app
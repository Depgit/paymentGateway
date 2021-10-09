const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require: true
    },
    line1: {
        type:String,
        require:true
    },
    postal_code: {
        type:String,
        require:true
    },
    city: {
        type:String,
        require:true
    },
    state: {
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    token:{
        type:String
    }
})

mongoose.model("User",userSchema)
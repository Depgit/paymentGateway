const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const addressSchema = new mongoose.Schema({
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
    }
})

mongoose.model("Address",addressSchema)
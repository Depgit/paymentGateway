const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userPayment = new mongoose.Schema({
    userPaymentToken:{
        type:String,
        require:true
    },
    paymentBy:{
        type:ObjectId,
        ref:"User"
    }
})

mongoose.model("Payment",userPayment)
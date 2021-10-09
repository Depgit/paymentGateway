const app = require('express')()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const requireLogin = require('../middleware/requireLogin')


const products = [
    {
      uuid: 1,
      productName: 'coffee',
      productDescription: 'Buy me one',
      productPrice: 10.99
    }
];

app.post('/payment',(req,res)=>{

})

module.exports = app
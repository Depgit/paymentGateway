if(process.env.NODE_ENV !== 'production'){
    require('dotenv')
}
const express = require('express');
const app = express()
const mongoose  = require('mongoose')
const path = require('path');
// connection url
const MONGOURI = 'mongodb://localhost:27017';

mongoose.connect(MONGOURI , {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY 
const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY
const stripe = require('stripe')(STRIPE_SECRET_KEY)


const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.use(express.json())
require('./models/user')
require('./models/payment')

app.use(require('./routes/auth'))
app.use(require('./routes/payment'))

app.set("view engine","ejs");
app.get('/',(req,res)=>{
    res.render("home",{
        key:STRIPE_PUBLIC_KEY
    })
})





app.listen(PORT,()=>{
    console.log("running on ",PORT);
})
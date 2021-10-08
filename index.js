const app = require('express')();
const bodyParser = require('body-parser')
const path = require('path');

const SECRET_KEY = "sk_test_51JiD4OSEc3lie6F0LLhGhSUI40PI89qEV9vmWrpaOVpQUnm5qbm0nMLdGPMcWNqpC52Bt4XaiDIY4J7t19CJWzRk006FGSnMeE";
const PUBLISHABLE_KEY = "pk_test_51JiD4OSEc3lie6F0lrZnLvsmT5J4heMgvrZvWVNovQPW53jJ4CRHncy8aN1OhQIe2oqhxXHvmuAboiK558powMSq00lp7lth9C"

const stripe = require('stripe')(SECRET_KEY)
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000
app.set("view engine","ejs");

app.get('/',(req,res)=>{
    res.render("home",{
        key:PUBLISHABLE_KEY
    })
})

app.post('/payment',(req,res)=>{
    stripe.customers.create({
        email: req.body.stripeEmail,
        source:req.body.stripeToken,
        name: 'Jenny Rosen',
        address: {
            line1: '510 Townsend St',
            postal_code: '98140',
            city: 'San Francisco',
            state: 'CA',
            country: 'US',
        }
    })
    .then((customer)=>{
        return stripe.charges.create({
            amount:7000,
            description:"buy a coffee",
            currency:"USD",
            customer:customer.id
        })
    })
    .then((charge)=>{
        console.log(charge);
        res.send("success")
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    })
})

app.listen(PORT,()=>{
    console.log("running on ",PORT);
})
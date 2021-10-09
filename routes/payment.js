const app = require('express')()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const requireLogin = require('../middleware/requireLogin')
const {STRIPE_SECRET_KEY,STRIPE_PUBLIC_KEY} = require('../key')
const stripe = require('stripe')(STRIPE_SECRET_KEY);

// console.log(stripe);
app.get('/payment',(req,res)=>{
    res.render('payment',{key:STRIPE_PUBLIC_KEY});
})

app.post('/payment',requireLogin, (req, res)=>{
    console.log(req);
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: req.user.name,
        address: {
            line1: req.user.line1,
            postal_code: req.user.postal_code,
            city: req.user.city,
            state: req.user.state,
            country: req.user.country
        }
    })
    .then((customer) => {
        return stripe.charges.create({
            amount: 2500,
            description: 'Web Development Product',
            currency: 'INR',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send("Success")
    })
    .catch((err) => {
        res.send(err)
    });
    // console.log(req.user);
    // res.send("good to see");
})

module.exports = app
const app = require('express')()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Payment = mongoose.model("Payment")
const requireLogin = require('../middleware/requireLogin')
const {STRIPE_SECRET_KEY,STRIPE_PUBLIC_KEY} = require('../key')
const stripe = require('stripe')(STRIPE_SECRET_KEY);

// console.log(stripe);
// app.get('/payment',(req,res)=>{
//     res.render('payment',{key:STRIPE_PUBLIC_KEY});
// })

app.post('/paymentDetails',requireLogin, (req, res)=>{
    const {name, currency, amount, description} = req.body;
    res.render('payment',{key : STRIPE_PUBLIC_KEY , name, currency, amount, description});
})

app.post('/payment',requireLogin, (req, res)=>{
    // console.log(req);
    if(req.user.email !== req.body.stripeEmail){
        return res.send({error : "email of money sender should be same as logged in user"})
    }
    const payment = new Payment({
        userPaymentToken: req.body.stripeToken,
        paymentBy : req.user
    })
    payment.save()
    console.log(payment);
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
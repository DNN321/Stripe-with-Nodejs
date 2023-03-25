const stripe = require('stripe')(process.env.STRIPE_KEY)

const stripeController = async (req,res)=>{
//request properties from browser-app.js
  const {purchase, total_amount,shipping_fee} = req.body
 

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total_amount + shipping_fee,
    currency :'usd',
  })

  res.json({clientSecret: paymentIntent.client_secret})
}

module.exports = stripeController

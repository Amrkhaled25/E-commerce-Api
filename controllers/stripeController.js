const stripe = require("stripe")(process.env.STRIPE_KEY);

const stripeCnt = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

module.exports = { stripeCnt };

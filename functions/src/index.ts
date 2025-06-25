import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';

admin.initializeApp();

const stripe = new Stripe(functions.config().stripe.secret, {
//   apiVersion: '2022-11-15',
});

export const createPaymentIntent = functions.https.onRequest(async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      res.status(400).json({ error: 'Missing amount or currency' });
      return;
    }

    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2022-11-15' }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customer.id,
    });

    
    console.log('client_secret:', paymentIntent.client_secret);
    console.log('ephemeralKey:', ephemeralKey.secret);
    console.log('customer:', customer.id);

      res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customerId: customer.id,
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

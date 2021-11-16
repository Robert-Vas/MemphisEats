import * as functions from "firebase-functions";
import Stripe from "stripe";

// "stripe.secret" config variable must be set in Firebase
// details: https://firebase.google.com/docs/functions/config-env
const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: "2020-08-27",
  typescript: true,
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const payWithStripe = functions.https.onRequest((req, res) => {
  // extract variables from the request body
  const {amount, currency, token} = req.body;

  // create the charge
  stripe.charges.create({
    amount,
    currency,
    source: token,
  }).then((charge) => {
    // send details of the charge back to the client
    res.send(charge);
  }).catch((err) =>{
    console.log(err);
  });
});

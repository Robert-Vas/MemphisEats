import * as functions from "firebase-functions";
import Stripe from "stripe";
import { messaging, firestore, initializeApp } from "firebase-admin";
import * as moment from "moment";

initializeApp();

// "stripe.secret" config variable must be set in Firebase
// details: https://firebase.google.com/docs/functions/config-env
const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: "2020-08-27",
  typescript: true,
});

const cors = require('cors')({ origin: true })

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const payWithStripe = functions.https.onRequest((req, res) => {
  // extract variables from the request body

  return cors(req, res, () => {
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
  })
});

// Schedule to send push notifications at 8 AM every day
export const scheduledMorningPickupReminder = functions.pubsub.schedule('0 8 * * *')
  .timeZone('America/Chicago')
  .onRun((context) => {

  let pickupTokens: string[] = [];
  let currDate: string = moment(new Date()).format("YYYY-MM-DD");

  const payload = {
    notification: {
      title: "Memphis Eats",
      body: "Remember bring your container today!"
    }
  };

  // Retrieve tokens that are equal to current date and send push notifications
  firestore().collection("push_notifications_pickup").where("date", "==", currDate).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      pickupTokens.push(doc.get("token"));
    });
  }).then(() => {
    if (pickupTokens.length !== 0) {
      messaging().sendToDevice(pickupTokens, payload).then((res) => {
        console.log("Successfully sent message: ", res);
      }).catch((err) => {
        console.log('Error sending message: ', err);
      })
    }
  });

  return null;
});


// Schedule to send push notifications at 3:30 PM every day
export const scheduledAfternoonPickupReminder = functions.pubsub.schedule('30 15 * * *')
  .timeZone('America/Chicago')
  .onRun((context) => {

  let pickupTokens: string[] = [];
  let currDate: string = moment(new Date()).format("YYYY-MM-DD");

  const payload = {
    notification: {
      title: "Memphis Eats",
      body: "Remember pickup your meal today!"
    }
  };

  // Retrieve tokens that are equal to current date and send push notifications
  firestore().collection("push_notifications_pickup").where("date", "==", currDate).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      pickupTokens.push(doc.get("token"));
    });
  }).then(() => {
    if (pickupTokens.length !== 0) {
      messaging().sendToDevice(pickupTokens, payload).then((res) => {
        console.log("Successfully sent message: ", res);
      }).catch((err) => {
        console.log('Error sending message: ', err);
      })
    }
  }).then(() => {
    // delete all records that are equal to current date
    firestore().collection("push_notifications_pickup").where("date", "==", currDate).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
    
  });

  return null;
});
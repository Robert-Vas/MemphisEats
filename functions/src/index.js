"use strict";
exports.__esModule = true;
exports.scheduledAfternoonPickupReminder = exports.scheduledMorningPickupReminder = exports.payWithStripe = void 0;
var functions = require("firebase-functions");
var stripe_1 = require("stripe");
var firebase_admin_1 = require("firebase-admin");
var moment = require("moment");
firebase_admin_1.initializeApp();
// "stripe.secret" config variable must be set in Firebase
// details: https://firebase.google.com/docs/functions/config-env
var stripe = new stripe_1["default"](functions.config().stripe.secret, {
    apiVersion: "2020-08-27",
    typescript: true
});
var cors = require('cors')({ origin: true });
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.payWithStripe = functions.https.onRequest(function (req, res) {
    // extract variables from the request body
    return cors(req, res, function () {
        // extract variables from the request body
        var _a = req.body, amount = _a.amount, currency = _a.currency, token = _a.token;
        // create the charge
        stripe.charges.create({
            amount: amount,
            currency: currency,
            source: token
        }).then(function (charge) {
            // send details of the charge back to the client
            res.send(charge);
        })["catch"](function (err) {
            console.log(err);
        });
    });
});
// Schedule to send push notifications at 8 AM every day
exports.scheduledMorningPickupReminder = functions.pubsub.schedule('0 8 * * *')
    .timeZone('America/Chicago')
    .onRun(function (context) {
    var pickupTokens = [];
    var currDate = moment(new Date()).format("YYYY-MM-DD");
    var payload = {
        notification: {
            title: "Memphis Eats",
            body: "Remember bring your container today!"
        }
    };
    // Retrieve tokens that are equal to current date and send push notifications
    firebase_admin_1.firestore().collection("push_notifications_pickup").where("date", "==", currDate).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            pickupTokens.push(doc.get("token"));
        });
    }).then(function () {
        if (pickupTokens.length !== 0) {
            firebase_admin_1.messaging().sendToDevice(pickupTokens, payload).then(function (res) {
                console.log("Successfully sent message: ", res);
            })["catch"](function (err) {
                console.log('Error sending message: ', err);
            });
        }
    });
    return null;
});
// Schedule to send push notifications at 3:30 PM every day
exports.scheduledAfternoonPickupReminder = functions.pubsub.schedule('30 15 * * *')
    .timeZone('America/Chicago')
    .onRun(function (context) {
    var pickupTokens = [];
    var currDate = moment(new Date()).format("YYYY-MM-DD");
    var payload = {
        notification: {
            title: "Memphis Eats",
            body: "Remember pickup your meal today!"
        }
    };
    // Retrieve tokens that are equal to current date and send push notifications
    firebase_admin_1.firestore().collection("push_notifications_pickup").where("date", "==", currDate).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            pickupTokens.push(doc.get("token"));
        });
    }).then(function () {
        if (pickupTokens.length !== 0) {
            firebase_admin_1.messaging().sendToDevice(pickupTokens, payload).then(function (res) {
                console.log("Successfully sent message: ", res);
            })["catch"](function (err) {
                console.log('Error sending message: ', err);
            });
        }
    }).then(function () {
        // delete all records that are equal to current date
        firebase_admin_1.firestore().collection("push_notifications_pickup").where("date", "==", currDate).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref["delete"]();
            });
        });
    });
    return null;
});

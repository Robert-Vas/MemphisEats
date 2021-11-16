// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyD1aAZmlPBuCU7GVJ9z5wNgp2idUqJw-XQ",
        authDomain: "memphis-eats.firebaseapp.com",
        databaseURL: "https://memphis-eats.firebaseio.com",
        projectId: "memphis-eats",
        storageBucket: "memphis-eats.appspot.com",
        messagingSenderId: "82138133325",
        appId: "1:82138133325:web:0cfaa8d87688d85202bd04",
        measurementId: "G-JY83Q8QVZ0",
        function: "http://localhost:5001/memphis-eats/us-central1/payWithStripe"
    },
    key: {
        publishableKey: "pk_test_51ILVa3EwvKye9u9Exh295pfLa89ovknvwL6pCqF8pleKdgk3FuybB3BIcwTkuxKR8Tb061VWKB4lEvisJvlxQozE00oi9Cz2n3"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

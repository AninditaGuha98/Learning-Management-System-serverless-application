const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.checkMissing = functions.https.onCall((data, context) => {
    let validity = 1
    Object.keys(data).forEach((item) => {
        console.log(data[item])
        if (data[item] === '') {
            validity = 0;
        }
    })
    
    return validity
});
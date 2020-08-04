var admin = require('firebase-admin');

var serviceAccount = require("../keys.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pubsub-4d0bb.firebaseio.com"
});

  module.exports = admin
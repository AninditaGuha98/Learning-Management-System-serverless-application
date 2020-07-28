var admin = require('firebase-admin');

var serviceAccount = require("../keys.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://serverless-proj-d62dc.firebaseio.com"
  });

  module.exports = admin
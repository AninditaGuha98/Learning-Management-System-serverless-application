var firebase = require('firebase')
var admin = require('firebase-admin')
require('firebase/firestore')

require('firebase/firebase-functions')
var serviceAccount = require("../keys.json");

var config = {
    apiKey: "AIzaSyCPO4NLWt2ehMj12RWaP0sDwQTRExEBodc",
    authDomain: "pubsub-4d0bb.firebaseapp.com",
    databaseURL: "https://pubsub-4d0bb.firebaseio.com",
    projectId: "pubsub-4d0bb",
    storageBucket: "pubsub-4d0bb.appspot.com",
    messagingSenderId: "967897018767",
    appId: "1:967897018767:web:7bb36c22c5d8948a5f9bfa",
    measurementId: "G-1JSL18SYX6"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(config);
 }

// var functions = firebase.functions();
// module.exports = admin;
module.exports = firebase;
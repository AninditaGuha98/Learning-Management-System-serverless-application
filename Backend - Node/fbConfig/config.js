var firebase = require('firebase')
var admin = require('firebase-admin')
require('firebase/firestore')

require('firebase/firebase-functions')
var serviceAccount = require("../keys.json");

var config = {
    apiKey: "AIzaSyCTMPcMWAjziBoRBbHV-sDtfPUD-jHh1P0",
    authDomain: "serverless-proj-d62dc.firebaseapp.com",
    databaseURL: "https://serverless-proj-d62dc.firebaseio.com",
    projectId: "serverless-proj-d62dc",
    storageBucket: "serverless-proj-d62dc.appspot.com",
    messagingSenderId: "480905493151",
    appId: "1:480905493151:web:ef69f91daff9d2c83300aa",
    measurementId: "G-6YVDDHZP8M"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(config);
 }

// var functions = firebase.functions();
// module.exports = admin;
module.exports = firebase;
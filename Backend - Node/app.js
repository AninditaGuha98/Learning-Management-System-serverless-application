// Require express and create an instance of it
var express = require('express');
var app = express();
const cors = require('cors');
var serviceAccount = require("./keys.json");
var firebase = require('./fbconfig/config')
const firebaseMiddleware = require('express-firebase-middleware');
console.log("Inside backend")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


const admin = require('./fbConfig/admin')





// on the request to root (localhost:3000/)
app.get('/', function (req, res) {
    res.send('<b>My</b> first express http server');
});

app.post('/register', require('./api/register'))

app.post('/login', require('./api/login'))
app.post('/logout', require('./api/logout'))
app.get('/security', firebaseMiddleware.auth, require('./api/security'))
app.post('/securityPost', firebaseMiddleware.auth, require('./api/securityPost'))
app.post('/createSub', firebaseMiddleware.auth, require('./api/createSub.js'))
app.post('/pubMessage', firebaseMiddleware.auth, require('./api/pubMessage.js'))
app.post('/listenMessage', firebaseMiddleware.auth, require('./api/listenMessage.js'))
app.get('/home', firebaseMiddleware.auth, require('./api/home'))
app.post('/analysis1', require('./api/analysis1'))
app.post('/analysis2', require('./api/analysis2'))

// app.use('/login', require('./routes/login'));
// app.use('/register', require('./routes/register'));

// app.use('/home', require('./routes/home'));

// Change the 404 message modifing the middleware


// start the server in the port 5000 !
app.listen(5001, function () {
    console.log('Example app listening on port 5000.');
});
var firebase = require('../fbConfig/config')
var admin = require('../fbConfig/config')
var axios = require('axios')

module.exports = login = (req, res) => {
    var email = req.body.email
    var password = req.body.password
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        var token = ''
        firebase.auth().currentUser.getIdToken(true).then((result) => {
            return res.status(201).send(result)
        })

    }).catch((error) => {
        console.log(error)
    })
}
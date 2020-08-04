var axios = require('axios')
var firebase = require('../fbConfig/config')

module.exports = home = (req, res) => {
    console.log("Inside Home API")
    console.log(req.headers)
    console.log(req.header)
    var email = ''
    var mode = '0'
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            email = user.email;
            console.log(user)
        }
    })
    // if()
    axios.post('https://gpfr6sbq24.execute-api.us-east-1.amazonaws.com/default').then((result) => {
        console.log(result.data)
        console.log(email)
        if (email != '') {
            console.log("Inside code 200")
            return res.status(200).json({ data: result.data, email: email })
        }
        else {
            console.log("Inside code 201")
            return res.status(201).json(result.data)
        }
    }).catch((error) => {
        console.log(error)
    })


}
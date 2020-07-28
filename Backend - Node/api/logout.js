var firebase = require('../fbConfig/config')
var axios = require('axios')

module.exports = logout = (req, res) => {



    response = firebase.auth().signOut()
    console.log("Error is ", req.body.email)
    // console.log(req)

    axios.post('https://0vyhgdg8r2.execute-api.us-east-1.amazonaws.com/default', { email: req.body.email }
    ).then((result) => {
        return res.status(200).json({ message: 'Succesfull Logout' })
    }).catch((error) => {
        console.log("Inside here")
        return res.status(500).json({ message: 'Logout failed' })
    })


}
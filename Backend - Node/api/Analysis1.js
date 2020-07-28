var axios = require('axios')

module.exports = analysis1 = (req, res) => {

    console.log(req.body)
    axios.post('', { email: req.body.email }).then((user) => {
        console.log(user)
    }).catch((error) => {
        console.log(error)
    })



}
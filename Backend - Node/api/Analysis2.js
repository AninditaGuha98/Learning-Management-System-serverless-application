var axios = require('axios')

module.exports = analysis2 = (req, res) => {
    // console.log(req.body.email)

    console.log("email")
    console.log(req.body.email)
    axios.post('https://q2qw0uxia7.execute-api.us-east-1.amazonaws.com/default/', { email: req.body.email }).then((user) => {
        console.log(user.data)
        return res.status(200).json(user.data)
    }).catch((error) => {
        console.log(error)
    })
}

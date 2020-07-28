var firebase = require('../fbConfig/config')
var axios = require('axios')
module.exports = securityPost = (req, res) => {

    if (req.body.answer == req.body.OriginalAnswer) {
        axios.post('https://s4ebgepirc.execute-api.us-east-1.amazonaws.com/default', { email: req.body.email }).then(() => {
            return res.status(200).json({ match: true })
        })
    }
    console.log("Answer is", req.body.answer)


}
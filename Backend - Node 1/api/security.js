var firebase = require('../fbConfig/config')
var axios = require('axios')
module.exports = register = (req, res) => {
    console.log(req.headers)
    console.log(req.header)
    if (req.method === 'GET') {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user.email)
                // User is signed in.
                axios.post('https://culw7u11m3.execute-api.us-east-1.amazonaws.com/default', { email: user.email }).then((result) => {
                    const email = user.email
                    const data = result.data
                    // console.log(result)
                    // console.log(email)
                    // console.log(data)
                    return res.status(200).json({ email: email, data: result.data })

                })
                    .catch((error) => {
                        return res.status(201).json({ error: error })
                    })
                //   var displayName = user.displayName;
                //   var email = user.email;
                //   var emailVerified = user.emailVerified;
                //   var photoURL = user.photoURL;
                //   var isAnonymous = user.isAnonymous;
                //   var uid = user.uid;
                //   var providerData = user.providerData;
                // ...
            } 

        });
    }

    // else if (req.method === 'POST') {
    //     if (req.body.answer == req.body.OriginalAnswer) {
    //         axios.post('https://s4ebgepirc.execute-api.us-east-1.amazonaws.com/default', { email: req.body.email }).then(() => {
    //             return res.status(200).json({ match: true })
    //         })
    //     }
    //     console.log("Answer is", req.body.answer)
    // }
}

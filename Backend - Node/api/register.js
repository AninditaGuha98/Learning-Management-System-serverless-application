const functions = require('firebase-functions');
var firebase = require('../fbConfig/config')
var axios = require('axios')
module.exports = register = (req, res) => {

    // data.username = this.state.username
    let missingValues = 0
    // e.preventDefault();
    const db = firebase.firestore();
    console.log("Till here")
    const missingCheck = firebase.functions().httpsCallable('checkMissing')

    missingCheck(req.body).then((user) => {
        missingValues = user.data
        console.log(missingValues)
        if (missingValues == 1) {
            var email = req.body.email
            var password = req.body.password
            console.log("password is ", password)
            console.log("Email is ", email)
            // var username = this.state.username
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    const userRef = db.collection("users").add({
                        email: req.body.email,
                        password: req.body.password,
                        organization: req.body.organization,
                        name: req.body.name
                        // answer: this.state.answer
                    })

                })
                .catch((error) => {
                    return res.status(201).json({error : error})
                })
                
            axios.post(
                'https://te7gfujgi8.execute-api.us-east-1.amazonaws.com/default',
                { email: req.body.email, question: req.body.question, answer: req.body.answer, organization: req.body.organization, name: req.body.name }
            ).then((user) => {
                return res.status(200).json({message:"Registration Successful"})
            })
                .catch((error) => {
                    console.log(error)
                })

        } else {
            console.log(missingValues)
            res.status(202).json({ error: 'Please enter all fields' })
        }
    })
    return res

}


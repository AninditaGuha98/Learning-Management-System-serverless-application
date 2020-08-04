const { PubSub } = require('@google-cloud/pubsub');
var axios = require('axios');

const projectId = 'serverless-proj-d62dc'
const keyFilename = '\keys.json'

const pubSubClient = new PubSub({ projectId, keyFilename });

module.exports = createSub = (req, res) => {
    console.log(req.body.subName)
    // const pubSubClient = new PubSub({ projectId, keyFilename });
    topicName = 'Topic1'
    subscriptionName = req.body.subName
    console.log(subscriptionName)
    async function createSubscription() {
        // Creates a new subscription
        await pubSubClient.topic(topicName).createSubscription(subscriptionName);
        console.log(`Subscription ${subscriptionName} created.`);
    }
    createSubscription().then((result) => {
        return res.status(200).json({ message: 'Success' })
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
}
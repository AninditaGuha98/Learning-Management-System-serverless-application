const { PubSub } = require('@google-cloud/pubsub');
var axios = require('axios');

const projectId = 'serverless-proj-d62dc'
const keyFilename = '\keys.json'

const pubSubClient = new PubSub({ projectId, keyFilename });

module.exports = pubMessage = (req, res) => {

    async function publishMessage() {
        const topicName = 'Topic1';
        data = req.body.message
        // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
        const dataBuffer = Buffer.from(data);

        const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
    }

    publishMessage().then((result) => {
        console.log(result)
        return res.status(201).json({message: 'Success'})
    }).catch((error) => {
        console.log(error)
    })
}

const { PubSub } = require('@google-cloud/pubsub');
const { Storage } = require('@google-cloud/storage');
const { default: Axios } = require('axios');

const projectId = 'serverless-proj-d62dc'
const keyFilename = '\keys.json'

const pubSubClient = new PubSub({ projectId, keyFilename });

module.exports = createTopic = (req, res) => {

    async function quickstart(
        projectId = 'serverless-proj-d62dc', // Your Google Cloud Platform project ID
        topicName = 'Topic1' // Name for the new topic to create
    ) {
        // Instantiates a client
        const pubsub = new PubSub({ projectId, keyFilename });

        // Creates the new topic
        const [topic] = await pubsub.createTopic(topicName);
        console.log(`Topic ${topic.name} created.`);
    }
    quickstart().then((result) => {
        console.log("Created Topic", result)

    }).catch((error) => {
        console.log("error is ", error.details)
    });

}

module.exports = createSub = (req, res) => {
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

module.exports = pubMessage = (req, res) => {

    async function publishMessage() {
        const topicName = 'Topic1';
        data = 'Hellooo from the application'
        // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
        const dataBuffer = Buffer.from(data);

        const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
    }

    publishMessage().then((result) => {
        console.log(result)
        return res.status(200).json({message: 'Success'})
    }).catch((error) => {
        console.log(error)
    })
}

module.exports = getMessages = (req, res) => {

    function listenForMessages() {
        subscriptionName = req.body.name
        // References an existing subscription
        const subscription = pubSubClient.subscription(subscriptionName);

        // Create an event handler to handle messages
        let messageCount = 0;
        const messageHandler = message => {
            console.log(`Received message ${message.id}:`);
            console.log(`\tData: ${message.data}`);
            console.log(`\tAttributes: ${message.attributes}`);
            messageCount += 1;

            // "Ack" (acknowledge receipt of) the message
            message.ack();
        };  
        

        // Listen for new messages until timeout is hit
        subscription.on('message', messageHandler);
        
        setTimeout(() => {
            
            subscription.removeListener('message', messageHandler);
            console.log(`${messageCount} message(s) received.`);
        }, 60 * 1000);
    }

    listenForMessages().then((result) => {
        return res.status(200).json({message:'Success'})
    }).catch((error)=> {
        console.log(error)
    });
}



module.exports = chat = (req, res) => {


    // Instantiates a client. If you don't specify credentials when constructing
    // the client, the client library will look for credentials in the
    // environment.
    const projectId = 'serverless-proj-d62dc'
    const keyFilename = '\keys.json'
    // Makes an authenticated API request.

    async function quickstart(
        projectId = 'serverless-proj-d62dc', // Your Google Cloud Platform project ID
        topicName = 'Topic1' // Name for the new topic to create
    ) {
        // Instantiates a client
        const pubsub = new PubSub({ projectId, keyFilename });

        // Creates the new topic
        const [topic] = await pubsub.createTopic(topicName);
        console.log(`Topic ${topic.name} created.`);
    }
    quickstart().then((result) => {
        console.log("Created Topic", result)
    }).catch((error) => {
        console.log("error is ", error.details)
    });

    topicName = 'Topic1'
    subscriptionName = req.body.name
    const pubSubClient = new PubSub({ projectId, keyFilename });
    console.log(pubSubClient)
    // async function createPushSubscription() {
    //     const options = {
    //         pushConfig: {
    //             // Set to an HTTPS endpoint of your choice. If necessary, register
    //             // (authorize) the domain on which the server is hosted.
    //             pushEndpoint: `https://${projectId}.appspot.com/push`,
    //         },
    //     };
    //     await pubSubClient
    //         .topic(TopicName)
    //         .createSubscription(subscriptionName, options);
    //     console.log(`Subscription ${subscriptionName} created.`);

    //     createPushSubscription().then((result) => {
    //         console.log("Created Subscription", result)
    //     }).catch((error) => {
    //         console.log("Subscription Error is", error.details)
    //     })
    // }

    async function createSubscription() {
        // Creates a new subscription
        await pubSubClient.topic(topicName).createSubscription(subscriptionName);
        console.log(`Subscription ${subscriptionName} created.`);
    }
    createSubscription().then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    async function publishMessage() {
        /**
         * TODO(developer): Uncomment the following lines to run the sample.
         */
        const topicName = 'Topic1';
        data = 'Hellooo from the application'
        // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
        const dataBuffer = Buffer.from(data);

        const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
    }

    publishMessage().then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })


    function listenForMessages() {
        // References an existing subscription
        const subscription = pubSubClient.subscription(subscriptionName);

        // Create an event handler to handle messages
        let messageCount = 0;
        const messageHandler = message => {
            console.log(`Received message ${message.id}:`);
            console.log(`\tData: ${message.data}`);
            console.log(`\tAttributes: ${message.attributes}`);
            messageCount += 1;

            // "Ack" (acknowledge receipt of) the message
            message.ack();
        };

        // Listen for new messages until timeout is hit
        subscription.on('message', messageHandler);

        setTimeout(() => {
            subscription.removeListener('message', messageHandler);
            console.log(`${messageCount} message(s) received.`);
        }, timeout * 1000);
    }

    listenForMessages();

    // Axios.get('https://serverless-proj-d62dc.appspot.com/push').then((res)=> {
    //     res.data
    //     console.log(res)
    // }).catch((error) => {
    //     console.log(error)
    // })



}





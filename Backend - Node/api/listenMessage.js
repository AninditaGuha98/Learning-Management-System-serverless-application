const { PubSub } = require('@google-cloud/pubsub');
var axios = require('axios');

const projectId = 'serverless-proj-d62dc'
const keyFilename = '\keys.json'
const {v1} = require('@google-cloud/pubsub');

const pubSubClient = new PubSub({ projectId, keyFilename });

// module.exports = listenMessage = (req, res) => {

//     subscriptionName = req.body.name
//     // References an existing subscription
//     const subscription = pubSubClient.subscription(subscriptionName);

//     // Create an event handler to handle messages
//     let messageCount = 0;
//     const messageHandler = message => {
//         console.log("Inside")
//         console.log(`Received message ${message.id}:`);
//         console.log(`\tData: ${message.data}`);
//         // console.log(`\tAttributes: ${message.attributes}`);
//         // messageCount += 1;

//         // "Ack" (acknowledge receipt of) the message
//         message.ack();
//         // (console.log("before return" , {message.data}))
//         // res.status(200).json({ message: message.data})
//     };
//     console.log("Outside")
//     // timeout = 60
//     // Listen for new messages until timeout is hit
//     subscription.on('message', messageHandler)
    
//     // setTimeout(() => {
//     //     subscription.removeListener('message', messageHandler);
//     //     console.log(`${messageCount} message(s) received.`);
//     // }, timeout * 1000);
// }

module.exports = listenMessage = (req,res) => {
    subscriptionName = req.body.name
    const subClient = new v1.SubscriberClient({ projectId, keyFilename });

    async function synchronousPull() {
        const formattedSubscription = subClient.subscriptionPath(
          projectId,
          subscriptionName
        );
    
        // The maximum number of messages returned for this request.
        // Pub/Sub may return fewer than the number specified.
        const request = {
          subscription: formattedSubscription,
          maxMessages: 1,
        };
    
        // The subscriber pulls a specified number of messages.
        const [response] = await subClient.pull(request);
        var messageSent = ''
        // Process the messages.
        const ackIds = [];
        for (const message of response.receivedMessages) {
          console.log(`Received message: ${message.message.data}`);
            messageSent = message.message.data
            temp = messageSent.toString()
            console.log("temp", temp) 
          ackIds.push(message.ackId);
        }
        // console.log(response.receivedMessages.message.data)
    
        // Acknowledge all of the messages. You could also ackknowledge
        // these individually, but this is more efficient.
        const ackRequest = {
          subscription: formattedSubscription,
          ackIds: ackIds,
        };
        await subClient.acknowledge(ackRequest);
        console.log(messageSent.toString())
        // console.log(response.receivedMessages.message.data.toString())

        return res.status(200).json({message: messageSent.toString()})
        
        // console.log('Done.');
      }
    
      synchronousPull().catch(console.error);
      // [END pubsub_subscriber_sync_pull]
    }








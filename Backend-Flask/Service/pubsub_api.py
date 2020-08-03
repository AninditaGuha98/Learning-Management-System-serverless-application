from google.cloud import pubsub_v1
from concurrent.futures import TimeoutError

class Pubsub_api:
    TOPIC_NAME = "Chatroom"
    PROJECT_ID = 'phrasal-aegis-284521'
    SUBSCRIBER = ""

    def create_token(self, id):
        publisher = pubsub_v1.PublisherClient()
        topic_path = publisher.topic_path(self.PROJECT_ID, id)
        topic = publisher.create_topic(topic_path)
        print("Topic created: {}".format(topic))

    def publish(self, message):
        publisher = pubsub_v1.PublisherClient()
        topic_name = 'projects/{project_id}/topics/{topic}'.format(
            project_id=self.PROJECT_ID,
            topic=self.TOPIC_NAME,  # Set this to something appropriate.
        )
        publisher.publish(topic_name, message, message='message')

    def create_subscriber(self, sub_name):
        try:
            subscriber = pubsub_v1.SubscriberClient()
            topic_name = 'projects/{project_id}/topics/{topic}'.format(
                project_id=self.PROJECT_ID,
                topic=self.TOPIC_NAME,  # Set this to something appropriate.
            )
            subscription_name = 'projects/{project_id}/subscriptions/{sub}'.format(
                project_id=self.PROJECT_ID,
                sub=sub_name,  # Set this to something appropriate.
            )
            subscriber.create_subscription(
                name=subscription_name, topic=topic_name)

            def callback(message):
                print("message:", message.data)
                message.ack()

            future = subscriber.subscribe(subscription_name, callback)
        except Exception as e:
            print(e)

    def get_message(self, sub):
        messages_list = []
        subscriber = pubsub_v1.SubscriberClient()
        subscription_path = subscriber.subscription_path(self.PROJECT_ID, sub)

        def callback(message):
            # print("Received message: {}".format(message))
            print("message:", message.data)
            message.ack()
            messages_list.append(message.data)

        streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)
        print("Listening for messages on {}..\n".format(subscription_path))

        # Wrap subscriber in a 'with' block to automatically call close() when done.
        with subscriber:
            try:
                # When `timeout` is not set, result() will block indefinitely,
                # unless an exception is encountered first.
                streaming_pull_future.result(timeout=5)
            except TimeoutError:
                streaming_pull_future.cancel()

        return messages_list

    def get_username_from_email(self,email):
        return email.split("@")[0]

    def set_subscriber(self,subscriber):
        self.SUBSCRIBER = subscriber

    def set_message(self,email,message):
        username = self.get_username_from_email(email)
        return bytes(self.SUBSCRIBER +',,'+ username + '---' + message, 'utf-8')

    def filter_messages_for_email(self,username,messages):
        filtered_messages= []
        for i in messages:
            i = i.decode("utf-8")
            if(( i.split("---")[0] ).split(",,")[0] == username):
                filtered_messages.append(i.split("---")[1])
        return filtered_messages



# pub_sub_api = Pubsub_api()
# pub_sub_api.create_token("sample")
# pub_sub_api.publish(b"Hello chatroom")
# pub_sub_api.create_subscriber("harshgp44")
# pub_sub_api.get_message("harshgp44")
from google.cloud import pubsub_v1
import os
TOPIC_NAME = "ChatRoom"
PROJECT_ID = 'serverless-proj-d62dc'

def create_token(id):
    publisher = pubsub_v1.PublisherClient()
    topic_path = publisher.topic_path(PROJECT_ID, id)
    topic = publisher.create_topic(topic_path)
    print("Topic created: {}".format(topic))


def publish(message):
    publisher = pubsub_v1.PublisherClient()
    topic_name = 'projects/{project_id}/topics/{topic}'.format(
        project_id=PROJECT_ID,
        topic=TOPIC_NAME,  # Set this to something appropriate.
    )
    publisher.publish(topic_name, message, spam='eggs')


def create_subscribe(sub_name):
    subscriber = pubsub_v1.SubscriberClient()
    topic_name = 'projects/{project_id}/topics/{topic}'.format(
        project_id=PROJECT_ID,
        topic=TOPIC_NAME,  # Set this to something appropriate.
    )
    subscription_name = 'projects/{project_id}/subscriptions/{sub}'.format(
        project_id=PROJECT_ID,
        sub=sub_name,  # Set this to something appropriate.
    )
    subscriber.create_subscription(
        name=subscription_name, topic=topic_name)

    def callback(message):
        print(message.data)
        message.ack()
    future = subscriber.subscribe(subscription_name, callback)

def get_data_for_topic(sub):
    from concurrent.futures import TimeoutError
    from google.cloud import pubsub_v1
    m = ""
    subscriber = pubsub_v1.SubscriberClient()
    subscription_path = subscriber.subscription_path(PROJECT_ID, sub)

    def callback(message):
        # print("Received message: {}".format(message))
        print("message:", message.data)
        message.ack()
        return message.data

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

    if(m!=""):
        return m


# create_token("ChatRoom")
# publish(b"Hello chatroom")
# create_subscribe("harshgp44")
# get_data_for_topic("abcd")

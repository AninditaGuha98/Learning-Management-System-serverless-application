import json
import boto3


def lambda_handler(event, context):
    if event:
        str1 = " "
        sentiment_user1 = []
        sentiment_user2 = []
        innerDict = {}
        finalDict = {}
        counter = 0

        s3 = boto3.client('s3')
        comprehend = boto3.client('comprehend')

        file_object = event["Records"][0]
        file = str(file_object['s3']['object']['key'])
        data = s3.get_object(Bucket='chat-messages', Key=file)
        contents = data['Body'].read().decode('utf-8')
        c = json.loads(contents)

        filename = file.split(".")
        users = filename[0].split("-")
        user1 = users[0]
        user2 = users[1]

        for i in range(len(c[filename[0]][user1]['message'])):
            response_user1 = comprehend.detect_sentiment(Text=c[filename[0]][user1]['message'][i], LanguageCode='en')
            sentiment_user1.append(response_user1['Sentiment'])
            response_user2 = comprehend.detect_sentiment(Text=c[filename[0]][user2]['message'][i], LanguageCode='en')
            sentiment_user2.append(response_user2['Sentiment'])

        finalSentiment_user1 = sentiment_user1[0]
        finalSentiment_user2 = sentiment_user2[0]

        for i in sentiment_user1:
            curr_frequency = sentiment_user1.count(i)
            if (curr_frequency > counter):
                counter = curr_frequency
                finalSentiment_user1 = i

        counter = 0

        for i in sentiment_user2:
            curr_frequency = sentiment_user2.count(i)
            if (curr_frequency > counter):
                counter = curr_frequency
                finalSentiment_user2 = i

        innerDict[user1] = finalSentiment_user1
        innerDict[user2] = finalSentiment_user2
        finalDict[filename[0]] = innerDict

        s3 = boto3.client('s3')
        s3.put_object(Body=json.dumps(finalDict), Bucket="sentiment-storage", Key=file)

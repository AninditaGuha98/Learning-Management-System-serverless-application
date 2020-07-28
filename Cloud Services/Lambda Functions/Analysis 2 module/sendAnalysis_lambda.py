import json
import mysql.connector
import boto3

conn = mysql.connector.connect(host='serverless.cmtchp4wslrw.us-east-1.rds.amazonaws.com'
                               , user='admin',
                               password='admin2806',
                               db='serverless')
cursor = conn.cursor()


def lambda_handler(event, context):
    myJsonList = []
    if event:
        findName = "Select firstName from userStatus where email=%s"
        cursor.execute(findName, (event.get('email'),))
        result = cursor.fetchone()

        s3 = boto3.resource('s3')
        bucket = s3.Bucket('sentiment-storage')

        for obj in bucket.objects.all():
            key = obj.key
            users = key.split(".")
            usernames = users[0].split("-")

            username1 = usernames[0]
            username2 = usernames[1]
            print(usernames)
            if (result[0] == username1 or result[0] == username2):
                print(key)
                body = obj.get()['Body'].read()
                # print(body["harsh-Someone"])
                print(json.loads(body))
                myJsonList.append(json.loads(body))

        return myJsonList  

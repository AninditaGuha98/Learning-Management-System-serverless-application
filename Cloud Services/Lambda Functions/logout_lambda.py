import json
import mysql.connector
import boto3

conn = mysql.connector.connect(host='serverless.cmtchp4wslrw.us-east-1.rds.amazonaws.com'
                               , user='admin',
                               password='admin2806',
                               db='serverless')
cursor = conn.cursor()


def lambda_handler(event, context):
    print(event.get('email'))
    if event:
        status = "offline"
        try:
            insertUser = "update userStatus set status=%s where email=%s"
            cursor.execute(insertUser, (status, event.get('email')))
            return True
        except Exception as e:
            print(e)
            return
        finally:
            conn.commit()

